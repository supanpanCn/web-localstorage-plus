
import type { MessageKey  } from './types'

export const pkgName = 'web-localstorage-plus'

export const defaultRootName = pkgName

export const workerMsg = `${pkgName}-expired`

export const defaultLocalStorage = {
    getItem:()=>{},
    setItem:()=>{},
    removeItem:()=>{},
    clearItem:()=>{}
}

export const messages = new Map<keyof MessageKey, string | Function>([
  ['DISABLED_LOC',`请使用${pkgName}进行存储操作`],
  ['NOT_FOUND_NAME',(name:string)=>`无法通过${name}找到匹配的存储数据，请指定namespace进行尝试`],
  ['NOT_FOUND_SPACE',(name:string)=>`命名空间（${name}）不存在`],
]);
