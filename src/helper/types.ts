import webStorage from "../core/web-storage";
export interface MessageKey {
  DISABLED_LOC: string;
  NOT_FOUND_NAME: string;
  NOT_FOUND_SPACE: string;
}

export type Storage = ReturnType<typeof webStorage>;

export interface Init {
  (config?: { rootName?: string; noUseLocalStorage?: boolean }): Storage;
  created?: boolean;
  localStorage?: typeof window.localStorage;
}

export type MessageType = "log" | "warn" | "error";

export type AnyObj = {
  [other: string]: any;
};
