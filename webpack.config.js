var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          {
            loader: 'babel-loader',
            test: /\.js$|jsx/,
            
          },
          {
            test: /\.(sa|sc|c)ss$/,
             use: ["style-loader", "css-loader", "sass-loader"]
          }
          
        ],
     
             
      },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
      output: {
      filename: '[name].[contenthash].js'
    },
    externals: {
        // apiUrl: 'https://backend.abonesepeti.com/api'
        config: JSON.stringify({
            apiUrl: 'https://backend.abonesepeti.com/api'
        })
    }
}