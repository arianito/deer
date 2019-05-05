import axios, {AxiosError, AxiosResponse} from 'axios';
import {Http, HttpMethod, IHttpResponse, IHttpRequest} from "xhttplayer";

export async function AxiosHttpDriver(request: IHttpRequest): Promise<IHttpResponse> {
	try {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

		if(Http.DefaultConfiguration.log) {
			console.log('request', request);
		}
		const response = await axios({
			url: request.url,
			method: request.method || Http.DefaultConfiguration.method,
			params: [HttpMethod.get, HttpMethod.delete].includes(request.method) ? request.payload : {},
			data: [HttpMethod.put, HttpMethod.post].includes(request.method) ? request.payload : {},
			timeout: request.timeout || Http.DefaultConfiguration.timeout,
			withCredentials: request.withCredentials || Http.DefaultConfiguration.withCredentials,
			responseType: request.responseType || Http.DefaultConfiguration.responseType,
			baseURL: request.baseURL || Http.DefaultConfiguration.baseURL,
			headers: {
				'Content-Type': 'application/json',
				...request.headers,
			},
		}) as AxiosResponse<any>;


		if(Http.DefaultConfiguration.log) {
			console.log('response', {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				payload: response.data,
			});
		}
		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			payload: response.data,
		}
	} catch (e) {
		const error = e as AxiosError;
		if (!error || !error.response)
			throw {} as IHttpResponse;


		if(Http.DefaultConfiguration.log) {
			console.log('error', {
				status: error.response.status,
				statusText: error.response.statusText,
				errorCode: error.code,
				headers: error.response.headers,
				payload: error.response.data,
			});
		}

		throw {
			status: error.response.status,
			statusText: error.response.statusText,
			errorCode: error.code,
			headers: error.response.headers,
			payload: error.response.data,
		} as IHttpResponse;
	}
}
