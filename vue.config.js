module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/scss/style.scss"'
      }
    }
  },
  assetsDir: '@/assets/'
}
