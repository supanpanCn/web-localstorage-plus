import type { This, SetParams } from "./index";
import { useGlobal, runPlugin, getNamespace } from "./index";
import WorkerSpace from "./worker";

type Params = SetParams & {
  encrypt?: boolean;
  expireTime?: any;
};

function setExpire(this: This,{ expireTime, key, namespace }: Params) {
  if (expireTime) {
    const [expires = [], update] = useGlobal("WEB_STORAGE_EXPIRES");
    const params = {
      key,
      expireTime: Date.now() + expireTime,
      namespace,
    };
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
    update(expires);
    WorkerSpace()
  }
}

function setItem(this: This, key: string, value: any): void;
function setItem(this: This, key: string, value: any, namespace: string): void;
function setItem(this: This, key: string, value: any, encrypt: boolean): void;
function setItem(this: This, key: string, value: any, expireTime: number): void;
function setItem(
  this: This,
  key: string,
  value: any,
  namespace?: string,
  expireTime?: number,
  encrypt?: boolean
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
    namespace: getNamespace(),
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
    setExpire.call(this,v);
    v.value = runPlugin.call(
      this,
      {
        ...v,
        ctx: this,
      },
      "setItem"
    );
    this.methods.setItem(v);
  });
}

export default setItem;
