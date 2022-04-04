import * as fs from "fs/promises";
import * as path from "path";
import type { Plugin } from 'vite';
import { marked } from "marked";
import type { BookConfig } from "./BookConfig";

import { UserOptions, resolveOptions } from './Options';

import dirToBook from "./dirToBook";
import dirToLocalizedBooks from "./dirToLocalizedBooks";
import recursiveDirToBooks from "./recursiveDirToBooks";

function WebwriterCompiler(userOptiuons: UserOptions = {}): Plugin[] {
  const options = resolveOptions(userOptiuons);

  return [
    {
      name: 'content-compiler',

      apply: 'build',

      async buildStart() {
        const compileBook = async (bookConfig: any) => {
          const book: any = {};

          // Iterate over every chapter in bookConfig
          for (const [chapterKey, chapterPath] of Object.entries(bookConfig.chapters)) {
            if (typeof chapterPath === "string") {
              try {
                // Read file at chapter path
                const raw = await fs.readFile(path.resolve(chapterPath), 'utf-8')
                // Parse and add chapter to book
                book[chapterKey] = chapterPath.endsWith(".md") ? marked.parse(raw) : raw;
              } catch (err: any) {
                this.error(`Failed to read or parse file ${chapterPath}`)
              }
            } else {
              this.error(`Non string path ${chapterPath} detected in book ${bookConfig.name}`)
            }
          }

          // Emit the book
          this.emitFile({
            type: 'asset',
            fileName: path.join(options.outDir, `${bookConfig.name}.json`),
            source: JSON.stringify(book),
          })
        };

        // const compileBooks = async (configPath: string) => {
        //   let bookConfigs = [];

        //   // Load book configs
        //   const bookConfigModule = (await import(configPath)).default;
        //   if (bookConfigModule.constructor.name === "AsyncFunction") {
        //     // Await execution if async function is the default export
        //     bookConfigs = await bookConfigModule();
        //   } else if (bookConfigModule.constructor.name === "Function") {
        //     // Execute if a function is the default export
        //     bookConfigs = bookConfigModule();
        //   } else if () {

        //   }

        //   // compileBook for every bookConfig
        //   bookConfigs.forEach((bookConfig: any) => {
        //     compileBook(bookConfig);
        //   });
        // };

        // await compileBooks("./src/content/configureBooks.js");

        // compileBook for every bookConfig
        options.bookConfigs.forEach((bookConfig: any) => {
          compileBook(bookConfig);
        });
      }
    }
  ];
}

export default WebwriterCompiler;
export { dirToBook, dirToLocalizedBooks, recursiveDirToBooks };
export type { BookConfig }
