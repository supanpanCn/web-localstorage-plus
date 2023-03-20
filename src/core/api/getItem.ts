import type { GetParams } from "./index";
import { getNamespace, runPlugin, native } from "./index";

function getItem(key: string): any;
function getItem(key: string, namespace: string): any;
function getItem(key: string[]): any;
function getItem(key: string[], namespace: string): any;
function getItem(key: string[], isFlatten: boolean): any;
function getItem(key: string[], namespace?: string, isFlatten?: boolean): any;
function getItem(key: GetParams[], isFlatten?: boolean): any;
function getItem(key: (GetParams | string)[], isFlatten?: boolean): any;
function getItem(
  key: string | string[] | GetParams[] | (GetParams | string)[],
  namespace?: string | boolean,
  isFlatten?: boolean
) {
  const params: GetParams = {
    key: "",
    namespace:getNamespace()
  };
  let flatten: boolean = false;
  const queue: GetParams[] = [];
  if (typeof key === "string") {
    params.key = key;
    params.namespace = getNamespace(namespace as string);
    queue.push(params);
    flatten = true;
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      const p = {
        ...params,
      };
      if (typeof k === "string") {
        p.key = k;
        if (namespace) {
          if (typeof namespace === "string") {
            p.namespace = getNamespace(namespace);
          } else {
            p.namespace = getNamespace();
            flatten = namespace;
          }
        }
        if (isFlatten) {
          flatten = isFlatten;
        }
      } else {
        p.key = k.key;
        p.namespace = k.namespace;
        flatten = !!namespace;
      }
      queue.push(p);
    });
  }
  let res = queue.map((v) => ({
    value: runPlugin(
      {
        ...v,
        ctx: native,
        value: native.methods.getItem(v),
      },
      "getItem"
    ),
    namespace: v.namespace,
  }));

  if (flatten) {
    res = res.map((v) => v.value);
  }

  return typeof key === "string" ? res[0] : res;
}

export default getItem;
