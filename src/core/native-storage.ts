import { isObject, log } from "../helper";
import { cloneDeep } from "lodash-es";
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
    storage:cloneDeep(storage),
    methods: {
      getItem(params: GetParams) {
        const { key, namespace = "" } = params;
        if (isObject(storage[namespace])) return storage[namespace][key];
        if(storage[key]) return storage[key];
        window.WEB_STORAGE_IS_WARNING && log("NOT_FOUND_NAME", "warn", key);
      },
      setItem(params: SetParams) {
        const { key, value, namespace } = params;
        const space = _createSpace(namespace)
        space[key] = value
        _update()
      },
      removeItem(params: RemoveParams) {
        const { key, namespace="" } = params;
        if (isObject(storage[namespace])){
          delete storage[namespace][key]
        }else{
          delete storage[key]
        }
        _update()
      },
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
