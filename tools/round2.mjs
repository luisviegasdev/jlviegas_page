// Round-2 checks: PT locale, mobile nav/sheet, keyboard focus ring.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();

// 1 — PT locale, desktop home (top)
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
const ptBtn = await page.$$eval("header button", (btns) => {
  const b = btns.find((x) => x.textContent?.trim().toLowerCase() === "pt");
  b?.click();
  return !!b;
});
if (!ptBtn) console.error("PT button not found");
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "temporary screenshots/r2-home-pt.png" });

// html lang should now be pt-BR
console.log("lang:", await page.evaluate(() => document.documentElement.lang));

// 2 — keyboard focus ring on nav link
await page.keyboard.press("Tab");
await page.keyboard.press("Tab");
await new Promise((r) => setTimeout(r, 200));
await page.screenshot({
  path: "temporary screenshots/r2-focus.png",
  clip: { x: 0, y: 0, width: 1440, height: 64 },
});

// 3 — mobile home + open sheet
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "temporary screenshots/r2-mobile-home.png" });
await page.click('button[aria-label="Open menu"]');
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "temporary screenshots/r2-mobile-sheet.png" });

await browser.close();
console.log("done");
