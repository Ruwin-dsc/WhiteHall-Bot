const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'redpanda',
  utilisation: 'redpanda',
  description: 'un panda rouge.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/red_panda');
  const { link: img } = await res.json();

  const embed = new EmbedBuilder()
    .setTitle('** Panda rouge ??? **\n\n')
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
