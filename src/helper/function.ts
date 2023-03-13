import type { MessageKey , MessageType } from "./types";
import { messages } from "./const";
import colors from "picocolors";

export const isObject = (p: any) =>
  Object.prototype.toString.call(p) === "[object Object]";

export function log(
  messageType: keyof MessageKey,
  color: MessageType = "red",
  rest?: any
) {
  let msg = messages.get(messageType);
  if (typeof msg === "function") {
    msg = msg(rest);
  }
  console.log(colors[color](`[web-storage]:${msg}`));
}

export function getEncrypt(){
    const encrypts = new Map<string,[string,any][]>([])
    return {
        encrypt:(key:string,value:any,namespace?:string)=>{
            let s = '*'
            if(namespace){
               const space = encrypts.get(namespace)
               space?.push([key,value])
            }else{
                encrypts.set(key,[key,value])
            }
            return s.repeat(String(value).length)
        },
        decrypt:(key:string,value:string,namespace?:string)=>{
            let space = namespace ? encrypts.get(namespace)  : encrypts.get(key)
            if(Array.isArray(space)){
                const item = space?.find(v=>v[0] === key)
                if(item) return item[1]
            }
        }
    }
}
