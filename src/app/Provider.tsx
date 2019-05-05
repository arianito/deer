import React from 'react';
import {HookModel} from "ssrstore";
import {Application} from "./Application";
import {ModulatedProvider} from "xrmodule";


export const Provider = ModulatedProvider([

])({
	id: 'app',
	rtl: false,
	ssr: true,
	app: <Application/>,
	models: [
		HookModel,
	],
	middleware: [],
	head: (state) => {
		return <React.Fragment>
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
		</React.Fragment>
	},
});
