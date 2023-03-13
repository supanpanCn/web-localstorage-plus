import type { This, GetParams } from "./index";
import { getNamespace } from "./index";

function getItem(this: This, key: string): any;
function getItem(this: This, key: string, namespace: string): any;
function getItem(this: This, key: string[]): any;
function getItem(this: This, key: string[], namespace: string): any;
function getItem(this: This, key: string[], isFlatten: boolean): any;
function getItem(
  this: This,
  key: string[],
  namespace: string,
  isFlatten: boolean
): any;
function getItem(this: This, key: GetParams[], isFlatten?: boolean): any;
function getItem(
  this: This,
  key: string | string[] | GetParams[],
  namespace?: string | boolean,
  isFlatten?: boolean
) {
  const Params: GetParams = {
    name: ""
  };
  let flatten: boolean = false;
  const queue: GetParams[] = [];
  if (typeof key === "string") {
    Params.name = key;
    Params.name = getNamespace(namespace as string);
    queue.push(Params);
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      const p = {
        ...Params,
      };
      if (typeof k === "string") {
        p.name = k;
        if (namespace) {
          if (typeof namespace === "string") {
            p.namespace = getNamespace(namespace);
          } else {
            p.namespace = getNamespace();
            flatten = namespace;
          }
        }
      } else {
        p.name = k.name;
        p.namespace = k.namespace;
        flatten = !!isFlatten;
      }
      queue.push(p)
    });
  }
  let res = queue.map(v=>({
    value:this.methods.getItem(v),
    namespace:v.namespace
  }))

  if(flatten){
    res = res.map(v=>v.value)
  }

  return res
}

export default getItem;
