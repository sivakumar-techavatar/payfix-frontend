/**
 * Server-side verification of a Cloudflare Turnstile token.
 *
 * Returns true if the captcha passes OR if TURNSTILE_SECRET is not
 * configured (development convenience — no captcha enforcement until
 * the env var is set in production).
 */
export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;

  // No secret configured = captcha enforcement is OFF.
  if (!secret) return true;

  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: ip,
        }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data?.success);
  } catch (err) {
    console.error("[turnstile] verify failed:", (err as Error).message);
    return false;
  }
}
