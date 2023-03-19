import type { MessageKey , MessageType } from "./types";
import { messages } from "./const";

export const isObject = (p: any) =>
  Object.prototype.toString.call(p) === "[object Object]";

export function log(
  messageType: keyof MessageKey,
  color: MessageType = "log",
  rest?: any
) {
  let msg = messages.get(messageType);
  if (typeof msg === "function") {
    msg = msg(rest);
  }
  console[color](`[web-storage]:${msg}`);
}


export function setupGlobal(that:any){
  window.WEB_STORAGE_USE_LOCAL_STORAGE = () => that.localStorage!;
  window.WEB_STORAGE_EXPIRES = []
  window.WEB_STORAGE_USER_REGISTERED_CALLBACK = {
    change: [],
    expire: [],
    on: [],
  };
  window.WEB_STORAGE_IS_WARNING = true
}