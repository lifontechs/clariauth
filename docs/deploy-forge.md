# Deploying ClariAuth to Laravel Forge

Forge is built for PHP, but it provisions an ordinary Ubuntu server with Nginx
and Node, which is all this app needs. The shape of the deployment:

```
Internet → Nginx (:443, SSL) → reverse proxy → Node/Nitro (127.0.0.1:3000)
                                                      ↓
                                               SQLite on local disk
```

Nginx terminates TLS and proxies to the Node process. Forge's Supervisor keeps
that process alive and restarts it on boot.

---

## 1. Server

Create a server with the **Web Server** (or App Server) type — those include
Node, npm and Nginx.

Confirm Node is 20 or newer:

```bash
node -v
```

If Forge provisioned something older, install a newer Node from the server's
**Packages** tab before going further.

## 2. Site

Create the site for your domain, and choose a **non-PHP project type**
(Static HTML). That stops Forge writing PHP-FPM directives you would only have
to delete. The Nginx config gets replaced in step 5 regardless.

Then connect the Git repository (`lifontechs/clariauth`) and pick the branch
to deploy. **Do not enable Quick Deploy yet** — the daemon and Nginx need to
exist first, or the first deploy will 502.

## 3. Environment variables

Site → **Environment**. Forge writes this to `.env` in the site root.

> **The gotcha:** a built Nitro server does *not* read `.env` by itself —
> Nuxt only does that in dev. The daemon command in step 4 passes
> `--env-file=.env` explicitly, which is what makes these values apply.

```ini
NUXT_ADMIN_TOKEN=paste-a-long-random-value-here
NUXT_DATABASE_PATH=/home/forge/clariauth-data/clariauth.sqlite

NUXT_SMTP_HOST=smtp.your-provider.com
NUXT_SMTP_PORT=587
NUXT_SMTP_USER=your-smtp-username
NUXT_SMTP_PASSWORD=your-smtp-password
NUXT_SMTP_FROM="ClariAuth <noreply@clariauth.com>"
NUXT_SMTP_TO=info@clariauth.com

# Bind to localhost only. Without this the Node process answers on port 3000
# from the public internet, bypassing Nginx and your SSL certificate.
HOST=127.0.0.1
PORT=3000
```

Generate the token on the server with:

```bash
openssl rand -hex 32
```

Note that `NUXT_DATABASE_PATH` points **outside the site directory**. The
deploy script runs `git` commands in the site root, and the database should
never be anywhere a stray `git clean` could reach. Create it once:

```bash
mkdir -p /home/forge/clariauth-data
chown forge:forge /home/forge/clariauth-data
```

## 4. Daemon

Server → **Daemons** → New Daemon.

| Field | Value |
| --- | --- |
| Command | `node --env-file=.env .output/server/index.mjs` |
| Directory | `/home/forge/clariauth.com` *(your site path)* |
| User | `forge` |
| Processes | `1` |

One process only — the in-memory rate limiter and the SQLite writer both
assume a single instance.

Note the Supervisor program name, needed in the next step:

```bash
sudo supervisorctl status
```

It looks like `daemon-123456:daemon-123456_00`. The part before the colon is
what you restart.

## 5. Nginx

Site → **Edit Nginx Configuration**. Replace the `location /` block with a
proxy. Leave everything Forge generated above and below it — especially the
SSL and Let's Encrypt lines.

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;

    proxy_set_header Upgrade           $http_upgrade;
    proxy_set_header Connection        'upgrade';
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    # The API rate-limits per IP, which only works if the real one is passed
    # through — without this every visitor looks like 127.0.0.1.
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

Delete any PHP blocks Forge added (`location ~ \.php$`, `error_page 404
/index.php`).

## 6. Deploy script

Site → **Deploy Script**:

```bash
cd $FORGE_SITE_PATH

git pull origin $FORGE_SITE_BRANCH

# --omit=dev skips Playwright, a dev-only dependency whose install would
# otherwise download browsers onto the server. Nuxt itself is a runtime
# dependency, so the build still works.
npm ci --omit=dev

npm run build

# Substitute the program name from step 4.
sudo -S supervisorctl restart daemon-123456:*
```

Run the first deploy manually from the Forge UI, then enable **Quick Deploy**
if you want pushes to deploy automatically.

## 7. SSL

Site → **SSL** → Let's Encrypt → obtain the certificate. Forge handles renewal.

---

## Verifying it worked

```bash
# From the server: is the app actually up behind Nginx?
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/

# From anywhere: port 3000 must NOT be reachable publicly.
curl -s --max-time 5 http://YOUR_SERVER_IP:3000/   # expect refused/timeout
```

Then, in a browser:

1. Submit the contact form and confirm you land on `/thank-you`.
2. Check the notification email arrives.
3. Open `/inbox/<NUXT_ADMIN_TOKEN>` and confirm the submission is listed.
4. Open `/inbox/wrong-token` and confirm a 404.

## Logs

```bash
# App output (Supervisor captures stdout/stderr)
sudo supervisorctl tail -f daemon-123456:daemon-123456_00

# Nginx
tail -f /var/log/nginx/clariauth.com-error.log
```

---

## Backups

The SQLite file is the only copy of your leads. Back it up on a schedule —
Forge's **Scheduler** can run this as a cron job:

```bash
sqlite3 /home/forge/clariauth-data/clariauth.sqlite \
  ".backup /home/forge/clariauth-backups/leads-$(date +\%F).sqlite"
```

`.backup` is safe to run while the server is writing; copying the file with
`cp` while it is live is not.

---

## Troubleshooting

**502 Bad Gateway** — the Node process is not running. Check
`sudo supervisorctl status` and the daemon log. Most often the build failed,
or `.env` is missing so the app crashed on startup.

**`npm ci` fails compiling better-sqlite3** — it is a native module and needs
build tools when no prebuilt binary matches your Node version:

```bash
sudo apt-get install -y python3 build-essential
```

**The inbox 404s with the correct token** — the token is unset or shorter than
24 characters, which disables the inbox deliberately. The daemon log says
which. Remember the daemon must be restarted after changing `.env`.

**Emails never arrive** — submissions are still being stored (that is by
design; mail failure never fails the request). Rows show as *not emailed* in
the inbox. Check the daemon log for `[mail]` lines, and confirm your provider
allows the `NUXT_SMTP_FROM` address.

**Rate limiting blocks everyone at once** — `X-Forwarded-For` is not reaching
the app, so every visitor shares one identity. Re-check the `proxy_set_header`
lines in step 5.

**Leads vanished after a deploy** — `NUXT_DATABASE_PATH` is pointing inside
the site directory. Move it to `/home/forge/clariauth-data/` as in step 3.
