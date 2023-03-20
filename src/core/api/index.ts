import { PluginParams } from "../../plugin";
import nativeStorage from "../native-storage";
import { native } from '../web-storage'
export { useCallback , useGlobal } from '../../helper'
export { native } from '../web-storage'

export function getNamespace(namespace?: string) {
  if (namespace) {
    return namespace;
  }
  return "";
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
  payload: any,
  wark: "getItem" | "setItem" | "removeItem" | "clear"
) {
  let value = payload.value;
  const buildIn = native.plugins.filter((v) => v.framework === "buildIn");
  const users = native.plugins.filter((v) => v.framework === "customer");
  const plugins = [...buildIn, ...users];
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    value =  payload.value = plugin.apis[wark](payload);
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
