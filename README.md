# KGroup Parfumery — Recrutement

Plateforme de recrutement en français avec formulaire public, API de candidatures et espace équipe protégé. Aucun e-mail n'est envoyé automatiquement : l'équipe contacte les candidats sur WhatsApp et envoie elle-même l'invitation Google Meet.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, Prisma et PostgreSQL.

## Configuration

Copier `.env.example` en `.env`, puis définir `DATABASE_URL`, `DATABASE_URL_POOLED`, `ADMIN_PASSWORD` et `SESSION_SECRET`. Ne jamais publier `.env`.

```bash
npm install
npx prisma migrate dev
npm run dev
```

Le formulaire public est sur `http://localhost:3000`; l'espace équipe sur `/admin`.

Les liens sociaux sont configurés dans `src/config/social.ts`. Les liens de remplacement sont masqués automatiquement.

## Déploiement Vercel

Importer ce dépôt dans Vercel, connecter une base PostgreSQL depuis Storage/Marketplace, puis ajouter les variables `ADMIN_PASSWORD` et `SESSION_SECRET`. Le script `vercel-build` génère Prisma, applique `prisma migrate deploy` et construit Next.js. Le dashboard équipe se trouve à `/admin`.
