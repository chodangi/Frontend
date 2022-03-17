const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://13.209.180.179:8080",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
          '^/api/': '/'
      }
    })
  );
};