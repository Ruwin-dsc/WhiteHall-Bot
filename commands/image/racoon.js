const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'racoon',
  utilisation: 'racoon',
  description: 'un raton-laveur.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/raccoon');
  const { link: img } = await res.json();

  const embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.raccoon} Raton-laveur ! ${bot.emoji.raccoo}`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
