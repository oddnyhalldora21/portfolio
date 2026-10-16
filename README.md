# oddnyhalldora.com

Personal portfolio for Oddný Halldóra Oddsdóttir, built with Vite + vanilla TypeScript and plain CSS. The contact form saves messages to Supabase.

## Project structure

```
index.html              Page shell: nav, <main>, footer
src/main.ts             Hash router (#/ and #/contact)
src/pages/home.ts       Intro + project grid
src/pages/contact.ts    Contact form with validation
src/data/projects.ts    ← Your projects live here
src/lib/supabase.ts     Supabase client + insert
src/style.css           All styles; colors are CSS variables at the top
public/                 Static files (favicon, images) copied as-is
supabase/schema.sql     Table + Row Level Security for the contact form
```

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
cp .env.example .env     # then fill in your Supabase values (see below)
npm run dev              # http://localhost:5173
```

Other commands:

```bash
npm run build            # type-checks and builds the static site into dist/
npm run preview          # serves dist/ locally to check the production build
```

The site works without a `.env` file; the contact form will just show an error when submitted.

## Editing content

- **Projects:** edit `src/data/projects.ts`. Each project has a `title` and `description`, plus optional `image`, `imageAlt`, `link` and `tags`. Put images in `public/images/` and reference them as `/images/file.jpg`.
- **Intro text:** edit the lines marked `PLACEHOLDER` in `src/pages/home.ts`.
- **Meta description:** `index.html`.
- **Colors:** CSS variables at the top of `src/style.css` (light theme first, dark theme in the `prefers-color-scheme: dark` block).

## Set up Supabase

1. In the [Supabase dashboard](https://supabase.com/dashboard), open your project (or create one).
2. Go to **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and click **Run**. This creates the `contact_messages` table with Row Level Security turned on and one policy that lets anonymous visitors **insert only**. Nobody can read messages with the public key.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
4. Put them in your local `.env` file. Never use the `service_role` key in this project.
5. Restart `npm run dev`, send a test message, and check it appears under **Table Editor → contact_messages**.

Optional: to get an email for each new message, add a **Database Webhook** (Database → Webhooks) on inserts into `contact_messages`, or use an Edge Function with an email provider.

## Deploy

Both hosts build the site with `npm run build` and serve the `dist/` folder. Hash routing means no rewrite rules are needed.

First, push this folder to a GitHub (or GitLab/Bitbucket) repository:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

`.env` is in `.gitignore`, so your keys are not committed. You add them on the host instead.

### Option A: Netlify

1. Log in at [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** → pick your repository.
2. Build settings come from `netlify.toml` (build command `npm run build`, publish directory `dist`). Leave them as they are.
3. Before deploying, click **Add environment variables** (or later: **Site configuration → Environment variables**) and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Click **Deploy**. You'll get a URL like `something.netlify.app`. Open it and test the contact form.
   - If you add or change environment variables later, trigger a new deploy (**Deploys → Trigger deploy**). Vite bakes them in at build time.
5. **Custom domain:** go to **Domain management → Add a domain**, enter `oddnyhalldora.com`, and confirm.
6. Point the domain at Netlify. Do one of these:
   - **Easiest:** use Netlify DNS. Netlify shows four nameservers (`dns1.p0X.nsone.net` …). At your domain registrar, replace the existing nameservers with those.
   - **Keep your current DNS:** at your registrar, add
     - an `A` record for `@` (apex) → `75.2.60.5`
     - a `CNAME` record for `www` → `<your-site>.netlify.app`
7. Wait for DNS to update (minutes to a few hours). Netlify then issues a free HTTPS certificate automatically (**Domain management → HTTPS**). Set `oddnyhalldora.com` as the primary domain so `www` redirects to it.

### Option B: Vercel

1. Log in at [vercel.com](https://vercel.com) → **Add New… → Project** → import your repository.
2. Vercel detects **Vite** automatically (build command `npm run build`, output directory `dist`). Keep the defaults.
3. Open **Environment Variables** and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Click **Deploy**, then test the contact form on the `*.vercel.app` URL.
   - After changing environment variables, redeploy (**Deployments → ⋯ → Redeploy**).
5. **Custom domain:** go to **Project → Settings → Domains**, add `oddnyhalldora.com`. Vercel will offer to also add `www.oddnyhalldora.com` and redirect it; accept.
6. At your domain registrar, add the DNS records Vercel shows. They are usually:
   - an `A` record for `@` → `76.76.21.21`
   - a `CNAME` record for `www` → `cname.vercel-dns.com`

   (Or switch the registrar's nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.)
7. Wait for the domain to show **Valid Configuration**. HTTPS is set up automatically.

> DNS values can change. If the dashboard shows different values from the ones above, use the dashboard's.

### After deploying

- Open `https://oddnyhalldora.com`, check both tabs, and send yourself a test message.
- Every push to `main` redeploys the site automatically.
