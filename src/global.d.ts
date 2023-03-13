
type Events = {
    key:string;
    namespace?:string;
    callback:Function;
}

type ExpireItem = {
    key:string;
    namespace?:string;
    expireTime:number;
}

declare interface Window{
    ['$webStorage']:any;
    WEB_STORAGE_USE_LOCAL_STORAGE:()=>typeof window.localStorage;
    WEB_STORAGE_EXPIRES:ExpireItem[];
    WEB_STORAGE_PLUGINS:{
        reactive:any;
        encrypt:{
            encrypt:Function;
            decrypt:Function;
        }
    };
    WEB_STORAGE_USER_REGISTERED_CALLBACK:{
        change:Events[];
        expire:Events[];
        on:Events[];
    }
}
