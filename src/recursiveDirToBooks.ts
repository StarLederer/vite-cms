import * as fs from "fs/promises";
import { resolve } from "path";
import { BookConfig } from "./BookConfig.js";

async function recursiveDirToBooks(dirPath: string): Promise<BookConfig[]> {
  const books = await recursiveDirToBooksBranch(dirPath, dirPath);
  return books;
}

async function recursiveDirToBooksBranch(root: string, dirPath: string): Promise<BookConfig[]> {
  const books: BookConfig[] = [];

  let hasAnyChapters = false;
  const name = `.${dirPath.substring(root.length)}/index`;
  const book: BookConfig = {
    name,
    chapters: {}
  };

  const items = await fs.readdir(dirPath, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      books.push(
        ...await (recursiveDirToBooksBranch(root, resolve(`${dirPath}/${item.name}`)))
      );
    }
    else if (item.isFile()) {
      hasAnyChapters = true;
      const chapterName = item.name.replace(/\.[^/.]+$/, "");
      book.chapters[chapterName] = resolve(dirPath, item.name);
    }
  }

  if (hasAnyChapters) { books.push(book); }

  return books;
}

export default recursiveDirToBooks;
