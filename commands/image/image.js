const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "image",
  category: "funny",
  description: "Permet de faire une recherche d'image.",
  utilisation: "image [recherche]",
  permission: "EVERYONE"
};

exports.run = async (bot, message, args) => {
  const b = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny} Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande.\n Utilisation: \`${bot.prefix}image [recherche]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) {
    return message.reply({ embeds: [b] });
  }

  const c = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny} Erreur`)
    .setDescription(`<@${message.author.id}>, aucune image trouvée pour cette recherche.`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  try {
    const pixabayApiKeyv2 = bot.config.API.pixabay
    const query = args.join(" ");
    const response = await fetch(`https://pixabay.com/api/?key=${pixabayApiKeyv2}&q=${encodeURIComponent(query)}&image_type=photo`);
    const data = await response.json();

    if (data.hits.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.hits.length);
      const imageUrl = data.hits[randomIndex].largeImageURL;

      const u = new EmbedBuilder()
        .setTitle(query)
        .setColor(bot.color)
        .setFooter(bot.footer)
        .setImage(imageUrl);

      message.channel.send({ embeds: [u] });
    } else {
      message.channel.send({ embeds: [c] });
    }
  } catch (error) {
    console.error('Erreur lors de la recherche d\'images sur Pixabay:', error);
    message.channel.send('Une erreur s\'est produite lors de la recherche d\'images.');
  }
};
