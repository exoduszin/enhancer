const { Client, Intents } = require('discord.js')

const loaders = require('./loaders')

module.exports = class Enhancer extends Client {
  constructor () {
    super({ intents: [Intents.FLAGS.GUILDS] })

    this.commands = new Map()

    this.initializeLoaders()
  }

  async initializeLoaders () {
    for (const name in loaders) {
      const loader = new loaders[name](this)

      try {
        await loader.load()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
