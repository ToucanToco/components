module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'tc-components': `${__dirname}/src`,
      },
    },
  },
  lintOnSave: false,
};
