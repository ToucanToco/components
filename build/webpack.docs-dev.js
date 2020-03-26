const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const getBaseConfig = require('./webpack.docs-base');

module.exports = function() {
  const baseConfig = getBaseConfig();

  return {
    ...baseConfig,
    devServer: {
      compress: true,
      contentBase: baseConfig.output.path,
      historyApiFallback: true,
      host: '0.0.0.0',
      overlay: {
        errors: true,
        warnings: true,
      },
      port: 8000,
    },
    mode: 'development',
    output: {
      ...baseConfig.output,
      filename: '[name].js',
      globalObject: 'this',
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.DefinePlugin({
        'process.env': {
          BASE_URL: '"/"',
          NODE_ENV: '"development"',
        },
      }),
      new FriendlyErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.SourceMapDevToolPlugin({
        columns: true,
        exclude: /\.json$/,
        module: true,
      }),
      new VueLoaderPlugin(),
    ],
  };
};
