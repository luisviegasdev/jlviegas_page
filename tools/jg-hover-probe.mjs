// Probe joegarnerdesign.com link hover animation:
// dump link DOM structure, hover one, and sample per-char inline styles.
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

// 1 — collect candidate links and their structure
const links = await page.evaluate(() => {
  return [...document.querySelectorAll("a")]
    .filter((a) => a.offsetParent && a.textContent.trim().length > 2)
    .slice(0, 12)
    .map((a, i) => ({
      i,
      text: a.textContent.trim().slice(0, 30),
      cls: a.className.toString().slice(0, 80),
      html: a.outerHTML.slice(0, 400),
    }));
});
console.log(JSON.stringify(links, null, 2));

// 2 — hover the first nav-like link and sample char styles over time
const target = await page.evaluateHandle(() => {
  const links = [...document.querySelectorAll("a")].filter(
    (a) => a.offsetParent && a.textContent.trim().length > 2,
  );
  return links.find((a) => a.querySelector("span")) ?? links[0];
});
const box = await target.boundingBox();
if (box) {
  const samples = [];
  const sample = () =>
    page.evaluate((el) => {
      const chars = el.querySelectorAll("span");
      return [...chars].slice(0, 8).map((c) => ({
        t: c.textContent,
        style: c.getAttribute("style") || "",
        cls: c.className.toString().slice(0, 60),
      }));
    }, target);

  samples.push({ at: "before", chars: await sample() });
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  for (const ms of [60, 150, 300, 500, 800]) {
    await new Promise((r) => setTimeout(r, ms));
    samples.push({ at: `+${ms}ms`, chars: await sample() });
  }
  console.log(JSON.stringify(samples, null, 2));
}
await browser.close();
