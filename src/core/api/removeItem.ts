import type { RemoveParams } from "./index";
import { runPlugin, getNamespace, native } from "./index";

function removeItem(key: string): void;
function removeItem(key: string, namespace: string): void;
function removeItem(key: string[]): void;
function removeItem(key: RemoveParams[]): void;
function removeItem(key: string | string[] | RemoveParams[], namespace?: string) {
  const params: RemoveParams = {
    key: "",
    namespace: getNamespace(),
  };
  const queue: RemoveParams[] = [];
  if (typeof key === "string") {
    params.key = key;
    if (typeof namespace === "string") {
      params.namespace = namespace;
    }
    queue.push(params);
  } else {
    key.forEach((v) => {
      const p = {
        ...params,
      };
      if (typeof v === "string") {
        p.key = v;
        p.namespace = getNamespace(namespace)
      } else {
        p.key = v.key;
        p.namespace = v.namespace || getNamespace(namespace);
      }
      queue.push(p);
    });
  }
  queue.forEach((v) => {
    runPlugin.call(
      native,
      {
        ...v,
        ctx: native,
      },
      "removeItem"
    );
    native.methods.removeItem(v);
  });
}

export default removeItem;
