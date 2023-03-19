
type ChangeCb = (payload:{
    oldValue:any;
    newValue:any;
    key:string;
    namespace:string|undefined;
})=>void

type Events<T=Function> = {
    key:string;
    namespace?:string;
    callback:T;
}

type ExpireItem = {
    key:string;
    namespace?:string;
    expireTime:number;
}

declare interface Window{
    ['WEB_STORAGE_APIS']:any;
    WEB_STORAGE_IS_WARNING:boolean;
    WEB_STORAGE_USE_LOCAL_STORAGE:()=>typeof window.localStorage;
    WEB_STORAGE_EXPIRES:ExpireItem[];
    WEB_STORAGE_USER_REGISTERED_CALLBACK:{
        change:Events<ChangeCb>[];
        expire:Events[];
        on:Events[];
    }
}
