const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "support",
  description: "Permet de t'envoyer le lien du serveur suports",
  permission: "Aucune",
  dm: true,

  async run(bot, interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dinamyc: true }),
          })
          .setTitle(`${bot.emoji.ampoule}・SERVEUR DE SUPPORT`)
          .setColor(bot.color)
          .setFooter(bot.footer),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(`Serveur de support`)
            .setURL(bot.support)
        ),
      ],
    });
  },
};
