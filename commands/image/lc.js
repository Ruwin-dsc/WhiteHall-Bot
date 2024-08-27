const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

exports.help = {
  name: 'lc',
  aliases: ['lovecalc'],
  description: 'Calcule le taux de compatibilité amoureuse entre deux membres.',
  utilisation: 'lc [utilisateur/random] (utilisateur)',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  const d = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}lc [membre] (membre)\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let user1 = message.author;
  let user2;

  if (args[0] === 'random') {
    const members = message.guild.members.cache.filter(member => !member.user.bot);
    user2 = members.random().user;
  } else {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send({ embeds: [d] });
    user2 = user;
  }

  const taux = Math.floor(Math.random() * 100);
  let heart;
  let text;

  if (taux < 45) {
    heart = bot.emoji.broken_heart;
    text = 'C\'est faible, mais il ne faut pas baisser les bras.';
  } else if (taux < 70) {
    heart = bot.emoji.heart_arrow;
    text = 'Une relation est plausible.';
  } else if (taux < 90) {
    heart = bot.emoji.beating_heart;
    text = 'C\'est un beau score !';
  } else {
    heart = bot.emoji.growing_heart;
    text = 'Une relation est envisageable !';
  }

  const avatar1 = user1.displayAvatarURL({ dynamic: false, format: 'png' });
  const avatar2 = user2.displayAvatarURL({ dynamic: false, format: 'png' });

//   const overlayUrl = `https://api.popcatdev.repl.co/ship?user1=${encodeURIComponent(avatar1)}&user2=${encodeURIComponent(avatar2)}`;


//     const response = await axios.get(overlayUrl, { responseType: 'arraybuffer' });
//     const attachment = new MessageAttachment(response.data, 'ship.png');
    
    const loveEmbed = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Taux d\'amour ${bot.emoji.beating_heart}`)
      .setDescription(`**${user1.username}** + **${user2.username}** = __${taux}%__ d'amour ${heart}\n${text}`)
      //.setImage(`attachment://ship.png`)
      .setFooter(bot.footer);

    message.channel.send({ embeds: [loveEmbed] });

};
