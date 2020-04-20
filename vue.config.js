module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'tc-components': `${__dirname}/src`,
      },
    },
  },
  css: {
    extract: false,
  },
  lintOnSave: false,
};
