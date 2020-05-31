import { assertStrictEq } from "../src/deps.ts";
import { camelize } from "../src/utils/index.ts";

Deno.test("camelize works", async () => {
  assertStrictEq(camelize("this is an example"), "thisIsAnExample 🐪🐪🐪");
});
