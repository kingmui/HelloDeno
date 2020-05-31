import { camelCase } from "../deps.ts";

/**
 * 转换字符串为驼峰 + 大写字母数量 🐪
 *
 * @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text
 * @returns {string}
 */
export function camelize(text: string) {
  const camelCaseText = camelCase(text);
  /**
   * How to Debugging
   * 1. deno run --allow-net --allow-read --inspect-brk src/ws/server.ts
   * 2. chrome://inspect
   */
  // debugger;
  const matches = camelCaseText.match(/[A-Z]/g) || [];
  const camels = Array.from({ length: matches.length })
    .map(() => "🐪")
    .join("");

  return `${camelCaseText} ${camels}`;
}
