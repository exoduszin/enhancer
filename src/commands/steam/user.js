const { MessageEmbed } = require('discord.js')

const { Command, SlashCommandBuilder } = require('../../structures')

module.exports = class User extends Command {
  constructor (client) {
    super({ name: 'user' }, client)
  }

  static data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with Steam user informations')
    .addStringOption((option) =>
      option
        .setName('user')
        .setDescription('Steam ID, custom URL or profile link')
        .setRequired(true)
    )

  async execute ({ interaction }) {
    const user = interaction.options.getString('user')
    const userData = await this.client.apis.enhancer.getUser(user)
    const yn = (bool) => (bool ? 'Yes' : 'No')

    return await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: userData.name,
            url: `https://steamcommunity.com/profiles/${userData.steam_id64}`
          })
          .setThumbnail(userData.avatar_url.full)
          .addFields(
            { name: 'Realname', value: userData.realname },
            { name: 'Level', value: userData.level.toString(), inline: true },
            { name: 'Status', value: userData.status, inline: true },
            { name: 'Privacy', value: userData.privacy, inline: true },
            { name: 'Location', value: userData.location },
            { name: 'VAC', value: yn(userData.limitations.vac), inline: true },
            {
              name: 'Trade Ban',
              value: yn(userData.limitations.trade_ban),
              inline: true
            },
            {
              name: 'limited',
              value: yn(userData.limitations.limited),
              inline: true
            },
            { name: 'Steam 3ID', value: userData.steam_3id },
            { name: 'Steam ID32', value: userData.steam_id32 },
            { name: 'Steam ID64', value: userData.steam_id64 },
            { name: 'Custom URL', value: userData.custom_url }
          )
          .setFooter({ text: `Member since ${userData.member_since}` })
      ]
    })
  }
}
