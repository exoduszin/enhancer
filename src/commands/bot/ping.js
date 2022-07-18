const { Command, SlashCommandBuilder } = require('../../structures')

module.exports = class Ping extends Command {
  constructor (client) {
    super({ name: 'ping' }, client)
  }

  static data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')

  async execute ({ interaction }) {
    return await interaction.reply(`${~~this.client.ws.ping}ms`)
  }
}
