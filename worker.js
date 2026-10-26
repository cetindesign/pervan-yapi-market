import products from "./products.js";

export function getCanonicalRedirect(url, headers) {
  let redirected = false;
  const target = new URL(url.toString());

  // 1. Hostname normalization (www -> apex)
  if (target.hostname === "www.pervanyapi.com") {
    target.hostname = "pervanyapi.com";
    redirected = true;
  }

  // 2. Protocol normalization (http -> https)
  const isLocal = target.hostname === "localhost" || target.hostname === "127.0.0.1";
  const protoHeader = headers && typeof headers.get === "function" ? headers.get("x-forwarded-proto") : null;
  if (!isLocal && (target.protocol === "http:" || protoHeader === "http")) {
    target.protocol = "https:";
    redirected = true;
  }

  // 3. Path normalization for root-level HTML pages
  const pathname = target.pathname;
  const isExcluded = pathname.startsWith("/assets/") ||
                     pathname.startsWith("/css/") ||
                     pathname.startsWith("/js/") ||
                     pathname.startsWith("/urun/") ||
                     pathname.startsWith("/prototypes/") ||
                     pathname.startsWith("/scratch/") ||
                     pathname === "/robots.txt" ||
                     pathname === "/sitemap.xml" ||
                     pathname === "/favicon.ico";

  if (!isExcluded) {
    if (pathname === "/index.html" || pathname.endsWith("/index.html")) {
      const clean = pathname.replace(/\/index\.html$/, "") || "/";
      if (clean !== pathname) {
        target.pathname = clean;
        redirected = true;
      }
    } else if (pathname.endsWith(".html")) {
      target.pathname = pathname.slice(0, -5);
      redirected = true;
    }
  }

  return redirected ? target.toString() : null;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Canonical 301 redirect engine
    const redirectUrl = getCanonicalRedirect(url, request.headers);
    if (redirectUrl) {
      return new Response(null, {
        status: 301,
        statusText: "Moved Permanently",
        headers: {
          "Location": redirectUrl,
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    const itemId = url.searchParams.get("item") || url.searchParams.get("product") || url.searchParams.get("id");

    const response = await env.ASSETS.fetch(request);

    if (!itemId) {
      return response;
    }

    const product = products[itemId];
    if (!product) {
      return response;
    }

    const rewriter = new HTMLRewriter()
      .on("title", {
        element(e) {
          e.setInnerContent(product.title);
        }
      })
      .on("meta", {
        element(e) {
          const prop = e.getAttribute("property") || "";
          const name = e.getAttribute("name") || "";
          if (prop === "og:title" || name === "twitter:title") {
            e.setAttribute("content", product.title);
          }
          if (prop === "og:description" || name === "twitter:description") {
            e.setAttribute("content", product.description);
          }
          if (prop === "og:image" || name === "twitter:image") {
            e.setAttribute("content", product.image);
          }
          if (prop === "og:url") {
            e.setAttribute("content", url.href);
          }
        }
      });

    const transformed = rewriter.transform(response);
    const newHeaders = new Headers(transformed.headers);
    newHeaders.set("x-worker-debug", "rewritten-" + itemId);
    return new Response(transformed.body, {
      status: transformed.status,
      statusText: transformed.statusText,
      headers: newHeaders
    });
  }
};
