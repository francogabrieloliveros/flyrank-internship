import path from "path";
import { writeFile, readFile, access, mkdir } from "fs/promises";

export const fileExists = async (p: string): Promise<boolean> => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

export const cache = async (
  text: string,
  dir: string,
  filename: string,
): Promise<void> => {
  if (!(await fileExists(dir))) {
    await mkdir(dir, { recursive: true });
  }
  const fullPath = path.join(dir, filename);
  await writeFile(fullPath, text, "utf-8");
};

export const readCache = async (
  dir: string,
  filename: string,
): Promise<string> => {
  return readFile(path.join(dir, filename), "utf-8");
};

export const byteSize = (text: string): number =>
  Buffer.byteLength(text, "utf-8");

export const getPageFile = (pageUrl: string): string => {
  const pageRoutes = pageUrl.split("/").filter((str) => str !== "");
  let pageFile = pageRoutes.pop();
  if (pageFile === "index.html") {
    pageFile = pageRoutes.pop();
  }
  return pageFile!;
};
