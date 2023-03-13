import type { This } from "./index";
import { getNamespace , useCallback } from './index'
import { log } from '../../helper'

type Callback = (p:{
    oldValue:any;
    newValue:any;
    name:string;
    namespace:string;
})=>void

function change(this:This,key:string,callback:Callback):void;
function change(this:This,key:string,callback:Callback,namespace?:string):void;
function change(this:This,key:string,callback:Callback,namespace?:string){
    const storage = this.storage
    const spacename = getNamespace(namespace)
    const [change,setChange] = useCallback('change')
    const i = change.findIndex(v=>v.namespace === spacename && v.key === key)
    if(i>-1){
        change[i].callback = callback
    }else{
        if(!storage[spacename]) return log('NOT_FOUND_SPACE')
        if(!storage[spacename][key]) return log('NOT_FOUND_NAME')
        change.push({
            key,
            namespace:spacename,
            callback
        })
    }
    setChange(change)
}
export default change