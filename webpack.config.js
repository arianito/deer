const path = require('path');
const bean = require('jobean/dist/webpack');


module.exports = bean.Webpack.config({
	entries: {
		'app': [
			"src/client.tsx",
			"styles/app.scss"
		]
	},
	publicPath: path.resolve(__dirname, './dist'),
	stylesPath: [path.resolve(__dirname, './styles')],
	sharedStyle:'@import "variables";',
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"lodash": "_",
	},
});
