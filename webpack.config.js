module.exports = {
        output: {
                path: './public',
                filename: 'bundle.js'
        },
        module: {
                loaders: [{
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        loader: 'jsx-loader' }
                ]
        }
};
