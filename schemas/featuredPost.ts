import { defineType, defineField } from "sanity";

export const featuredPost = defineType({
  name: "featuredPost",
  title: "Featured Social Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (internal label only)",
      description:
        "Just for you to identify the post in this list. Not shown on the website.",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption / alt text",
      description:
        "Short description shown to screen readers. Optional but recommended.",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link to original post",
      description:
        "Full Instagram or LinkedIn URL. Visitors will be taken here when they click the carousel image.",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      description:
        "Drag-drop the post image. A square (1:1) image around 800×800px works best.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort order (lower = appears first)",
      description:
        "Use 10, 20, 30, 40… so it’s easy to insert new posts between.",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "title",
      caption: "caption",
      platform: "platform",
      media: "image",
    },
    prepare({ title, caption, platform, media }) {
      return {
        title: title || caption || "Untitled post",
        subtitle: platform ? platform.toUpperCase() : caption,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
