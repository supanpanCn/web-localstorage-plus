import type { This, SetParams } from "./index";
import { useGlobal } from "./index";

type Params = SetParams & {
  encrypt?: boolean;
  expireTime?: any;
};

function setExpire({ expireTime, key, namespace }: Params) {
  if (expireTime) {
    const [expires = [], update] = useGlobal("WEB_STORAGE_EXPIRES");
    const params = { key, expireTime, namespace };
    const i = expires.findIndex((v: ExpireItem) => {
      let legal = v.key === key;
      if (legal && namespace) {
        legal = v.namespace === namespace;
      }
      return legal;
    });
    if (i === -1) {
      expires.push(params);
    } else {
      expires[i].expireTime = expireTime;
    }
    update(expires)
  }
}

function setEncrypt({ encrypt, value, key, namespace }: Params) {
  let returnValue = value;
  if (encrypt) {
    returnValue = useGlobal("WEB_STORAGE_PLUGINS")[0].encrypt.encrypt(
      key,
      value,
      namespace
    );
  }
  return returnValue;
}

function setItem(this: This, key: string, value: any): void;
function setItem(this: This, key: string, value: any, namespace: string): void;
function setItem(this: This, key: string, value: any, encrypt: boolean): void;
function setItem(this: This, key: string, value: any, expireTime: number): void;
function setItem(
  this: This,
  key: string,
  value: any,
  namespace: string,
  expireTime: number,
  encrypt: boolean
): void;
function setItem(this: This, key: Params[], namespace: string): void;
function setItem(
  this: This,
  key: string | Params[],
  value?: any,
  namespace?: string | boolean | number,
  expireTime?: number,
  encrypt?: boolean
) {
  const params: Params = {
    key: "",
    value,
  };
  const queue: Params[] = [];
  if (typeof key === "string") {
    params.key = key;
    params.value = value;
    params.encrypt = encrypt;
    params.expireTime = expireTime;
    if (typeof namespace === "string") {
      params.namespace = namespace;
    } else if (typeof namespace === "boolean") {
      params.encrypt = namespace;
    } else if (typeof namespace === "number") {
      params.expireTime = namespace;
    }
    queue.push(params);
  } else {
    key.forEach((v) => {
      v.namespace = v.namespace || (value as string);
      queue.push(v);
    });
  }
  queue.forEach((v) => {
    setExpire(v);
    v.value = setEncrypt(v);
    this.methods.setItem(v);
  });
}

export default setItem;
