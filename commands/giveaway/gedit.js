const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

exports.help = {
  name: 'gedit',
  category: 'giveaway',
  utilisation: 'gedit [ID MSG] [TEMPS A ADD (s = secondes, m = minutes, h = heures, d = jours)] [Nb GAGNANT] [PRIX]',
  permission: 'MANAGE_MESSAGES',
  description: 'Permet de modifier un giveaway'
};

exports.run = async (bot, message, args) => {
  let embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}gedit [ID MSG] [TEMPS A ADD (s = secondes, m = minutes, h = heures, d = jours)] [Nb GAGNANT] [PRIX]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let notfound = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, Je n'ai pas trouvé le giveaway !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (args.length < 4) return message.reply({ embeds: [embed] });

  let gwID = args[0];
  let duratione = args[1];
  if (!duratione || isNaN(ms(duratione))) {
    return message.reply({ embeds: [embed] });
  }

  let winnerCounte = args[2];
  if (isNaN(winnerCounte) || parseInt(winnerCounte) <= 0) {
    return message.reply({ embeds: [embed] });
  }

  let price = args.slice(3).join(' ');

  bot.giveawaysManager
    .edit(gwID, {
      newWinnersCount: parseInt(winnerCounte),
      newPrize: price,
      addTime: ms(duratione)
    })
    .catch(() => message.reply({ embeds: [notfound] }));
};
