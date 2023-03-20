import type { PluginParams } from "./index";
import WorkerSpace from "../core/api/worker";
import { cloneDeep } from "lodash-es";
import { useCallback, useGlobal } from "../helper";

export default function watchPlugin(params: PluginParams) {
  const { key, value, namespace, ctx } = params;
  const [expires] = useCallback("expire");
  const [expireTimes, setExpireTimes] = useGlobal("WEB_STORAGE_EXPIRES");
  const expired: ExpireItem[] = [];

  for (let i = 0; i < expireTimes.length; i++) {
    if (Date.now() >= expireTimes[i].expireTime) {
      expired.push(cloneDeep(expireTimes[i]));
      expireTimes.splice(i, 1);
      i--;
    }
  }

  expired.forEach((v) => {
    ctx.methods.removeItem({
      key: v.key,
      namespace: v.namespace,
    });
  });

  setExpireTimes(expireTimes);

  if (Array.isArray(expires) && expires.length) {
    expires.forEach((v) => {
      const item = expired.find(
        (e) => e.key === v.key && e.namespace === v.namespace
      );
      if (item) {
        v.callback({
          key,
          namespace,
        });
        
      }
    });
  }

  WorkerSpace();
  return value;
}
