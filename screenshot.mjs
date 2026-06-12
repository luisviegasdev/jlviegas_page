// Screenshot tool per CLAUDE.md workflow.
// Usage: node screenshot.mjs <url> [label]
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented).
// Machine-specific: update puppeteerPath if running on a different machine.
import puppeteer from "puppeteer-core";
import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const puppeteerPath =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const args = process.argv.slice(2);
const full = args.includes("--full");
const mobile = args.includes("--mobile");
const positional = args.filter((a) => !a.startsWith("--"));
const url = positional[0] ?? "http://localhost:3000";
const label = positional[1];

const outDir = path.resolve("./temporary screenshots");
mkdirSync(outDir, { recursive: true });

const used = readdirSync(outDir)
  .map((f) => /^screenshot-(\d+)/.exec(f)?.[1])
  .filter(Boolean)
  .map(Number);
const n = used.length ? Math.max(...used) + 1 : 1;
const file = path.join(
  outDir,
  `screenshot-${n}${label ? `-${label}` : ""}.png`,
);

const browser = await puppeteer.launch({
  executablePath: puppeteerPath,
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport(
  mobile
    ? { width: 390, height: 844, deviceScaleFactor: 2 }
    : { width: 1440, height: 900, deviceScaleFactor: 1 },
);
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
if (full) {
  // Walk the page so once-only scroll reveals fire before capture.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: file, fullPage: full });
await browser.close();
console.log(file);
