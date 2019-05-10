import React from 'react';
import {Application} from "./application";
import {BeanFactory, HookBean} from "jobean";


export const Provider = BeanFactory.provider({
	id: 'app',
	rtl: false,
	useSSR: true,
	app: <Application/>,
	jars: [],
	beans: [HookBean],
	middleware: [],
	head: (state) => {
		return <React.Fragment>
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
		</React.Fragment>
	},
});
