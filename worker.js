import products from "./products.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
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
