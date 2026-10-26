import test from "node:test";
import assert from "node:assert/strict";
import { getCanonicalRedirect } from "../worker.js";

test("1. Root clean URL should not redirect", () => {
  const res = getCanonicalRedirect("https://pervanyapi.com/");
  assert.equal(res, null);
});

test("2. /index.html should 301 redirect to root /", () => {
  const res = getCanonicalRedirect("https://pervanyapi.com/index.html");
  assert.equal(res, "https://pervanyapi.com/");
});

test("3. Root page with .html should redirect to clean slug", () => {
  const res = getCanonicalRedirect("https://pervanyapi.com/isonem-yalitim.html");
  assert.equal(res, "https://pervanyapi.com/isonem-yalitim");
});

test("4. Clean slug should not redirect (prevents infinite loop)", () => {
  const res = getCanonicalRedirect("https://pervanyapi.com/isonem-yalitim");
  assert.equal(res, null);
});

test("5. Query parameters must be preserved during .html redirect", () => {
  const res = getCanonicalRedirect("https://pervanyapi.com/tek-boya.html?item=101-akustik&utm_source=google");
  assert.equal(res, "https://pervanyapi.com/tek-boya?item=101-akustik&utm_source=google");
});

test("6. HTTP should redirect to HTTPS", () => {
  const res = getCanonicalRedirect("http://pervanyapi.com/balcova-showroom");
  assert.equal(res, "https://pervanyapi.com/balcova-showroom");
});

test("7. WWW should redirect to apex domain", () => {
  const res = getCanonicalRedirect("https://www.pervanyapi.com/fawori-boya");
  assert.equal(res, "https://pervanyapi.com/fawori-boya");
});

test("8. Combined: HTTP + WWW + .html + query params in a single 301 hop", () => {
  const res = getCanonicalRedirect("http://www.pervanyapi.com/bianca-stella-boya.html?param=ok");
  assert.equal(res, "https://pervanyapi.com/bianca-stella-boya?param=ok");
});

test("9. Static assets should NEVER be redirected", () => {
  assert.equal(getCanonicalRedirect("https://pervanyapi.com/assets/logo.png"), null);
  assert.equal(getCanonicalRedirect("https://pervanyapi.com/css/pervan.css"), null);
  assert.equal(getCanonicalRedirect("https://pervanyapi.com/js/catalogs/isonem-yalitim.js"), null);
  assert.equal(getCanonicalRedirect("https://pervanyapi.com/robots.txt"), null);
  assert.equal(getCanonicalRedirect("https://pervanyapi.com/sitemap.xml"), null);
  assert.equal(getCanonicalRedirect("https://pervanyapi.com/urun/capatect-donati-sivasi.html"), null);
});
