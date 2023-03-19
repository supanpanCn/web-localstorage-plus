import type { PluginParams } from './index'

const encrypts = new Map<string, [string, any][]>([]);
export default function encryptPlugin(params: PluginParams) {
  const { key, wark, value, namespace, encrypt } = params;

  if (wark === "setItem" && encrypt) {
    let s = "*";
    if (namespace) {
      const space = encrypts.get(namespace) || [];
      space.push([key, value]);
      encrypts.set(namespace, space);
    } else {
      encrypts.set(key, [key, value]);
    }
    return s.repeat(String(value).length);
  }

  if (wark === "getItem") {
    let space = namespace ? encrypts.get(namespace) : encrypts.get(key);
    if (Array.isArray(space)) {
      let item = space?.find((v) => v[0] === key);
      if (item) {
        return Array.isArray(item) ? item[1] : space[1];
      }
    }
  }

  if (wark === "removeItem") {
    const delKey = namespace || key;
    if (encrypts.has(delKey)) {
      encrypts.delete(delKey);
    }
  }

  if (wark === "clear") {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (encrypts.has(v)) {
          encrypts.delete(v);
        }
      });
    }else{
        encrypts.clear()
    }
  }

  return value;
}
