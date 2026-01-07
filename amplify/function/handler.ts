import type { Schema } from "../data/resource.ts";

export const handler: Schema["HelloWorld"]["functionHandler"] = async () => {
  return "Hello, World!";
};
