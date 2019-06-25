module.exports = {
  // Base: "/",
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          pathRewrite: { "^/api": "" },
          changeOrigin: true
        }
      }
    }
  }
};
