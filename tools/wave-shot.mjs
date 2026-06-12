import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
const el = await page.evaluateHandle(() =>
  [...document.querySelectorAll("header a")].find(
    (a) => a.getAttribute("aria-label") === "Methodology",
  ),
);
const box = await el.asElement().boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await new Promise((r) => setTimeout(r, 230));
await page.screenshot({
  path: "temporary screenshots/wave-mid.png",
  clip: { x: 700, y: 0, width: 740, height: 64 },
});
await browser.close();
console.log("ok");
