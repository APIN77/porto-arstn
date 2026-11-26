# Alfian Ariston Noor — Personal Portfolio

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Deploy — zero config needed

## Customization

- **Profile photo**: Replace `/public/images/profile.jpg` with actual photo
- **Project thumbnails**: Replace SVG placeholders in `/public/images/projects/`
- **LinkedIn**: Set `linkedinUrl` in `src/data/profile.ts`
- **Translations**: Edit `src/i18n/en.ts` and `src/i18n/id.ts`
- **Projects**: Edit `src/data/projects.ts`
- **Contact form backend**: Integrate Resend or similar in the Contact component's `handleSubmit`

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
