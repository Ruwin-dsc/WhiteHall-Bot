const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: 'gend',
  category: 'giveaway',
  utilisation: 'gend [ID MSG GIVEAWAY]',
  permission: 'MANAGE_MESSAGES',
  description: 'Permet de terminer un giveaway'
};

exports.run = async (bot, message, args) => {

  let embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}gend [ID MSG GIVEAWAY]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let notfound = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, Je n'ai pas trouvé le giveaway !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.reply({ embeds: [embed] });

  bot.giveawaysManager
    .end(args[0], 'Il n\'y a pas assez de participants pour terminer un giveaway', {
      winMessage: 'Félicitation, {winners}! Tu as gagné **{this.prize}**!',
      messages: {
        congrat: `${bot.emoji.tada} Bien joué {winners}, le giveaway est terminé, tu as gagné **{this.prize}**!`,
        error: 'Il n\'y a pas assez de participants pour terminer un giveaway'
      }
    })
    .catch(() => message.reply({ embeds: [notfound] }))
    .then(() => {
      message.reply('Le giveaway a été terminé avec succès !');
    });
};
