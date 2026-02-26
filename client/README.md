# VCE Infra Frontend

## Local Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deploy To Vercel (via GitHub)

1. Push this project to GitHub.
2. In Vercel, click `Add New...` -> `Project` and import your GitHub repo.
3. In project settings, set:
   - `Root Directory`: `client`
   - `Framework Preset`: `Vite`
   - `Build Command`: `npm run build`
   - `Output Directory`: `dist`
4. Click `Deploy`.
5. For future updates, push to your main branch and Vercel will auto-deploy.

`client/vercel.json` is included to rewrite all routes to `index.html` so React Router pages work on refresh.
