const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  Command: require('./Command.js'),
  Listener: require('./Listener.js'),
  Loader: require('./Loader.js'),
  SlashCommandBuilder
}
