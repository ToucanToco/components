const HtmlPlugin = require('html-webpack-plugin');

module.exports = function() {
  const root = `${__dirname}/..`;
  const src = `${root}/src`;

  return {
    entry: `${src}/docs/index.js`,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
      ],
    },
    output: {
      path: `${__dirname}/../www`,
      publicPath: '/',
    },
    plugins: [
      new HtmlPlugin({
        template: `${src}/docs/index.html`,
      }),
    ],
  };
};
