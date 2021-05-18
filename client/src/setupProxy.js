const createProxyMiddleware = require('http-proxy-middleware');

const getProxy = () => {
  const proxy = process.env.REACT_APP_PROXY;

  switch (proxy) {
    case 'local':
      return 'http://api.mosaic:8080';
    case 'prod':
      return 'https://api.mosaic.io';
    case 'stage':
      return 'https://api.mosaic.pub';
    case 'dev':
    default:
      return 'http://localhost:8080';
  }
};

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: getProxy(),
      changeOrigin: true,
    }),
  );
};
