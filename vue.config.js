module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.8.115:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
        },
      },
    },
  },
};
