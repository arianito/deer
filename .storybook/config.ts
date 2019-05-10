import { configure } from '@storybook/react';
import {AxiosHttpDriver} from "../src/app/simpleHttpDriver";
import {Http} from "homing.web.core.http";
const req = require.context('./', true, /\.story\.tsx$/);

function loadStories() {
	Http.Configure(AxiosHttpDriver, (config) => ({
		...config,
		log: true,
		baseURL: 'http://192.168.150.124:3001/api',
		timeout: 30000,
	}));


	req.keys().forEach(req);
}

configure(loadStories, module);
