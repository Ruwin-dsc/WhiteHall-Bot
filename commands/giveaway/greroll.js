const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: 'greroll',
  category: 'giveaway',
  utilisation: 'greroll [ID MSG GIVEAWAY]',
  permission: 'MANAGE_MESSAGES',
  description: 'Permet de reroll un giveaway'
};

exports.run = async (bot, message, args) => {
  const reas = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les messages\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send({ embeds: [reas] });

  let embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}greroll [ID MSG GIVEAWAY]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let notfound = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, Je n'ai pas trouvé le giveaway !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.reply({ embeds: [embed] });

  bot.giveawaysManager.reroll(args[0], {
    messages: {
      congrat: `${bot.emoji.tada} Bien joué {winners}! Après un reroll vous avez gagné **{this.prize}**!`,
      error: 'Il n\'y a pas assez de participants pour faire un reroll'
    }
  })
    .catch(() => message.reply({ embeds: [notfound] }));
};
