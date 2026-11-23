# KGroup Parfumery — Recrutement

Plateforme de recrutement en français avec formulaire public, API de candidatures et espace équipe protégé. La plateforme ne transmet aucun e-mail automatiquement : l'équipe contacte les candidats sur WhatsApp et envoie elle-même l'invitation Google Meet depuis sa messagerie.

## Installation locale

Prérequis : Node.js 20.9+, npm et une base PostgreSQL (le projet utilise PostgreSQL pour que les candidatures soient conservées sur Vercel).

```bash
npm install
```

Copiez `.env.example` en `.env` et renseignez `DATABASE_URL` (connexion PostgreSQL directe), `DATABASE_URL_POOLED` (connexion mutualisée pour l'application), `ADMIN_PASSWORD` et un `SESSION_SECRET` aléatoire. Vous pouvez utiliser les variables de développement de votre base PostgreSQL ou télécharger les variables Vercel avec `vercel env pull .env.local`. Puis initialisez la base et démarrez Next.js :

```bash
npx prisma migrate dev
npm run dev
```

La page publique est sur `http://localhost:3000` et l'espace équipe sur `/admin`.

## Configuration

- Liens sociaux : modifiez uniquement [`src/config/social.ts`](src/config/social.ts). Tant que le lien est `REMPLACER_PAR_…`, la carte et son lien du pied de page sont masqués.
- Textes et villes : `src/config/content.ts`.
- Logo et images : remplacez `public/images/logo.jpeg` et `public/images/hiring.png`. L'image du logo sert aussi de favicon. L'affiche fournie est utilisée comme visuel du hero.
- Mot de passe d'administration et secret de session : variables d'environnement uniquement.

## Administration

Le cookie de session est HTTP-only, signé avec `SESSION_SECRET`, `SameSite=Strict` et dure 12 heures. L'espace `/admin` permet de filtrer, rechercher, mettre à jour un statut, consulter une fiche, noter un rendez-vous en mémoire interne, copier un e-mail, ouvrir une conversation WhatsApp préremplie et exporter le tableau en CSV.

La limitation anti-spam applique 5 requêtes par heure et par IP dans le processus du serveur. Pour un déploiement à plusieurs instances, utilisez un stockage partagé (par exemple Redis) pour conserver cette limite entre instances. Le honeypot complète cette protection.

## Déploiement

### Vercel et GitHub

1. Poussez le projet vers un dépôt GitHub.
2. Dans Vercel, importez ce dépôt GitHub et gardez les commandes de build détectées automatiquement. Le script `vercel-build` génère Prisma, applique les migrations (`prisma migrate deploy`) puis construit Next.js.
3. Depuis l'onglet **Storage** du projet Vercel, créez une base PostgreSQL via le Marketplace (Prisma Postgres ou une autre intégration PostgreSQL), puis connectez-la au projet. Le projet lit `DATABASE_URL` pour les migrations et `DATABASE_URL_POOLED` pour le trafic web si l'intégration fournit cette variable.
4. Dans **Settings → Environment Variables**, ajoutez `ADMIN_PASSWORD` et `SESSION_SECRET` pour Production, Preview et Development. Ne publiez jamais `.env` sur GitHub.
5. Déclenchez un nouveau déploiement après avoir ajouté la base et les variables. La base doit être disponible avant la première compilation, car `vercel-build` exécute les migrations.
6. Ouvrez l'URL Vercel et vérifiez `/admin`. Les prochains pushs sur la branche de production déclencheront un nouveau déploiement.

Les aperçus de Pull Request et la production partagent la base si vous connectez la même base aux deux environnements. Pour isoler les données, créez des bases distinctes pour Preview et Production.

### VPS

Configurez les variables d'environnement, installez les dépendances, lancez `npx prisma migrate deploy`, puis `npm run build` et `npm start` derrière un proxy HTTPS.

### Vercel

Utilisez une base PostgreSQL managée. Renseignez `DATABASE_URL` et `DATABASE_URL_POOLED`, ajoutez les secrets dans les variables de projet, lancez les migrations au déploiement, puis construisez l'application.

## Validation

```bash
npm test
npm run build
```
