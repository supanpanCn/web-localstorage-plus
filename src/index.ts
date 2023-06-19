import type { Init } from "./helper";
import createStorage from "./core/web-storage";
import {
  defaultRootName,
  defaultLocalStorage,
  log,
  setupGlobal,
  Storage
} from "./helper";

function proxyLocalStorage() {
  Object.defineProperty(window, "localStorage", {
    get() {
      log("DISABLED_LOC", "warn");
      return defaultLocalStorage;
    },
  });
}

const init: Init = function (
  this: Init,
  config?: {
    rootName?: string;
    noUseLocalStorage?: boolean;
  }
) {
  if (init.created || window.WEB_STORAGE_APIS) return window.WEB_STORAGE_APIS;
  const { rootName, noUseLocalStorage = true } = config || {};
  const name = rootName || defaultRootName;
  this.localStorage = window.localStorage;
  noUseLocalStorage && proxyLocalStorage();
  setupGlobal(this);
  this.created = true;
  return (window["WEB_STORAGE_APIS"] = createStorage(name));
};

export function useStorage(){
  return window.WEB_STORAGE_APIS as Storage
}

export default init.bind(init);
