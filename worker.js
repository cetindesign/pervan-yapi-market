import products from "./products-og.json";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const itemId = url.searchParams.get("item") || url.searchParams.get("product") || url.searchParams.get("id");

    const response = await env.ASSETS.fetch(request);

    if (!itemId) {
      return response;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const product = products[itemId];
    if (!product) {
      return response;
    }

    return new HTMLRewriter()
      .on("title", {
        element(e) {
          e.setInnerContent(product.title);
        }
      })
      .on('meta[property="og:title"]', {
        element(e) {
          e.setAttribute("content", product.title);
        }
      })
      .on('meta[property="og:description"]', {
        element(e) {
          e.setAttribute("content", product.description);
        }
      })
      .on('meta[property="og:image"]', {
        element(e) {
          e.setAttribute("content", product.image);
        }
      })
      .on('meta[property="og:url"]', {
        element(e) {
          e.setAttribute("content", url.href);
        }
      })
      .on('meta[name="twitter:title"]', {
        element(e) {
          e.setAttribute("content", product.title);
        }
      })
      .on('meta[name="twitter:description"]', {
        element(e) {
          e.setAttribute("content", product.description);
        }
      })
      .on('meta[name="twitter:image"]', {
        element(e) {
          e.setAttribute("content", product.image);
        }
      })
      .transform(response);
  }
};
