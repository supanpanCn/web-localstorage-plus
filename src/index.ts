import type { Init } from "./helper";
import createStorage from "./core/web-storage";
import { defaultRootName, defaultLocalStorage, log , setupGlobal  } from "./helper";

function proxyLocalStorage() {
  Object.defineProperty(window, "localStorage", {
    get() {
      log("DISABLED_LOC", "warn");
      return defaultLocalStorage;
    },
  });
}

const init: Init = function (this: Init, rootName?: string) {
  if (init.created || window.WEB_STORAGE_APIS) return window.WEB_STORAGE_APIS;
  const name = rootName || defaultRootName
  this.localStorage = window.localStorage;
  proxyLocalStorage();
  setupGlobal(this)
  this.created = true;
  return window['WEB_STORAGE_APIS'] = createStorage(name);
};

export default init.bind(init);
