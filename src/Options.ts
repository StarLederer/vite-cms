import { BookConfig } from "./BookConfig";

interface UserOptions {
  bookConfigs?: BookConfig[];
  outDir?: string;
}

interface Options extends Required<UserOptions> { }

const defaultOptions: Options = {
  bookConfigs: [],
  outDir: "",
};

function resolveOptions(userOptiuons: UserOptions): Options {
  return Object.assign(defaultOptions, userOptiuons);
}

export {
  UserOptions,
  Options,
  defaultOptions,
  resolveOptions,
};
