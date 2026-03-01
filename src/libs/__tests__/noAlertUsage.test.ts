import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(__dirname, "../../../");
const srcDir = path.join(projectRoot, "src");
const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);

const collectSourceFiles = (dirPath: string): string[] => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];

  entries.forEach((entry) => {
    if (entry.name === "node_modules" || entry.name === "build" || entry.name.startsWith(".")) {
      return;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      return;
    }

    const ext = path.extname(entry.name);
    if (allowedExtensions.has(ext)) {
      files.push(fullPath);
    }
  });

  return files;
};

describe("alert usage guard", () => {
  it("does not use alert() in source code", () => {
    const files = collectSourceFiles(srcDir);
    const currentSpecPath = path.resolve(__filename);
    const violations: string[] = [];

    files.forEach((file) => {
      if (path.resolve(file) === currentSpecPath) {
        return;
      }
      const content = fs.readFileSync(file, "utf-8");
      if (/\balert\s*\(/.test(content) || /\bwindow\.alert\s*\(/.test(content)) {
        violations.push(path.relative(projectRoot, file));
      }
    });

    expect(violations).toEqual([]);
  });
});
