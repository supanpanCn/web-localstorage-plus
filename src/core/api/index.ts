import { PluginParams } from "../../plugin";
import { cloneDeep } from "lodash-es";
import nativeStorage from "../native-storage";

type EventType = keyof typeof window.WEB_STORAGE_USER_REGISTERED_CALLBACK;
type Type = keyof {
  ["WEB_STORAGE_APIS"]: any;
  WEB_STORAGE_USER_REGISTERED_CALLBACK: typeof window.WEB_STORAGE_USER_REGISTERED_CALLBACK;
  WEB_STORAGE_USE_LOCAL_STORAGE: typeof window.WEB_STORAGE_USE_LOCAL_STORAGE;
  WEB_STORAGE_EXPIRES: typeof window.WEB_STORAGE_EXPIRES;
};

export function getNamespace(namespace?: string) {
  if (namespace) {
    return namespace;
  }
  return "";
}

export function useCallback(
  eventType: EventType
): [Events[], (e: Events[]) => void] {
  const [callback] = useGlobal("WEB_STORAGE_USER_REGISTERED_CALLBACK");
  const curCb = callback[eventType] || [];
  return [
    cloneDeep(curCb),
    (newCb: Events[]) => {
      window.WEB_STORAGE_USER_REGISTERED_CALLBACK[eventType] = newCb;
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

export type PluginCb = (params: PluginParams) => any;

export type Plugin = {
  framework: "buildIn" | "customer";
  apis: {
    getItem: PluginCb;
    setItem: PluginCb;
    removeItem: PluginCb;
    clear: PluginCb;
  };
};

export function runPlugin(
  this: This,
  payload: any,
  wark: "getItem" | "setItem" | "removeItem" | "clear"
) {
  let value = payload.value;
  const buildIn = this.plugins.filter((v) => v.framework === "buildIn");
  const users = this.plugins.filter((v) => v.framework === "customer");
  const plugins = [...buildIn, ...users];
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    value = plugin.apis[wark](payload);
  }
  return value;
}

export type This = ReturnType<typeof nativeStorage> & {
  plugins: Plugin[];
};

export type { SetParams, GetParams, RemoveParams } from "../native-storage";
export { default as getItem } from "./getItem";
export { default as setItem } from "./setItem";
export { default as removeItem } from "./removeItem";
export { default as clear } from "./clear";
export { default as change } from "./change";
export { default as bus } from "./bus";
export { default as expire } from "./expire";
export { default as use } from "./use";
