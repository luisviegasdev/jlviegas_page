// Verify the WaveLink hover wave on localhost: hover a nav link and
// sample per-char computed transforms over time (mirrors jg-hover-probe2).
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

const target = await page.evaluateHandle(() => {
  return [...document.querySelectorAll("header a")].find(
    (a) => a.getAttribute("aria-label") === "Works",
  );
});
if (!(await target.jsonValue?.()) && !target.asElement()) {
  console.error("Works link not found");
  process.exit(1);
}
const sample = () =>
  page.evaluate((el) => {
    return [...el.querySelectorAll("span span")].map((c) => {
      const t = getComputedStyle(c).transform;
      // extract vertical scale from matrix3d/matrix (rotateX squash)
      let squash = "";
      if (t.startsWith("matrix3d")) {
        const v = t.slice(9, -1).split(",").map(Number);
        squash = v[5].toFixed(2); // m22 = cos(rotateX)
      } else if (t.startsWith("matrix")) {
        const v = t.slice(7, -1).split(",").map(Number);
        squash = v[3].toFixed(2);
      } else squash = t;
      return `${c.textContent}:${squash}`;
    }).join(" ");
  }, target);

const box = await target.asElement().boundingBox();
console.log("before:", await sample());
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
for (const ms of [60, 100, 100, 150, 200, 400]) {
  await new Promise((r) => setTimeout(r, ms));
  console.log(`+${ms}ms:`, await sample());
}
await browser.close();
