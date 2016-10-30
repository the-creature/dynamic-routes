const webpack = require('webpack');
const config = {
  context: __dirname + '/src',
  entry: './main.jsx',
  output: {
    path: __dirname + '/public/assets',
    filename: 'bundle.js',
    publicPath: 'assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel'
      },
      {
        test: /routes\.json$/,
        include: /src/,
        loader: 'routes-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ]
};

if (process.env.NODE_ENV == 'production') {
  config.output.filename = 'bundle.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.devtool = 'source-map';
}

module.exports = config;
