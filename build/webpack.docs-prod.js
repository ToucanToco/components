const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const getBaseConfig = require('./webpack.docs-base');

module.exports = function() {
  const baseConfig = getBaseConfig();

  return {
    ...baseConfig,
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ecma: 8,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      ...baseConfig.output,
      filename: '[name].[contenthash:8].js',
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.DefinePlugin({
        'process.env': {
          BASE_URL: '"/"',
          NODE_ENV: '"production"',
        },
      }),
      new FriendlyErrorsPlugin(),
      new OptimizeCssnanoPlugin({
        cssnanoOptions: {
          present: [
            'default',
            {
              cssDeclatrationSorter: false,
            },
          ],
        },
        sourceMap: true,
      }),
      new VueLoaderPlugin(),
    ],
  };
};
