import { isObject, log } from "../helper";
export interface GetParams {
  key: string;
  namespace?: string;
}

export interface SetParams {
  key: string;
  value: any;
  namespace?: string;
}

export interface RemoveParams {
  key: string;
  namespace?: string;
}

export default function (rootName: string) {
  const localStorage = window.WEB_STORAGE_USE_LOCAL_STORAGE();
  const load = () => JSON.parse(localStorage.getItem(rootName) || "{}");
  function _update(storage: any) {
    localStorage.setItem(rootName, JSON.stringify(storage));
  }
  function _createSpace(storage: any, namespace?: string) {
    if (namespace) {
      storage[namespace] = storage[namespace] || {};
      return storage[namespace];
    }
    return storage;
  }

  return {
    load,
    methods: {
      getItem(params: GetParams) {
        const { key, namespace = "" } = params;
        const storage = load();
        if (isObject(storage[namespace])) return storage[namespace][key];
        if (storage[key]) return storage[key];
        window.WEB_STORAGE_IS_WARNING && log("NOT_FOUND_NAME", "warn", key);
      },
      setItem(params: SetParams) {
        const { key, value, namespace } = params;
        const storage = load();
        const space = _createSpace(storage, namespace);
        space[key] = value;
        _update(storage);
      },
      removeItem(params: RemoveParams) {
        const { key, namespace = "" } = params;
        const storage = load();
        if (isObject(storage[namespace])) {
          delete storage[namespace][key];
        } else {
          delete storage[key];
        }
        _update(storage);
      },
      removeSpace(space: string) {
        const storage = load();
        delete storage[space];
        _update(storage);
      },
      clear() {
        const storage = load();
        for (let key in storage) {
          delete storage[key];
        }
        _update(storage);
      },
    },
  };
}
