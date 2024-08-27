const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "close",
  description: "Permet de fermer un ticket",
  utilisation: "close",
  permission: 'EVERYONE',
  category: 'ticket'
};

exports.run = async (bot, message, args) => {
  if (!message.channel.name.toLowerCase().startsWith("ticket-") && !message.channel.name.toLowerCase().startsWith("fermé-")) {
    const reas = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, cette commande ne peut être utilisée que dans les tickets !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    return message.reply({ embeds: [reas] });
  }
  const channel = message.channel;

  channel.delete()

};