const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const File = require('./utils/File.js')

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env
const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN)

;(async () => {
  const commands = []

  await File.requireDirectory(
    'src/commands',
    (Command) => commands.push(Command.data.toJSON()),
    console.error
  )

  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands
    })
  } catch (error) {
    console.error(error)
  }
})()
