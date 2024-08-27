const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "Shinetsus",
  description: "Permet de faire un embed trophée",
  permission: "Aucune",
  dm: false,

  async run(bot, interaction) {

     interaction.guild.owner = await interaction.guild.fetchOwner().then(m => m.user).catch(() => { })
    const online = interaction.guild.presences.cache.filter((presence) => presence.status !== "offline").size;
        
    let embed = new EmbedBuilder()
      .setTitle(`**__${interaction.guild.name}〃Statistiques__**`)
      .setThumbnail(interaction.guild.iconURL())
      .setColor(bot.color)
      .setDescription(`Membre: **${message.guild.memberCount}** <:members:1199447820147626054>\nEn ligne: **${online}** <:Enligne:1199447877269852312>\nEn vocal: **${message.guild.members.cache.filter(m => m.voice.channel).size}** <:vocal:1199447934626963587>\nBoost: **${message.guild.premiumSubscriptionCount}** <a:boost:1199447986397265932>`)

    interaction.reply({ embeds: [embed] })

  }
}