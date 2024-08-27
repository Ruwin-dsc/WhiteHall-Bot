const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: 'car',
  utilisation: 'car',
  description: 'Affiche une image de voiture.',
  category: 'image',
  permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
  const res = await fetch('https://api.popcat.xyz/car');
  const img = (await res.json()).image;
  const res2 = await fetch('https://api.popcat.xyz/car');
  const titre = (await res2.json()).title;

  const embed = new EmbedBuilder()
    .setTitle(`**${bot.emoji.car} Vroom! ${bot.emoji.car}** (${titre})\n\n`)
    .setImage(img)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
