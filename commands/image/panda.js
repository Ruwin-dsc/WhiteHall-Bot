const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'panda',
  utilisation: 'panda',
  description: 'Affiche une image de panda.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/panda');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.panda} Panda ! ${bot.emoji.panda}`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
