import type { MessageKey , MessageType,AnyObj } from "./types";
import { messages } from "./const";

export function cloneDeep(o:AnyObj){
  return JSON.parse(JSON.stringify(o))
}

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

type EventType = keyof typeof window.WEB_STORAGE_USER_REGISTERED_CALLBACK;
type Type = keyof {
  ["WEB_STORAGE_APIS"]: any;
  WEB_STORAGE_USER_REGISTERED_CALLBACK: typeof window.WEB_STORAGE_USER_REGISTERED_CALLBACK;
  WEB_STORAGE_USE_LOCAL_STORAGE: typeof window.WEB_STORAGE_USE_LOCAL_STORAGE;
  WEB_STORAGE_EXPIRES: typeof window.WEB_STORAGE_EXPIRES;
};

export function useCallback(
  eventType: EventType
): [Events[], (e: Events[]) => void] {
  const [callback] = useGlobal("WEB_STORAGE_USER_REGISTERED_CALLBACK");
  const curCb = callback[eventType] || [];
  return [
    cloneDeep(curCb),
    (newCb: Events[]) => {
      window.WEB_STORAGE_USER_REGISTERED_CALLBACK[eventType] = newCb as any;
    },
  ];
}

export function useGlobal(type: Type) {
  return [
    window[type],
    (newValue: any) => {
      window[type] = newValue;
    },
  ];
}