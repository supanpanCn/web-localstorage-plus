import { useCallback } from "./index";

type Callback = (payload: any) => void;
function listen(key: string, callback: Callback, overwrite?: boolean): void;
function listen(
  key: string,
  callback: Callback,
  mode?: "__OFFLINE_MODE__"
): void;
function listen(
  key: string,
  callback: Callback,
  overwrite?: boolean | "__OFFLINE_MODE__"
) {
  const [on, setOn] = useCallback("on");
  const i = on.findIndex((v) => v.key === key);
  const ov = typeof overwrite === "string" ? false : overwrite
  if (ov === true && i > -1) {
    on[i].callback = callback;
  } else {
    on.push({
      key,
      callback,
    });
  }
  setOn(on);
}
function emit(key: string, payload: any): void;
function emit(key: string, payload: any, mode: "__OFFLINE_MODE__"): void;
function emit(key: string, payload: any, mode?: "__OFFLINE_MODE__") {
  const [on] = useCallback("on");
  const triggers = on.filter((v) => v.key === key);
  if (Array.isArray(triggers) && triggers.length) {
    triggers.forEach((trigger) => trigger.callback(payload));
  }
}

export default {
  on: listen,
  emit,
};
