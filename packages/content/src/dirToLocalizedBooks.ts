import * as fs from "fs/promises";
import { resolve } from "path";
import { BookConfig } from "./BookConfig.js";

async function dirToLocalizedBooks(bookName: string, dirPath: string, locales: string[]) {
  const books: BookConfig[] = [];

  locales.forEach((locale) => {
    books.push({
      name: `${bookName}.${locale}`,
      chapters: {},
    });
  });

  for (const item of await fs.readdir(dirPath)) {
    const localname = item.replace(/\.[^/.]+$/, "");
    const basename = localname.replace(/\.[^/.]+$/, "");
    locales.forEach((locale, i) => {
      if (localname.endsWith(`.${locale}`)) {
        books[i].chapters[basename] = resolve(dirPath, item);
      }
    });
  }

  return books;
}

export default dirToLocalizedBooks;
