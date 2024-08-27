const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'fox',
  utilisation: 'fox',
  description: 'Affiche une image de renard.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/fox');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`**${bot.emoji.fox} Ki Ki! ${bot.emoji.fox}**`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
