import { cloneDeep } from 'lodash-es'
import nativeStorage from '../native-storage'

type EventType = keyof typeof window.WEB_STORAGE_USER_REGISTERED_CALLBACK 
type Type = keyof {
    ['$webStorage']:any;
    WEB_STORAGE_PLUGINS:typeof window.WEB_STORAGE_PLUGINS;
    WEB_STORAGE_USER_REGISTERED_CALLBACK: typeof window.WEB_STORAGE_USER_REGISTERED_CALLBACK;
    WEB_STORAGE_USE_LOCAL_STORAGE:typeof window.WEB_STORAGE_USE_LOCAL_STORAGE;
    WEB_STORAGE_EXPIRES:typeof window.WEB_STORAGE_EXPIRES;
}

export function getNamespace(namespace?:string){
    if(namespace){
        return namespace.toUpperCase()
    }
    let url = location.href;
    if (url.includes("?")) {
      url = url.split("?")[0];
    }
    const names:string[] = url.split("/");
    const last = names[names.length - 1].toUpperCase();
    return last.toUpperCase();
}

export function useCallback(eventType:EventType):[Events[],(e:Events[])=>void]{
    const [callback] = useGlobal('WEB_STORAGE_USER_REGISTERED_CALLBACK')
    const curCb = callback[eventType] || []
    return [cloneDeep(curCb),(newCb:Events[])=>{
        window.WEB_STORAGE_USER_REGISTERED_CALLBACK[eventType] = newCb
    }] 
}

export function useGlobal(type:Type){
    return [window[type],(newValue:any)=>{
        window[type] = newValue
    }]
}

export type This = ReturnType<typeof nativeStorage>
export type { SetParams , GetParams , RemoveParams } from '../native-storage'
export { default as getItem } from './getItem'
export { default as setItem } from './setItem' 
export { default as removeItem } from './removeItem'
export { default as clear } from './clear'
export { default as change } from './change'
export { default as bus } from './bus'
export { default as expire } from './expire'
export { default as install } from './install'