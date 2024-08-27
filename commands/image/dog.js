const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'dog',
  utilisation: 'dog',
  description: 'Affiche une image de chien.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/dog');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`**${bot.emoji.dog} Ouaf Ouaf! ${bot.emoji.dog}**`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
