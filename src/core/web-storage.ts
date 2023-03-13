import nativeStorage from "./native-storage";
import { getEncrypt } from '../helper'
import { getItem, setItem , removeItem ,install, clear , change , bus , expire } from "./api";

function processCtx(
  ctx: any,
  methods: {
    [other: string]: Function;
  }
) {
  for (let key in methods) {
    methods[key] = methods[key].bind(ctx);
  }
  methods.install('encrypt',getEncrypt())
  return methods;
}

export default function (rootName: string) {
  const ctx = nativeStorage(rootName);
  return processCtx(ctx, {
    getItem,
    setItem,
    removeItem,
    clear,
    onChange:change,
    onExpire:expire,
    postMessage:bus.on,
    onMessage:bus.emit,
    install
  });
}
