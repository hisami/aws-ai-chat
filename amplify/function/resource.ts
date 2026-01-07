import { defineFunction } from "@aws-amplify/backend";

export const helloWorldFunction = defineFunction({
  entry: "./handler.ts",
});
