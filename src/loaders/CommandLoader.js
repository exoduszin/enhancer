const { Loader } = require('../structures')

module.exports = class CommandLoader extends Loader {
  constructor (client) {
    super(client)
  }

  load () {
    return this.loadFiles('src/commands')
  }

  loadFile (Command) {
    const command = new Command(this.client)

    this.client.commands.set(command.name, command)
  }
}
