import Script from "next/script";

/**
 * Renders Google Analytics 4, Google Tag Manager, Meta Pixel, and
 * LinkedIn Insight Tag — each gated behind a public env var.
 *
 * When an env var is empty/unset, that vendor's script is not rendered
 * at all (zero requests, no privacy concern, no console noise).
 *
 * Env vars (all NEXT_PUBLIC_* because they're public IDs):
 *   NEXT_PUBLIC_GA4_ID              "G-XXXXXXXXXX"
 *   NEXT_PUBLIC_GTM_ID              "GTM-XXXXXXX"
 *   NEXT_PUBLIC_META_PIXEL_ID       "1234567890123456"
 *   NEXT_PUBLIC_LINKEDIN_PARTNER_ID "12345678"
 *
 * Prefer GTM as the single tag-management layer when available. If only
 * GA4 is configured, we load it directly via gtag.js.
 */
export default function Analytics() {
  const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
  const GTM = process.env.NEXT_PUBLIC_GTM_ID;
  const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const LI = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  return (
    <>
      {GTM && (
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM}');
            `.trim(),
          }}
        />
      )}

      {GA4 && !GTM && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4}', { anonymize_ip: true });
              `.trim(),
            }}
          />
        </>
      )}

      {META && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META}');
fbq('track', 'PageView');
            `.trim(),
          }}
        />
      )}

      {LI && (
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
_linkedin_partner_id = "${LI}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
            `.trim(),
          }}
        />
      )}
    </>
  );
}

/**
 * Render <noscript> fallbacks for tags that need them.
 * Must be placed in <body>, not <head> — Next will inject correctly
 * when this is rendered inside <body>.
 */
export function AnalyticsNoscript() {
  const GTM = process.env.NEXT_PUBLIC_GTM_ID;
  const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!GTM && !META) return null;

  return (
    <>
      {GTM && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
      {META && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}
