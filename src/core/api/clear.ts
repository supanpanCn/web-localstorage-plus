import type { This } from "./index";

function clear(this:This,exclude?:string[]){
    if(!Array.isArray(exclude)) return this.methods.clear()
    exclude.forEach(v=>this.methods.removeSpace(v))
}

export default clear