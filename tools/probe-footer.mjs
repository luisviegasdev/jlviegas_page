// One-off probe: why is the footer wordmark clipped?
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle0" });

const info = await page.evaluate(() => {
  const el = [...document.querySelectorAll("footer p")].find(
    (p) => p.textContent?.trim() === "Lumo",
  );
  if (!el) return "not found";
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  let clipper = null;
  for (let a = el.parentElement; a; a = a.parentElement) {
    const acs = getComputedStyle(a);
    if (acs.overflow !== "visible" || acs.contain !== "none" || acs.clipPath !== "none") {
      clipper = {
        tag: a.tagName,
        cls: a.className,
        overflow: acs.overflow,
        contain: acs.contain,
        clipPath: acs.clipPath,
      };
      break;
    }
  }
  return {
    fontFamily: cs.fontFamily,
    fontWeight: cs.fontWeight,
    fontSize: cs.fontSize,
    lineHeight: cs.lineHeight,
    rect: { top: r.top, height: r.height },
    clipper,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
