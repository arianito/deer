import fetch, {AxiosError, AxiosResponse} from 'axios';
import {Lucid, HttpMethod, HttpResponse} from "jobean";

export const simpleHttpDriver = Lucid.makeDriver(async request => {
	try {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

		Lucid.defaultConfiguration.logger && Lucid.defaultConfiguration.logger('request', request);
		const response = await fetch({
			url: request.url,
			method: request.method || Lucid.defaultConfiguration.method,
			params: [HttpMethod.get, HttpMethod.delete].includes(request.method) ? request.payload : {},
			data: [HttpMethod.put, HttpMethod.post].includes(request.method) ? request.payload : {},
			timeout: request.timeout || Lucid.defaultConfiguration.timeout,
			withCredentials: request.withCredentials || Lucid.defaultConfiguration.withCredentials,
			responseType: request.responseType || Lucid.defaultConfiguration.responseType,
			baseURL: request.baseHref || Lucid.defaultConfiguration.baseHref,
			headers: {
				'Content-Type': 'application/json',
				...request.headers,
			},
		}) as AxiosResponse<any>;


		Lucid.defaultConfiguration.logger && Lucid.defaultConfiguration.logger('response', {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			payload: response.data,
		});
		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			payload: response.data,
		}
	} catch (e) {
		const error = e as AxiosError;
		if (!error || !error.response)
			throw {} as HttpResponse;


		Lucid.defaultConfiguration.logger && Lucid.defaultConfiguration.logger('error', {
			status: error.response.status,
			statusText: error.response.statusText,
			errorCode: error.code,
			headers: error.response.headers,
			payload: error.response.data,
		});

		throw {
			status: error.response.status,
			statusText: error.response.statusText,
			errorCode: error.code,
			headers: error.response.headers,
			payload: error.response.data,
		} as HttpResponse;
	}
})
