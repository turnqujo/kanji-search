module.exports = {
  pwa: {
    name: 'Kanji Search'
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].inject = 'head'
      return args
    })
  }
}
