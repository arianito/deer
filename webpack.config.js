const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
	devtool: 'none',
	target: 'web',
	entry: {
		"app": [
			...(process.env.NODE_ENV === 'development' ? [
				"react-hot-loader/patch",
				"webpack-hot-middleware/client?path=/__webpackhmr&timeout=20000&reload=true",
			] : []),
			"src/Client.tsx",
			"src/styles/App.scss"
		],
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		...(process.env.NODE_ENV === 'development' ? {
			hotUpdateChunkFilename: 'hot/hot-update.js',
			hotUpdateMainFilename: 'hot/hot-update.json'
		} : {})
	},
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		plugins: [new TsconfigPathsPlugin({})]
	},
	externals: process.env.NODE_ENV !== 'production' ? {} : {
		"react": "React",
		"react-dom": "ReactDOM",
		"lodash": "_",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'awesome-typescript-loader',
					...(process.env.NODE_ENV === 'development' ? [] : [{
						loader: 'intlocalize',
						options: {
							localesPath: path.resolve(__dirname, './src/locales')
						}
					}])
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|jpg|jpeg|gif|png|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=1024&name=[sha512:hash:base64:16].[ext]',
			},
			{
				test: /\.(sass|scss|css)$/,
				exclude: /node_modules/,
				use: [
					(process.env.NODE_ENV === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							data: '@import "Variables";',
							includePaths: [
								path.resolve(__dirname, './src/styles'),
							],
						},
					}
				],
			},
		]
	},
	plugins: process.env.NODE_ENV === 'development' ? [
		new webpack.HotModuleReplacementPlugin()
	] : [
		new TerserPlugin({
			parallel: true,
			terserOptions: {
				ecma: 6,
			},
		}),
		new CompressionPlugin({
			test: /(\.js)$/,
			deleteOriginalAssets: true
		}),
		new OptimizeCSSAssetsPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[key].css',
		})
	],
};
