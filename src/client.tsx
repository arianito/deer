import {Provider} from "./app/provider";
const hydrate = Provider.registerClient();

if(module.hot && hydrate){
	module.hot.accept(hydrate);
}
