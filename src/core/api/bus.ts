import { useCallback } from './index'

type Callback = (payload:any)=>void

function listen(key:string,callback:Callback,overwrite:boolean=true){
    const [on,setOn] = useCallback('on')
    const i = on.findIndex(v=>v.key === key)
    if(overwrite && i>-1){
        on[i].callback = callback
    }else{
        on.push({
            key,
            callback
        })
    }
    setOn(on)
}

function emit(key:string,payload:any){
    const [on] = useCallback('on')
    const triggers = on.filter(v=>v.key === key)
    if(Array.isArray(triggers)){
        triggers.forEach(trigger=>trigger.callback(payload))
    }
}

export default {
    on:listen,
    emit
}