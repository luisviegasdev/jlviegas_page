// Probe: which font faces exist, their load status, and what the hero h1 uses.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
const fontRequests = [];
page.on("response", (r) => {
  if (/\.(woff2?|ttf|otf)(\?|$)/.test(r.url()))
    fontRequests.push(`${r.status()} ${r.url().split("/").pop()}`);
});
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

const report = await page.evaluate(() => {
  const faces = [...document.fonts].map((f) => ({
    family: f.family,
    weight: f.weight,
    status: f.status,
    range: f.unicodeRange === "U+0-10FFFF" ? "all" : f.unicodeRange.slice(0, 40),
  }));
  const h1 = document.querySelector("h1");
  const cs = h1 ? getComputedStyle(h1) : null;

  // Width test: render the same text in each candidate family alone.
  const probe = (family) => {
    const s = document.createElement("span");
    s.textContent = "BESPOKE DIGITAL";
    s.style.cssText = `position:absolute;visibility:hidden;font-weight:700;font-size:100px;font-family:${family}`;
    document.body.appendChild(s);
    const w = s.getBoundingClientRect().width;
    s.remove();
    return Math.round(w);
  };
  const famList = cs ? cs.fontFamily.split(",").map((x) => x.trim()) : [];
  return {
    h1FontFamily: cs?.fontFamily,
    h1Weight: cs?.fontWeight,
    h1ActualWidth: h1 ? probe(cs.fontFamily) : null,
    perFamilyWidth: famList.map((f) => ({ f, w: probe(f) })),
    serifWidth: probe("serif"),
    faces,
  };
});
console.log(JSON.stringify(report, null, 2));
console.log("font requests:", fontRequests);
await browser.close();
