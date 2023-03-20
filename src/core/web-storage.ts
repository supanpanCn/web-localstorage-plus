import nativeStorage from "./native-storage";
import { useBuildInPlugin } from './api/use'
import { getItem, setItem , removeItem ,use, clear , change , bus , expire ,This } from "./api";

export let native:This 

export default function (rootName: string) {
  const storage = nativeStorage(rootName);
  native = {
    ...storage,
    plugins:[]
  }
  useBuildInPlugin({
    use
  })

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    onChange:change,
    onExpire:expire,
    postMessage:bus.emit,
    onMessage:bus.on,
    use
  }

}
