import { runPlugin,native } from "./index";

function clear( exclude?: string[]) {
  if (!Array.isArray(exclude)) {
    native.methods.clear();
  } else {
    exclude.forEach((v) => native.methods.removeSpace(v));
  }
  runPlugin({
    value:exclude,
    ctx:native
  },'clear')
}

export default clear;
