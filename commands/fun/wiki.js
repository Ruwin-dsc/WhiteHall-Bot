const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
  name: "wiki",
  category: "funny",
  description: 'Permet de chercher quelque chose sur wikipedia',
  utilisation: 'wiki [recherche]',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  let b = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}wiki [recherche]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.reply({ embeds: [b] });

  let c = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, Aucun article trouvé pour cette recherche.`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const query = args.join(" ");

  const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
  const data = await response.json();

  if (response.ok) {
    const summary = data.extract;
    const articleUrl = data.content_urls.desktop.page;

    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setDescription(`${summary}\n\n[Lire l'article complet](${articleUrl})`)
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setTimestamp();

    if (data.thumbnail && data.thumbnail.source) {
      embed.setThumbnail(data.thumbnail.source);
    }

    message.channel.send({ embeds: [embed] });
  } else {
    message.channel.send({ embeds: [c] });
  }
};
