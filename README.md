
# Propel – Product v4 (Deployable)

A focused, deployable product:
- Home: hero + impact stats + “How it works” + social proof
- Donate: Find a Student (browse + search, presets, cover fees, deep links) + School Funds
- Enroll: progressive sections, privacy toggle, PDF/DOC upload
- Student Profiles: /s/[id] shareable pages with Donate deep link
- Footer trust links; no Students or Schools top-level pages

## Local Dev
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
```bash
# Optional: set BASE_URL for server-side fetch in /s/[id] when using edge/CDN
# vercel env add NEXT_PUBLIC_BASE_URL https://your-deployment-url
npm run build
npx vercel deploy --prod
```
