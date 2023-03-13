
import type { This, RemoveParams } from "./index";

function removeItem(this: This, key: string): void;
function removeItem(this: This, key: string,namespace:string): void;
function removeItem(this: This, key: RemoveParams[]): void;
function removeItem(this: This,key:string | RemoveParams[],namespace?:string){
    const params:RemoveParams = {
        name:''
    }
    const queue:RemoveParams[] = []
    if(typeof key === 'string'){
        params.name = key
        if(typeof namespace === 'string'){
            params.namespace = namespace
        }
        queue.push(params)
    }else{
        key.forEach(v=>{
            queue.push(v)
        })
    }
    queue.forEach(v=>this.methods.removeItem(v))
}


export default removeItem;