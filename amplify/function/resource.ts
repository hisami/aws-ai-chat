import { defineFunction } from "@aws-amplify/backend";

export const helloWorldFunction = defineFunction({
  runtime: 22,
  name: "helloWorldFunction",
  entry: "./handler.ts",
});
