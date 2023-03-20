import { getNamespace, useCallback } from "./index";

type Callback = (p: { name: string; namespace: string }) => void;

function expire(key: string, callback: Callback): void;
function expire(key: string, callback: Callback, namespace?: string): void;
function expire(key: string, callback: Callback, namespace?: string) {
  const spacename = getNamespace(namespace);
  const [expire, setExpire] = useCallback("expire");
  expire.push({
    key,
    namespace: spacename,
    callback,
  });
  setExpire(expire);
}

export default expire;
