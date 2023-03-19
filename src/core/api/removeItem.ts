
import type { This, RemoveParams } from "./index";
import { runPlugin , getNamespace } from './index'

function removeItem(this: This, key: string): void;
function removeItem(this: This, key: string,namespace:string): void;
function removeItem(this: This, key: RemoveParams[]): void;
function removeItem(this: This,key:string | RemoveParams[],namespace?:string){
    const params:RemoveParams = {
        key:'',
        namespace:getNamespace()
    }
    const queue:RemoveParams[] = []
    if(typeof key === 'string'){
        params.key = key
        if(typeof namespace === 'string'){
            params.namespace = namespace
        }
        queue.push(params)
    }else{
        key.forEach(v=>{
            const p = {
                ...params
            }
            if(typeof v === 'string'){
                p.key = v
            }else{
                p.key = v.key
                p.namespace = v.namespace
            }
            queue.push(p)
        })
    }
    queue.forEach(v=>{
        runPlugin.call(this,{
            ...v,
            ctx:this
        },'removeItem')
        this.methods.removeItem(v)
    })
}


export default removeItem;