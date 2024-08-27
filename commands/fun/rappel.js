const ms = require('ms');
const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "rappel",
  category: 'funny',
  description: 'Permet d\'avoir une pp random',
  utilisation: 'rappel [durée] [raison]',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args, db) => {
  const member = message.author;

  const nondef = new EmbedBuilder()
    .setDescription(`${bot.emoji.deny}・Utilisation de la commande\n<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}rappel [durée (s = secondes, m = minutes, h = heures, d = jours)] [raison]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let reason = args.slice(1).join(" ");
  let time = args[0];

  if (!time || isNaN(ms(time))) {
    return message.reply({ embeds: [nondef] });
  }

  if (!reason) {
    return message.reply({ embeds: [nondef] });
  }

  const a = new EmbedBuilder()
    .setDescription(`**Je vais vous rappeler de : \`${reason}\`, dans : \`${time}\` !**`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.reply({ embeds: [a] });

  setTimeout(async function () {
    const muteEmbedServer = new EmbedBuilder()
      .setDescription(`**Voici votre rappel : \`${reason}\` !** ${member}`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    message.channel.send({ content: `${member}`, embeds: [muteEmbedServer] });
  }, ms(time));
};
