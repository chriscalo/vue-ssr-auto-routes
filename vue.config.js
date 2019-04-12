const { apiServer } = require('./src/api');

module.exports = {
  pluginOptions: {
    ssr: {
      // compose dev server and API server
      extendServer: devServer => {
        devServer.use(apiServer);
      },
    },
  },
};
