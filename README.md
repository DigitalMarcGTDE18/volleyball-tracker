# Volleyball Scheduler — Deploy Instructions

## Local dev
npm install
npm run dev

## Deploying to Netlify

### Option A — GitHub (recommended)
1. Push this whole folder to a new GitHub repo (make sure `.gitignore` is the actual filename, with the leading dot — some file explorers/zips rename dotfiles by adding an underscore, so double check after pushing).
2. In Netlify: "Add new site" → "Import an existing project" → connect the GitHub repo.
3. Build settings (Netlify should auto-detect these from netlify.toml, but confirm):
   - Build command: npm run build
   - Publish directory: dist
4. Deploy.

### Option B — Drag and drop (fastest, no git needed)
1. Run `npm install` then `npm run build` locally.
2. Go to Netlify → "Add new site" → "Deploy manually".
3. Drag the `dist` folder onto the page.

## Common gotchas
- `vite.config.js` MUST have a literal dot, not an underscore. `vite_config.js` will be silently ignored by Vite.
- `.gitignore` MUST start with a dot. If it becomes `_gitignore`, node_modules will get committed to your repo (huge, slow, and can break Netlify's install step).
- Netlify needs Node 18+. It auto-detects this, but if the build fails on Netlify, add a `.nvmrc` file with `18` in it.
