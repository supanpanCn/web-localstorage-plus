import type { This } from "./index";
import { runPlugin } from "./index";

function clear(this: This, exclude?: string[]) {
  if (!Array.isArray(exclude)) {
    this.methods.clear();
  } else {
    exclude.forEach((v) => this.methods.removeSpace(v));
  }
  runPlugin.call(this,{
    value:exclude,
    ctx:this
  },'clear')
}

export default clear;
