// Sample per-char inline styles during hover on joegarnerdesign.com links.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://www.joegarnerdesign.com/", {
  waitUntil: "networkidle0",
  timeout: 90000,
});
await new Promise((r) => setTimeout(r, 2500));

const target = await page.evaluateHandle(() => {
  return [...document.querySelectorAll("a")].find(
    (a) => a.offsetParent && a.textContent.trim() === "menu",
  );
});
const box = await target.boundingBox();
const sample = () =>
  page.evaluate(
    (el) =>
      [...el.querySelectorAll("div[aria-hidden]")].map((c) => ({
        t: c.textContent,
        s: c.getAttribute("style"),
      })),
    target,
  );

console.log("BEFORE:", JSON.stringify(await sample()));
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
for (const ms of [50, 100, 100, 150, 200, 400]) {
  await new Promise((r) => setTimeout(r, ms));
  console.log(`\n+${ms}:`, JSON.stringify(await sample()));
}
// mouse out
await page.mouse.move(10, 500);
await new Promise((r) => setTimeout(r, 400));
console.log("\nAFTER OUT:", JSON.stringify(await sample()));
await browser.close();
