import { runPlugin, native } from "./index";

function clear(include?: string[], reverse?: boolean) {
  let que = Array.isArray(include) ? include : [];
  if (!que.length) {
    native.methods.clear();
  } else {
    if (reverse === true) {
      que = Object.keys(native.load()).filter((v) => !que.find((q) => v === q));
    }
    que.forEach((v) => native.methods.removeSpace(v));
  }
  runPlugin(
    {
      value: que,
      ctx: native,
    },
    "clear"
  );
}

export default clear;
