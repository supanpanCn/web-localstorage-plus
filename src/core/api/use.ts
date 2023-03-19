import type { PluginParams } from "../../plugin";
import type { This, PluginCb } from "./index";
import pluginEncrypt from "../../plugin/encrypt";
import pluginWatch from "../../plugin/watch"

export function useBuildInPlugin(
  this: This,
  methods: {
    use: typeof use;
  }
) {
  const buildIn = [pluginEncrypt,pluginWatch];
  buildIn.forEach((v) => {
    methods.use.call(this, v, "buildIn");
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

function use(
  this: This,
  userCallback: PluginCb,
  framework?: "customer" | "buildIn"
) {
  this.plugins.push({
    framework: framework || "customer",
    apis: setApis(userCallback),
  });
}

export default use;
