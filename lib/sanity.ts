import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity is configured via two public env vars. When either is missing,
 * `sanityClient` is null and every helper below returns its fallback
 * value — the site keeps working with hardcoded content during the
 * migration window.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityEnabled = Boolean(projectId);

export const sanityClient = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true, // edge-cached, fast, fine for public content
      perspective: "published",
    })
  : null;

const imageBuilder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/**
 * Convert a Sanity image reference object into a serveable URL.
 * Pass width/height to get a resized variant from Sanity's image pipeline.
 */
export function urlFor(
  source: unknown,
  opts: { width?: number; height?: number; quality?: number } = {},
) {
  if (!imageBuilder || !source) return "";
  let b = imageBuilder.image(source as never);
  if (opts.width) b = b.width(opts.width);
  if (opts.height) b = b.height(opts.height);
  b = b.quality(opts.quality ?? 85).auto("format");
  return b.url();
}

/* ────────── Document type definitions ────────── */

export type FeaturedPost = {
  _id: string;
  title?: string;
  caption?: string;
  link: string; // Instagram or LinkedIn URL
  platform?: "instagram" | "linkedin";
  imageUrl: string; // already resolved via urlFor
  order: number;
};

/**
 * Fetch the featured posts for the hero carousel, sorted by `order`.
 * Returns an empty array when Sanity is not configured OR the query fails —
 * caller can then fall back to hardcoded content.
 */
export async function getFeaturedPosts(): Promise<FeaturedPost[]> {
  if (!sanityClient) return [];

  try {
    const docs = await sanityClient.fetch<
      Array<{
        _id: string;
        title?: string;
        caption?: string;
        link: string;
        platform?: "instagram" | "linkedin";
        image: { _ref?: string; asset?: unknown };
        order?: number;
      }>
    >(
      `*[_type == "featuredPost" && defined(image)] | order(order asc, _createdAt desc) {
        _id, title, caption, link, platform, image, order
      }`,
    );

    return docs.map((d, i) => ({
      _id: d._id,
      title: d.title,
      caption: d.caption,
      link: d.link,
      platform: d.platform,
      imageUrl: urlFor(d.image, { width: 800, height: 800 }),
      order: d.order ?? i,
    }));
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[sanity] getFeaturedPosts failed:", (err as Error).message);
    }
    return [];
  }
}
