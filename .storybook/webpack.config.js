const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = ({config}) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('awesome-typescript-loader')
    });
    config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|jpg|jpeg|gif|png|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=[sha512:hash:base64:16].[ext]',
    });
    config.module.rules.push({
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
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
    });
    config.resolve.extensions.push('.ts', '.tsx', '.json');
	config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    config.node = {
        fs: "empty"
    };
    return config;
};
