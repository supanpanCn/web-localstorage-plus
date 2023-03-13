import { isObject, log } from "../helper";

export interface GetParams {
  name: string;
  namespace?: string;
}

export interface SetParams {
  key: string;
  value: string;
  namespace?: string;
}

export interface RemoveParams {
  name: string;
  namespace?: string;
}

export default function (rootName: string) {
  const localStorage = window.WEB_STORAGE_USE_LOCAL_STORAGE();
  const storage = JSON.parse(localStorage.getItem(rootName) || "{}");
  function _update() {
    localStorage.setItem(rootName, JSON.stringify(storage));
  }
  function _createSpace(namespace?:string){
    if(namespace){
        storage[namespace] = storage[namespace] || {}
        return storage[namespace]
    }
    return storage
  }
  return {
    storage,
    methods: {
      getItem(params: GetParams) {
        const { name, namespace = "" } = params;
        if (storage[namespace]) {
          if (isObject(storage[namespace])) return storage.namespace.name;
          return storage.name;
        }
        const n = name.toUpperCase();
        if (storage[n]) return storage[n];
        log("NOT_FOUND_NAME", "yellow", name);
      },
      setItem(params: SetParams) {
        const { key, value, namespace } = params;
        const space = _createSpace(namespace)
        space[key] = value
        _update()
      },
      removeItem(params: RemoveParams) {},
      removeSpace(space: string) {
        delete storage[space];
        _update();
      },
      clear() {
        for (let key in storage) {
          delete storage[key];
        }
        _update();
      },
    },
  };
}
