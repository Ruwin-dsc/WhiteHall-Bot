const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

exports.help = {
  name: 'gcreate',
  category: 'giveaway',
  utilisation: 'gcreate [TEMPS (s = secondes, m = minutes, h = heures, d = jours)] [Nb GAGNANTS] [PRIX]',
  permission: 'MANAGE_MESSAGES',
  description: 'Permet de lancer un giveaway'
};

exports.run = async (bot, message, args) => {

  let embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}gcreate [TIME (s = secondes, m = minutes, h = heures, d = jours)] [Nb GAGNANTS] [PRIX]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.reply({ embeds: [embed] });

  let duration = args[0];
  if (!duration || isNaN(ms(duration))) {
    return message.reply({ embeds: [embed] });
  }

  let winnerCount = args[1];
  if (isNaN(winnerCount) || parseInt(winnerCount) <= 0) {
    return message.reply({ embeds: [embed] });
  }

  let prize = args.slice(2).join(" ");
  if (!prize) {
    return message.reply({ embeds: [embed] });
  }

  await message.delete();

  return bot.giveawaysManager.start(message.channel, {
    prize: prize,
    duration: ms(duration),
    winnerCount: parseInt(winnerCount),
    hostedBy: message.author,
    messages: {
      giveaway: `${bot.emoji.tada} **GIVEAWAY** ${bot.emoji.tada}`,
      giveawayEnded: `${bot.emoji.tada} **GIVEAWAY TERMINÉ** ${bot.emoji.tada}`,
      timeRemaining: 'Temps restant: **{duration}**',
      inviteToParticipate: `Réagis avec ${bot.emoji.tada} pour participer au giveaway!`,
      winMessage: `Félicitations, {winners}! Tu as gagné **${prize}**!`,
      embedFooter: bot.footer,
      noWinner: 'Giveaway annulé, aucun participant valide.',
      hostedBy: `Organisé par: ${message.author}`,
      winners: 'Gagnant(s)',
      endedAt: 'Terminé le'
    }
  });
};
