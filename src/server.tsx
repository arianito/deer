// do not load paths on webpack builds

if (process.env.NODE_ENV !== 'server') require('module-alias/register');
import {Webpack} from "jobean/dist/webpack";

import * as path from 'path'

import * as React from 'react';
import express from 'express';
import {Provider} from "./app/provider";
import {JsAsset, CssAsset, parseCookies} from "jobean";

const app = express();

Webpack.devMiddleware(app, require('../webpack.config.js'));
Webpack.gzipMiddleware(app);

app.get('/favicon.ico', (req, res) => {
	res.send('')
});

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/*', async (req, res) => {
	const version = '1-alpha';
	res.send('<!doctype html>' + await Provider.renderToString({
		cookiesString: req.headers.cookie,
		route: req.url,
		title: 'Application',
		baseHref: '',
		productionAssets: [
			new JsAsset('https://unpkg.com/react@16/umd/react.production.min.js', null, true, true),
			new JsAsset('https://unpkg.com/react-dom@16/umd/react-dom.production.min.js', null, true, true),
			new JsAsset('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js', null, true, true),
			new JsAsset('/dist/app.js', version, true),
			new CssAsset('/dist/app.css', version)
		],
		developmentAssets: [
			new JsAsset('/dist/app.js', version, true),
		],
	}));
});

process.on('uncaughtException', function (err) {
	console.log(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port));
