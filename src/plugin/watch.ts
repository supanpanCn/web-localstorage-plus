import type { PluginParams } from "./index";
import { useCallback } from "../helper";

export default function watchPlugin(params: PluginParams) {
  const { key, wark, value, namespace, ctx } = params;
  if (["setItem", "removeItem", "clear"].includes(wark)) {
    const [changes] = useCallback("change");
    if (Array.isArray(changes) && changes.length) {
      window.WEB_STORAGE_IS_WARNING = false;
      const oldValue = ctx.methods.getItem({
        key,
        namespace,
      });
      changes.forEach((v) => {
        if (v.namespace === namespace && v.key === key) {
          v.callback({
            newValue: wark === "setItem" ? value : undefined,
            oldValue,
            key,
            namespace,
          });
        }
      });
      window.WEB_STORAGE_IS_WARNING = true;
    }
  }
  return value;
}
