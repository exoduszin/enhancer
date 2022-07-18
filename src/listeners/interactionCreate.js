const { Listener } = require('../structures')

module.exports = class InteractionCreate extends Listener {
  constructor (client) {
    super(client)

    this.commands = client.commands
  }

  async onInteractionCreate (interaction) {
    if (!interaction.isCommand()) return
    if (!interaction.guildId || !interaction.channelId) return
    if (!interaction.client.guilds.cache.get(interaction.guildId)) return

    const commandName = interaction.commandName.toLowerCase()

    if (this.commands.has(commandName)) {
      const command = this.commands.get(commandName)

      command.executeCommand({ interaction })
    }
  }
}
