const HtmlPlugin = require('html-webpack-plugin');

module.exports = function() {
  const root = `${__dirname}/..`;
  const src = `${root}/docs`;

  return {
    entry: `${src}/index.js`,
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
        template: `${src}/index.html`,
      }),
    ],
    resolve: {
      alias: {
        '@': src,
        'tc-components': `${root}/src`,
      },
    },
  };
};
