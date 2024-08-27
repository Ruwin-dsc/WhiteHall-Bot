const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'pikachu',
  utilisation: 'pikachu',
  description: 'Affiche une image de Pikachu.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/pikachu');
  const img = (await res.json()).link;

  const embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.pikachu} Pikachu ! ${bot.emoji.pikachu}`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
