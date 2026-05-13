# Sanity CMS Setup Guide

The hero carousel can pull its 4 social-post images from Sanity instead
of being hardcoded in code. While Sanity isn't configured, the site
falls back to the hardcoded posts in `components/home/Hero.tsx`. Once
you configure Sanity and add at least one post there, the site
automatically switches to Sanity-powered content.

## One-time setup (you do this once, ~30 min)

### 1. Create a Sanity account + project

1. Open **https://www.sanity.io** → sign up with `info@payfixadvisors.in` (free, no credit card).
2. After verifying email, click **Get Started**.
3. Create a new project. You'll be asked for:
   - **Project name**: `Payfix Advisors`
   - **Use the schema template**: pick **"Clean project with no predefined schemas"** (we'll add our schema in step 3).
   - **Dataset**: leave as `production`.
4. After project is created, you'll see your **Project ID** on the Project dashboard. Format looks like `abcd1234`. **Copy it.**

### 2. Paste the Project ID into Vercel

1. Vercel → your `payfix-frontend` project → **Settings** → **Environment Variables** → Add:
   - Name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Value: paste your Project ID (e.g., `abcd1234`)
   - Environments: All → Save
2. Also add (if not already):
   - Name: `NEXT_PUBLIC_SANITY_DATASET`
   - Value: `production`
   - Environments: All → Save
3. Redeploy with build cache off → wait for 🟢.

(After this redeploy, the site is "Sanity-ready" but will keep using the hardcoded fallback posts because Sanity has no posts yet. That's by design.)

### 3. Create the `featuredPost` schema in Sanity

You can do this either by typing the schema into Sanity Studio (need to install Sanity CLI locally — tedious) OR by using Sanity's **Cloud Schema** editor in their dashboard.

**Recommended: use Sanity's Cloud Schema editor**

1. In your Sanity Project dashboard → click **Schema** in the left menu (or **API** → **Schema**).
2. Click **Add document type**.
3. Fill in:
   - **Name**: `featuredPost`
   - **Title**: "Featured Social Post"
4. Add the following fields one at a time using the "+ Add field" button:

| Field name | Type | Title | Required? |
|---|---|---|---|
| `title` | String | Title (internal label) | Optional |
| `caption` | String | Caption (used as alt text) | Optional |
| `link` | URL | Link to original post | **Required** |
| `platform` | String → "list of options" | Platform (`instagram`, `linkedin`) | Optional |
| `image` | Image | Image | **Required** |
| `order` | Number | Sort order (lower = first) | Optional |

5. Save the schema. It deploys automatically to your Sanity Studio.

### 4. Add your first post

1. In Sanity Project dashboard → **Content** or **Studio** → click **+ Create** → **Featured Social Post**.
2. Fill in:
   - **Title**: optional internal label like "Q1 PF deadline post"
   - **Caption**: short description for screen readers
   - **Link**: paste the full Instagram OR LinkedIn URL
   - **Platform**: type `instagram` or `linkedin`
   - **Image**: drag-drop the image from your phone/laptop
   - **Order**: a number like `10`, `20`, `30` (lets you reorder by editing this)
3. Click **Publish** (top right).
4. Visit `https://payfixadvisors.in` — within ~1 minute, the carousel will start showing your Sanity-hosted post.

### 5. Add 3 more posts the same way

Total time after first one: ~60 seconds per post.

## Day-to-day workflow

Whenever you post on Instagram or LinkedIn:

1. Open your phone's browser → `https://www.sanity.io/manage` → click your project → **Content** → **Featured Social Posts**.
2. Click **+ Create** → fill the same 6 fields.
3. **Publish**. Done.

Sanity Studio works on phones — you can update the carousel from anywhere.

## Schema reference (for developer)

```typescript
// Schema definition (Sanity v3 syntax)
export default {
  name: 'featuredPost',
  title: 'Featured Social Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title (internal)', type: 'string' },
    { name: 'caption', title: 'Caption / alt text', type: 'string' },
    {
      name: 'link',
      title: 'Link to original post',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: { list: ['instagram', 'linkedin'] },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Sort order (lower = first)',
      type: 'number',
    },
  ],
};
```

## Reverting

If you ever want to disable Sanity and go back to hardcoded posts:
- Delete `NEXT_PUBLIC_SANITY_PROJECT_ID` env var from Vercel → Redeploy.
- The site falls back to `FALLBACK_IMAGES` in `components/home/Hero.tsx`.
