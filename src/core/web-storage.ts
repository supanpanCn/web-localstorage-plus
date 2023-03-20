import nativeStorage from "./native-storage";
import { useBuildInPlugin } from './api/use'
import { getItem, setItem , removeItem ,use, clear , change , bus , expire } from "./api";

export type Methods = {
  getItem:typeof getItem;
  setItem:typeof setItem;
  removeItem:typeof removeItem;
  use:typeof use;
  clear:typeof clear;
  change:typeof change;
  expire:typeof expire;
  postMessage:typeof bus.emit;
  onMessage:typeof bus.on
}

function processCtx(
  ctx: any,
  methods: {
    [other: string]: Function;
  }
) {
  for (let key in methods) {
    methods[key] = methods[key].bind(ctx);
  }

  useBuildInPlugin.call(ctx,methods as any)

  return methods as Methods;
}

export default function (rootName: string) {
  const ctx = nativeStorage(rootName);
  const context = Object.assign({},ctx,{
    plugins:[]
  })

  return processCtx(context, {
    getItem,
    setItem,
    removeItem,
    clear,
    onChange:change,
    onExpire:expire,
    postMessage:bus.emit,
    onMessage:bus.on,
    use
  });
}
