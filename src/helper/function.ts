import type { MessageKey , MessageType } from "./types";
import { messages } from "./const";
import colors from "picocolors";

export const isObject = (p: any) =>
  Object.prototype.toString.call(p) === "[object Object]";

export function log(
  messageType: keyof MessageKey,
  color: MessageType = "red",
  rest?: any
) {
  let msg = messages.get(messageType);
  if (typeof msg === "function") {
    msg = msg(rest);
  }
  console.log(colors[color](`[web-storage]:${msg}`));
}
