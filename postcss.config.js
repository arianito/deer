module.exports = {
	plugins: [
		require('autoprefixer')(),
		require('postcss-rtl')({
			useCalc: true
		})
	]
};
