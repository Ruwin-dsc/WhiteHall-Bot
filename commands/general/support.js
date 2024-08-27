const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

exports.help = {
  name: "support",
  category: "général",
  description: "T'envoie le serveur d'aide au bot",
  utilisation: "support",
  permission: "EVERYONE",
};

exports.run = async (bot, message) => {
  message.reply({
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: message.guild.name,
          iconURL: message.guild.iconURL({ dinamyc: true }),
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
};
