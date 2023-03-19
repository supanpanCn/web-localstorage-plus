import type { PluginParams } from "./index";
import WorkerSpace from '../core/api/worker'

export default function watchPlugin(params: PluginParams) {
  const { key, value, namespace, ctx } = params;
  const expires = window.WEB_STORAGE_USER_REGISTERED_CALLBACK.expire;
  if (Array.isArray(expires) && expires.length) {
    const payload = {
      key,
      namespace,
    };

    expires.forEach((v) => {
      if (v.namespace === namespace && v.key === key) {
        const expireTimes = window.WEB_STORAGE_EXPIRES;
        const index = expireTimes.findIndex(
          (ex) => ex.key === key && ex.namespace === namespace
        );

        const { expireTime } = expireTimes[index] || {};

        if (typeof expireTime === "number") {
          const now = Date.now();

          if (now >= expireTime) {
            ctx.methods.removeItem(payload);
            if (index > -1) expireTimes.splice(index, 1);
            v.callback({
              key,
              namespace,
            });
            WorkerSpace()
          }
        }
      }
    });
  }
  return value;
}
