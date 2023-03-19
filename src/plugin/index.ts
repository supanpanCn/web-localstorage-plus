import { This } from '../core/api'

export type PluginParams = {
  key: string;
  value: any;
  namespace: string | undefined;
  expireTime: string | undefined;
  encrypt: string | undefined;
  wark: "getItem" | "setItem" | "removeItem" | "clear";
  ctx:Omit<This,'plugin'>
};
