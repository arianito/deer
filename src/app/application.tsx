import React, {Component} from 'react';
import {BeanConfig, BeanLifecycle, HttpMethod, Lucid} from "jobean";
import {simpleHttpDriver} from "./simpleHttpDriver";

export class Application extends Component implements BeanLifecycle {

	async configure(props: BeanConfig) {
		Lucid.config(Lucid.mockDriver(simpleHttpDriver), {
			baseHref:  '/api',
			logger: (tag, message) => {
				console.log(tag, message);
			}
		});

		Lucid.addMock('hello',[
			Lucid.mock({
				path: {
					path: '/hello',
					exact: true,
				},
				method: HttpMethod.post,
				handler: (request, response) => {
					response('hello').setStatus(200)
				}
			})
		])

		Lucid.fetch({
			url:  '/hello',
			method: HttpMethod.post,
		})
	}

	async clientStartup(props: BeanConfig) {
	}

	render(): React.ReactNode {
		return <div>
			hello
		</div>
	}

}
