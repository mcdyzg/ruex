module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ruex',
      externals: {
        react: 'React'
      }
    }
  }
}
