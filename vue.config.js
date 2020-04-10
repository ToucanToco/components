module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': `${__dirname}/docs`,
        'tc-components': `${__dirname}/src`,
      },
    },
  },
  lintOnSave: false,
};
