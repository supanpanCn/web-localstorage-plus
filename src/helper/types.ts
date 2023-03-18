export interface MessageKey{
    DISABLED_LOC:string;
    NOT_FOUND_NAME:string;
    NOT_FOUND_SPACE:string;
}

export interface Init{
  (rootName:string):void;
  created?:boolean;
  localStorage?:typeof window.localStorage
}

export type MessageType = 'yellow' | 'red' | 'green'

export type AnyObj = {
  [other:string]:any;
}