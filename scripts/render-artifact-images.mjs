import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = process.cwd();
const browserExecutablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH || undefined;

const ensureDir = async (p) => fs.mkdir(p, { recursive: true });

const captureSet = async (browser, inputDir, outputDir, options = {}) => {
  const { fullPage = false } = options;
  await ensureDir(outputDir);
  const entries = (await fs.readdir(inputDir)).filter((f) => f.endsWith(".html")).sort();
  for (const file of entries) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    const target = `file:///${path.join(inputDir, file).replace(/\\/g, "/")}`;
    await page.goto(target, { waitUntil: "networkidle0" });
    await new Promise((resolve) => setTimeout(resolve, 120));
    await page.screenshot({
      path: path.join(outputDir, `${path.basename(file, ".html")}.png`),
      fullPage,
    });
    await page.close();
    console.log("captured", file);
  }
};

const browser = await puppeteer.launch({
  headless: true,
  // Portable strategy:
  // - use env override when required (PUPPETEER_EXECUTABLE_PATH or CHROME_PATH)
  // - otherwise let Puppeteer resolve a browser automatically
  ...(browserExecutablePath ? { executablePath: browserExecutablePath } : {}),
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  await captureSet(
    browser,
    path.join(root, "artifacts", "visuals", "diagrams", "enhanced", "html"),
    path.join(root, "artifacts", "visuals", "diagrams", "enhanced", "png"),
    { fullPage: false }
  );
  await captureSet(
    browser,
    path.join(root, "artifacts", "visuals", "dashboards", "html"),
    path.join(root, "artifacts", "visuals", "dashboards", "png"),
    { fullPage: false }
  );
} finally {
  await browser.close();
}
