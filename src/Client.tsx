import {Provider} from "./app/Provider";
const hydrate = Provider.RegisterClient();

if(module.hot && hydrate){
	module.hot.accept(hydrate);
}
