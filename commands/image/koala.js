const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'koala',
  utilisation: 'koala',
  description: 'Affiche une image d\'un koala.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/koala');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`**${bot.emoji.koala} Koala ! ${bot.emoji.koala}**`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
