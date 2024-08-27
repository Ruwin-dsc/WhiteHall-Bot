const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'bird',
  utilisation: 'bird',
  description: 'Affiche une image d\'oiseau.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/bird');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`**${bot.emoji.bird} Cui Cui! ${bot.emoji.bird}**\n\n`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
