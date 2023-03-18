import type { PluginParams } from '../../plugin/encrypt'
import type { This , PluginCb  } from './index'

function setApis(api:PluginCb){
    return {
        getItem:(p:PluginParams)=>api({
            ...p,
            wark:'getItem'
        }),
        setItem:(p:PluginParams)=>api({
            ...p,
            wark:'setItem'
        }),
        removeItem:(p:PluginParams)=>api({
            ...p,
            wark:'removeItem'
        }),
    }
}
function use(this:This,userCallback:PluginCb,framework?:'customer'|'buildIn'){
    this.plugins.push({
        framework:framework || 'customer',
        apis:setApis(userCallback)
    })
}

export default use