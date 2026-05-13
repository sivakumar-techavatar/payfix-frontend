# Sanity CMS Setup Guide

The hero carousel can pull its 4 social-post images from Sanity instead
of being hardcoded. While Sanity isn't configured (or has zero posts),
the site falls back to the hardcoded posts in `components/home/Hero.tsx`.

## One-time setup

### 1. Create a Sanity account + project (5 min)

1. Open **https://www.sanity.io** → sign up with `info@payfixadvisors.in`.
2. Verify the email Sanity sends.
3. Click **Get Started** → **Create new project**.
4. Project setup:
   - **Project name**: `Payfix Advisors`
   - **Dataset**: `production` (default)
   - For "Use template" pick **"Clean project with no predefined schemas"** — we already wrote the schema in this codebase.
5. After project is created, in the dashboard top area you'll see your **Project ID** (e.g., `se1xovtm`). Copy it.

### 2. Add Project ID to Vercel (3 min)

1. Vercel → your `payfix-frontend` project → **Settings** → **Environment Variables** → Add:
   - Name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Value: paste your Project ID
   - Environments: All → **Save**
2. Also add (if not present):
   - Name: `NEXT_PUBLIC_SANITY_DATASET`
   - Value: `production`
   - Environments: All → **Save**
3. Vercel → Deployments → ⋯ → **Redeploy** → uncheck **Use existing Build Cache** → wait for 🟢.

### 3. Allow your domain in Sanity CORS (2 min — easy to miss)

This step is required for the embedded Studio to talk to your Sanity dataset.

1. In Sanity dashboard for your project → top tabs → **API**.
2. Scroll to **CORS Origins** → **Add CORS origin**.
3. Origin: `https://payfixadvisors.in` → tick **Allow credentials** → Save.
4. Also add `https://www.payfixadvisors.in` (same settings).
5. Optional: `http://localhost:3000` for local development.

### 4. Open the content editor

Once Vercel is green on the redeploy:

1. Visit **https://payfixadvisors.in/admin**
2. Sanity Studio asks you to sign in → click **Sign in with Google / Email** → use the same `info@payfixadvisors.in` account you used to create the Sanity project.
3. You'll land in the editor. You should see a left sidebar with **Featured Social Post** (and a "0 documents" indicator).

### 5. Add your first post

1. In Studio → left sidebar → click **Featured Social Post**.
2. Top right → **+ Create**.
3. Fill in:
   - **Title (internal label only)** — like "PF deadline reminder Q1" — just helps you find it later.
   - **Caption / alt text** — short description for accessibility.
   - **Link to original post** — paste the full Instagram OR LinkedIn URL.
   - **Platform** — pick Instagram or LinkedIn.
   - **Image** — drag-drop the post image (square 800×800 works best).
   - **Sort order** — `10` for first, `20` for second, etc.
4. Click **Publish** (bottom right).

Wait ~1 minute. Visit `https://payfixadvisors.in` — the hero carousel should now show your Sanity-hosted post.

### 6. Add 3 more posts

Repeat step 5 three more times. Use orders `20`, `30`, `40` so they line up.

## Day-to-day workflow

When you publish a new Instagram/LinkedIn post and want it in the carousel:

1. Open your phone's browser → **payfixadvisors.in/admin** → sign in (Sanity remembers you).
2. **Featured Social Post** → **+ Create** → drag photo + paste URL + Publish.

That's it. Updates appear on the live site within 1 minute. The whole flow works from a phone.

## Removing or replacing posts

In Studio → **Featured Social Post** → click an existing post → either:
- Edit fields → **Publish** to update
- Top right ⋯ → **Delete** to remove from the carousel

## Reverting to hardcoded posts (emergency rollback)

If something goes wrong with Sanity and you want to temporarily revert to
the hardcoded posts:

1. Vercel → Env Vars → delete `NEXT_PUBLIC_SANITY_PROJECT_ID` → Redeploy.
2. The site immediately falls back to the 4 hardcoded posts in code.

You can restore Sanity later by pasting the Project ID back in.
