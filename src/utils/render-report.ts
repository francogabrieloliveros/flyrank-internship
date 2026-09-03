import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const renderReport = async (html: string, id: number) => {
  const outDir = path.resolve("reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, `${id}.pdf`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
};

export default renderReport;
