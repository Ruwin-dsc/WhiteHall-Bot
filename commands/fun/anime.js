const Discord = require("discord.js");
const malScraper = require('mal-scraper');

exports.help = {
  name: "anime",
  category: "funny",
  description: "Permet de rechercher un animé",
  utilisation: "anime [animé]",
  permission: "EVERYONE"
};

exports.run = async (bot, message, args) => {
  const search = args.join(" ");
  
  if (!search) {
    const b = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}anime [animé]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
      
    return message.reply({ embeds: [b] });
  }
  
  malScraper.getInfoFromName(search)
    .then((data) => {
      const malEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Résultat de recherche pour ${args.join(" ")}` })
        .setThumbnail(data.picture)
        .setColor(bot.color)
        .addFields(
          { name: "Première", value: `\`${data.premiered}\``, inline: true },
          { name: "Diffuser", value: `\`${data.broadcast}\``, inline: true },
          { name: "Genres", value: `\`${data.genres}\``, inline: true },
          { name: "Titre anglais", value: `\`${data.englishTitle}\``, inline: true },
          { name: "Titre japonais", value: `\`${data.japaneseTitle}\``, inline: true },
          { name: "Type", value: `\`${data.type}\``, inline: true },
          { name: "Episodes", value: `\`${data.episodes}\``, inline: true },
          { name: "Evaluation", value: `\`${data.rating}\``, inline: true },
          { name: "Diffusé", value: `\`${data.aired}\``, inline: true },
          { name: "Score", value: `\`${data.score}\``, inline: true },
          { name: "Favori", value: `\`${data.favorites}\``, inline: true },
          { name: "Classé", value: `\`${data.ranked}\``, inline: true },
          { name: "Durée", value: `\`${data.duration}\``, inline: true },
          { name: "Studios", value: `\`${data.studios}\``, inline: true },
          { name: "Popularité", value: `\`${data.popularity}\``, inline: true },
          { name: "Membres", value: `\`${data.members}\``, inline: true },
          { name: "Score Stats", value: `\`${data.scoreStats}\``, inline: true },
          { name: "Source", value: `\`${data.source}\``, inline: true },
          { name: "Synonymes", value: `\`${data.synonyms}\``, inline: true },
          { name: "Status", value: `\`${data.status}\``, inline: true },
          { name: "Identifier", value: `\`${data.id}\``, inline: true },
          { name: "Link", value: `\`${data.url}\``, inline: true }
        )
        .setFooter(bot.footer)
        .setTimestamp();
      
      message.channel.send({ embeds: [malEmbed] });
    });
};
