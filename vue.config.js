module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.43.172:8000',
        // target: 'http://172.20.10.7:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
        },
      },
    },
  },
};
