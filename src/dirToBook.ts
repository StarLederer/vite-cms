import * as fs from "fs/promises";
import { resolve } from "path";
import { BookConfig } from "./BookConfig";

async function dirToBook(bookName: string, dirPath: string) {
  const book: BookConfig = {
    name: bookName,
    chapters: {}
  };

  for (const item of await fs.readdir(dirPath)) {
    const localname = item.replace(/\.[^/.]+$/, "");
    book.chapters[localname] = resolve(dirPath, item);
  }

  return book;
}

export default dirToBook;
