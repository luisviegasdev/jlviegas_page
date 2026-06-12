import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle0" });
const footer = await page.$("footer");
await footer.screenshot({ path: "temporary screenshots/footer-detail.png" });
await browser.close();
console.log("ok");
