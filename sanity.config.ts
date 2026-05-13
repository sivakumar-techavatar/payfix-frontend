import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  basePath: "/admin",
  name: "payfix-admin",
  title: "Payfix Advisors Content",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
