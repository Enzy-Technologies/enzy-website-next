import React from "react";
import Script from "next/script";

/**
 * Layout for the (landing) route group — applies to every `/lp/*` page only
 * (e.g. `/lp/meta`), and nothing else on the site.
 *
 * Ad-traffic tracking lives here so the Meta Pixel fires on landing pages but
 * stays off the main marketing site. Loaded via next/script with
 * `afterInteractive`, the standard strategy for pixels in the App Router.
 *
 * Note: Hyros is intentionally NOT here — it loads site-wide from the root
 * layout, which already covers /lp pages. Loading it here too would double-fire
 * on landing pages.
 */

const META_PIXEL_ID = "1262474085208039";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {children}
    </>
  );
}
