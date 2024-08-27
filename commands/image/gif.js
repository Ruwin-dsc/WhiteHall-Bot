const Discord = require("discord.js");

exports.help = {
  name: 'gif',
  category: 'image',
  utilisation: 'gif [recherche]',
  description: 'Permet de chercher un gif.',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  const giphy = require("giphy-api")(bot.config.API.giphy);
  if (args.length === 0) {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny} Erreur`)
      .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande.\n Utilisation: \`${bot.prefix}gif [recherche]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);

    message.channel.send({ embeds: [embed] });
    return;
  }

  let term;
  if (args.length === 1) {
    term = args.toString();
  } else {
    term = args.join(" ");
  }

  giphy.search(term).then(function (res) {
    const id = res.data[0].id;
    const gifUrl = `https://media.giphy.com/media/${id}/giphy.gif`;

    const embed = new Discord.EmbedBuilder()
      .setTitle(`Résultat pour \`${term}\``)
      .setImage(gifUrl)
      .setColor(bot.color)
      .setFooter(bot.footer);

    message.channel.send({ embeds: [embed] });
  });

  message.delete();
};
