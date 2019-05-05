// do not load paths on webpack builds
if (process.env.NODE_ENV !== 'server') require('module-alias/register');

import * as path from 'path'

import * as React from 'react';
import express from 'express';
import {Provider} from "./app/Provider";
import {CssAsset, JsAsset} from "ssrstore";

// const httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer();

const app = express();

if (process.env.NODE_ENV === 'development') {
	const webpack = require('webpack');
	const webpackConfig = require('../webpack.config');
	const compiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler, {
		log: console.log,
		path: '/__webpackhmr',
		heartbeat: 2 * 1000
	}));
}

app.get('/favicon.ico', (req, res) => {
	res.send('')
});

// app.all('/api/rem/filing*', (req, res) => {
// 	req.url = req.url.substr(15);
// 	return proxy.proxyRequest(req, res, {
// 		changeOrigin: true,
// 		target: 'http://192.168.150.124:5012'
// 	});
// });

app.get(/(\.js)(\?.+)?$/, function (req, res, next) {
	const spl = req.url.split('?');
	req.url = spl.join('.gz?');
	res.set('Content-Encoding', 'gzip');
	next();
});

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/*', async (req, res) => {
	const version = '1-alpha';
	res.send('<!doctype html>' + await Provider.Server(req.url, req.headers.cookie, {
		title: 'Application',
		baseHref: '',
		productionAssets: [
			new JsAsset('https://unpkg.com/react@16/umd/react.production.min.js', null, true, true),
			new JsAsset('https://unpkg.com/react-dom@16/umd/react-dom.production.min.js', null, true, true),
			new JsAsset('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js', null, true, true),
			new JsAsset('/dist/app.js', version),
			new CssAsset('/dist/app.css', version)
		],
		developmentAssets: [
			new JsAsset('/dist/app.js'),
		],
	}));
});

process.on('uncaughtException', function (err) {
	console.log(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port));
