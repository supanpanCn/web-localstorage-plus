import type { Init } from "./helper";
import createStorage from "./core/web-storage";
import { defaultRootName, defaultLocalStorage, log } from "./helper";

function proxyLocalStorage() {
  Object.defineProperty(window, "localStorage", {
    get() {
      log("DISABLED_LOC", "yellow");
      return defaultLocalStorage;
    },
  });
}

function startChildProcess(){
    
}

const init: Init = function (this: Init, rootName?: string) {
  if (init.created) return;
  const name = rootName || defaultRootName
  this.localStorage = window.localStorage;
  proxyLocalStorage();
  window.WEB_STORAGE_USE_LOCAL_STORAGE = () => this.localStorage!;
  this.created = true;
  return window['$webStorage'] = createStorage(name);
};

export default init.bind(init);
