const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: 'kiss',
  category: 'image',
  utilisation: 'kiss [utilisateur]',
  description: 'Permet de faire un bisou à un utilisateur',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  const d = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Utilisation de la commande`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}kiss [membre]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const list = [
    'https://imgur.com/3aX4Qq2.gif',
    'https://imgur.com/uobBW9K.gif'
  ];

  if (!args[0]) return message.reply({ embeds: [d] });

  let user = message.mentions.users.first() || bot.users.cache.get(args[0]);
  if (!user) user = `<@${bot.userId}>`;

  const randomGif = list[Math.floor(Math.random() * list.length)];

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(' Bisous ')
    .setDescription(`${message.author} a fait un bisou à ${user}!`)
    .setImage(randomGif)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
