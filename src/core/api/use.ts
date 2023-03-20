import type { PluginParams } from "../../plugin";
import type { PluginCb } from "./index";
import { native } from "./index";
import pluginEncrypt from "../../plugin/encrypt";
import pluginWatch from "../../plugin/watch";
import pluginExpire from "../../plugin/expire";

export function useBuildInPlugin(methods: { use: typeof use }) {
  const buildIn = [pluginExpire, pluginEncrypt, pluginWatch];
  buildIn.forEach((v) => {
    methods.use(v, "buildIn");
  });
}

function setApis(api: PluginCb) {
  return {
    getItem: (p: PluginParams) =>
      api({
        ...p,
        wark: "getItem",
      }),
    setItem: (p: PluginParams) =>
      api({
        ...p,
        wark: "setItem",
      }),
    removeItem: (p: PluginParams) =>
      api({
        ...p,
        wark: "removeItem",
      }),
    clear: (p: PluginParams) =>
      api({
        ...p,
        wark: "clear",
      }),
  };
}

function use(userCallback: PluginCb, framework?: "customer" | "buildIn") {
  native.plugins.push({
    framework: framework || "customer",
    apis: setApis(userCallback),
  });
}

export default use;
