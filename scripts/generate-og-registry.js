const fs = require("fs");
const vm = require("vm");
const path = require("path");

const catalogFiles = [
  { file: "js/catalogs/filli-boya-renxmatik.js", page: "/filli-boya-renxmatik.html", brand: "Filli Boya", type: "obj", varName: "products" },
  { file: "js/catalogs/fawori-boya.js", page: "/fawori-boya.html", brand: "Fawori", type: "obj", varName: "products" },
  { file: "js/catalogs/marshall-boya.js", page: "/marshall-boya.html", brand: "Marshall", type: "arr", varName: "MARSHALL_PRODUCTS_DATA" },
  { file: "js/catalogs/tek-boya.js", page: "/tek-boya.html", brand: "TEK Boya", type: "arr", varName: "TEK_PRODUCTS_DATA" },
  { file: "js/catalogs/weber-yapi-kimyasallari.js", page: "/weber-yapi-kimyasallari.html", brand: "Saint-Gobain Weber", type: "arr", varName: "WEBER_PRODUCTS_DATA" },
  { file: "js/catalogs/bianca-stella-boya.js", page: "/bianca-stella-boya.html", brand: "Bianca Stella", type: "arr", varName: "BIANCA_PRODUCTS_DATA" },
  { file: "js/catalogs/isonem-yalitim.js", page: "/isonem-yalitim.html", brand: "İsonem", type: "arr", varName: "ISONEM_PRODUCTS_DATA" },
  { file: "js/catalogs/formul-plastik-pprc.js", page: "/formul-plastik-pprc.html", brand: "Formül Plastik", type: "arr", varName: "FORMUL_PRODUCTS_DATA" },
  { file: "js/catalogs/k-othrine-hasere.js", page: "/k-othrine-hasere.html", brand: "Bayer K-Othrine", type: "arr", varName: "HASERE_PRODUCTS_DATA" },
  { file: "js/catalogs/kaba-yapi-cimento.js", page: "/kaba-yapi-cimento.html", brand: "Pervan Kaba Yapı", type: "arr", varName: "KABA_PRODUCTS_DATA" },
  { file: "js/catalogs/kilit-kapi-hirdavat.js", page: "/kilit-kapi-hirdavat.html", brand: "Kale Kilit", type: "arr", varName: "KILIT_PRODUCTS_DATA" },
  { file: "js/catalogs/el-aletleri.js", page: "/el-aletleri.html", brand: "Pervan El Aletleri", type: "arr", varName: "TOOLS_PRODUCTS_DATA" },
  { file: "js/catalogs/elektrik-aydinlatma.js", page: "/elektrik-aydinlatma.html", brand: "Pervan Elektrik", type: "arr", varName: "ELEKTRIK_PRODUCTS_DATA" },
  { file: "js/catalogs/baglanti-elemanlari.js", page: "/baglanti-elemanlari.html", brand: "Pervan Bağlantı", type: "arr", varName: "FASTENERS_PRODUCTS_DATA" },
  { file: "js/catalogs/tesisat-altyapi.js", page: "/tesisat-altyapi.html", brand: "Pervan Tesisat", type: "arr", varName: "TESISAT_PRODUCTS_DATA" }
];

const registry = {};

catalogFiles.forEach(({ file, page, brand, type, varName }) => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8");

  const varRegex = new RegExp("(?:var|let|const)\\s+" + varName + "\\s*=\\s*([\\[\\{][\\s\\S]*?\\n\\s*[\\]\\}];)");
  const match = content.match(varRegex);
  if (!match) return;

  try {
    const sandbox = {};
    vm.runInNewContext("var res = " + match[1].replace(/;$/, ""), sandbox);
    const data = sandbox.res;

    if (type === "obj") {
      Object.keys(data).forEach(id => {
        const item = data[id];
        const name = item.name || id;
        const desc = item.sub || item.desc || (brand + " Yetkili Bayi");
        const img = item.img || item.thumb || "";
        registry[id] = {
          page,
          title: (name.startsWith(brand) ? name : (brand + " " + name)) + " | Pervan",
          description: desc,
          image: img.startsWith("http") ? img : ("https://pervanyapi.com/" + img.replace(/^\.?\//, ""))
        };
      });
    } else if (type === "arr") {
      data.forEach(item => {
        if (!item.id) return;
        const name = item.name || item.id;
        const desc = item.desc || item.sub || (brand + " Yetkili Bayi");
        const img = item.thumb || item.img || "";
        registry[item.id] = {
          page,
          title: (name.startsWith(brand) ? name : (brand + " " + name)) + " | Pervan",
          description: desc,
          image: img.startsWith("http") ? img : ("https://pervanyapi.com/" + img.replace(/^\.?\//, ""))
        };
      });
    }
  } catch (err) {
    console.error("Error evaluating " + varName + " in " + file + ":", err.message);
  }
});

// 1. Write products-og.json
fs.writeFileSync("products-og.json", JSON.stringify(registry, null, 2), "utf8");

// 2. Write functions/_products.js
if (!fs.existsSync("functions")) fs.mkdirSync("functions", { recursive: true });
fs.writeFileSync("functions/_products.js", "export default " + JSON.stringify(registry, null, 2) + ";\n", "utf8");

// 3. Generate static HTML stubs in /urun/
if (!fs.existsSync("urun")) fs.mkdirSync("urun", { recursive: true });
let stubCount = 0;
Object.keys(registry).forEach(pid => {
  const data = registry[pid];
  const targetUrl = `${data.page}?item=${pid}#pvProductCatalog`;
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(data.title)}</title>
<meta name="description" content="${escapeHtml(data.description)}" />
<link rel="canonical" href="https://pervanyapi.com${data.page}?item=${pid}" />

<!-- Open Graph / WhatsApp / Facebook -->
<meta property="og:type" content="product" />
<meta property="og:site_name" content="Pervan Yapı Market" />
<meta property="og:title" content="${escapeHtml(data.title)}" />
<meta property="og:description" content="${escapeHtml(data.description)}" />
<meta property="og:image" content="${data.image}" />
<meta property="og:url" content="https://pervanyapi.com/urun/${pid}.html" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(data.title)}" />
<meta name="twitter:description" content="${escapeHtml(data.description)}" />
<meta name="twitter:image" content="${data.image}" />

<meta http-equiv="refresh" content="0; url=${targetUrl}" />
<script>
window.location.replace("${targetUrl}");
</script>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fafafa;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px;box-sizing:border-box;text-align:center;">
<div>
  <p style="font-size:16px;color:#333;margin-bottom:12px;">${escapeHtml(data.title)} sayfasına yönlendiriliyorsunuz...</p>
  <a href="${targetUrl}" style="color:#0066cc;font-size:14px;text-decoration:underline;">Otomatik yönlendirme çalışmazsa buraya tıklayın &rarr;</a>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join("urun", pid + ".html"), html, "utf8");
  stubCount++;
});

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

console.log("Updated products-og.json, functions/_products.js, and generated " + stubCount + " static stubs in /urun/.");
