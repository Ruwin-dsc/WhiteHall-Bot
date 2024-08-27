const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'cat',
  utilisation: 'cat',
  description: 'Affiche une image de chat.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/cat');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`**${bot.emoji.cat} Miaou! ${bot.emoji.cat}**\n\n`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
