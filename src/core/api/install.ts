
import { useGlobal } from './index'

export type PluginType = 'encrypt'|'reactive'

function install(pluginType:'encrypt',plugin:{
    encrypt:Function;
    decrypt:Function;
}):void;
function install(pluginType:'reactive',plugin:any):void;
function install(pluginType:PluginType,plugin:any){
    const [plugins={},update] = useGlobal('WEB_STORAGE_PLUGINS')
    plugins[pluginType] = plugin
    update(plugins)
}

export default install