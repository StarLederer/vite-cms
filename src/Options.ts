import { BookConfig } from "./BookConfig";

interface UserOptions {
  bookConfigs?: BookConfig[];
}

interface Options extends Required<UserOptions> { }

const defaultOptions: Options = {
  bookConfigs: [],
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
