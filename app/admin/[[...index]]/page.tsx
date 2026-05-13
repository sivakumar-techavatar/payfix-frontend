"use client";

/**
 * Embedded Sanity Studio at /admin.
 *
 * Sanity handles its own auth — visiting this page in a fresh browser
 * shows Sanity's login screen. Sign in with the same email used to create
 * your Sanity project at sanity.io. After auth, you'll see the full
 * content editor for Featured Posts + any future content types.
 *
 * CORS requirement: in sanity.io/manage → your project → API → CORS Origins,
 * add `https://payfixadvisors.in` (and `http://localhost:3000` for local dev).
 * Without this you'll see "Failed to connect to Sanity" in Studio.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function AdminStudioPage() {
  return <NextStudio config={config} />;
}
