const { Util, EmbedBuilder } = require("discord.js");

exports.help = {
  name: "emojiinfo",
  category: "infos",
  utilisation: "emojiinfo [emoji]",
  permission: "EVERYONE",
  description: "Permet de voir les informations de l'emoji",
};

exports.run = async (bot, message, args) => {
  try {
    const errorEmbed = createErrorEmbed(message.author.id, 'Erreur', `Merci de bien utiliser la commande. Il se peut que je n'arrive pas à trouver l'emoji car je ne suis pas sur le serveur.\n **Utilisation:** \`${bot.prefix}emojiinfo [emoji]\``);

    if (!args[0]) {
      return message.reply({ embeds: [errorEmbed] });
    }

    let emoji =
      bot.emojis.cache.get(args[0]) ||
      bot.emojis.cache.find((e) => e.name === args[0]);
    if (!emoji) {
      let e = bot.emojis.resolveIdentifier(args[0]);
      if (!e) {
        return message.channel.send({ embeds: [errorEmbed] });
      }
      e = args[0]
      emoji = bot.emojis.cache.get(e);
      if (!emoji) {
        return message.channel.send({ embeds: [errorEmbed] });
      }
    }

    const img = emoji.animated
      ? `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`
      : `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;

    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle("Information sur l'emoji")
      .setDescription(
        `
        ${bot.emoji.bookmark} Nom de l'emoji: ${emoji.name}
        ${bot.emoji.idbutton} ID de l'emoji: ${emoji.id}
        ${bot.emoji.eyes} Emoji: :${emoji}:
        <:tearoffcalendar_1f4c6:1180802604196974705> Créé en: <t:${Math.floor(emoji.createdTimestamp / 1000)}>
      `
      )
      .setImage(img)
      .setFooter(bot.footer);

    await message.reply({ embeds: [embed] });
  } catch (e) {
    console.error(e);
    const errorEmbed = createErrorEmbed(message.author.id, 'Erreur', `Merci de bien utiliser la commande. Il se peut que je n'arrive pas à trouver l'emoji car je ne suis pas sur le serveur.\n **Utilisation:** \`${bot.prefix}emojiinfo [emoji]\``);
    message.reply({ embeds: [errorEmbed] });
  }

  function createErrorEmbed(authorId, title, description) {
    return new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・${title}`)
      .setDescription(`<@${authorId}>, ${description}`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  }
};
