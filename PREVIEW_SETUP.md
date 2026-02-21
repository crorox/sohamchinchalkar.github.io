# Work Branch Preview Setup

This repository now includes a GitHub Actions workflow that deploys the current `work` branch to GitHub Pages.

## What this gives you
- You can keep editing and committing on `work`.
- Every push to `work` creates a fresh preview deployment.
- `master` is not modified by these commits.

## One-time GitHub settings
1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `work` (or run the **Work Branch Preview** workflow manually).

## Preview URL
After a successful run, open the URL shown in the workflow run summary (it comes from `actions/deploy-pages`).

> Note: If your site currently uses Pages from `master` branch directly, switching Pages source to GitHub Actions will make the Action deployment the active site.
