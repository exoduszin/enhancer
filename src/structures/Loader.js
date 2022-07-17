const File = require('../utils/File.js')

module.exports = class Loader {
  constructor (client) {
    this.client = client
  }

  async loadFiles (path, options) {
    await File.requireDirectory(
      path,
      (file, filename) => this.loadFile(file, filename),
      console.error,
      options
    )
  }
}
