const { Loader } = require('../structures')

module.exports = class APILoader extends Loader {
  constructor (client) {
    super(client)

    this.apis = {}
  }

  async load () {
    try {
      await this.loadFiles('src/apis')
      this.client.apis = this.apis
    } catch (error) {
      console.error(error)
    }
  }

  async loadFile (API) {
    const api = new API()

    this.apis[api.name] = await api.load()
  }
}
