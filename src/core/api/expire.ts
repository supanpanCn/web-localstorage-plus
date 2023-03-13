import type { This } from "./index";
import { getNamespace , useCallback } from './index'
import { log } from '../../helper'

type Callback = (p:{
    name:string;
    namespace:string;
})=>void

function expire(this:This,key:string,callback:Callback):void;
function expire(this:This,key:string,callback:Callback,namespace?:string):void;
function expire(this:This,key:string,callback:Callback,namespace?:string){
    const storage = this.storage
    const spacename = getNamespace(namespace)
    const [expire,setExpire] = useCallback('expire')
    const i = expire.findIndex(v=>v.namespace === spacename && v.key === key)
    if(i>-1){
        expire[i].callback = callback
    }else{
        if(!storage[spacename]) return log('NOT_FOUND_SPACE')
        if(!storage[spacename][key]) return log('NOT_FOUND_NAME')
        expire.push({
            key,
            namespace:spacename,
            callback
        })
    }
    setExpire(expire)
}
export default expire