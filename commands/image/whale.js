const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'whale',
  utilisation: 'whale',
  description: 'une baleine.',
  category: 'image'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://some-random-api.ml/img/whale');
  const { link: img } = await res.json();

  const embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.whale} Baleine ! ${bot.emoji.whale}`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
