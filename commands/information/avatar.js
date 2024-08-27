const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "avatar",
  category: "infos",
  aliases: ["pic", "pp"],
  description: "Permet d'avoir l'avatar d'une personne",
  permission: "EVERYONE",
  utilisation: "avatar (membre)",
};

exports.run = async (bot, message, args) => {
    const nousers = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(
        `<@${message.author.id}>, merci de mentionner un utilisateur valide, il se peut que l'utilisateur n'a pas de serveur en commun avec le bot !`
      )
      .setColor(bot.color)
      .setFooter(bot.footer);


let user;
if (message.mentions.members.first()) {
  user = message.mentions.members.first().user;
} else if (args[0]) {
  user = await bot.users.cache.get(args[0]);
} else {
  user = message.author;
}

if (!user)
  return message.reply({
    embeds: [nousers],
  });
  const avatar = user.displayAvatarURL({ size: 4096, dynamic: true });

  const embed = new EmbedBuilder()
    .setTitle(`Avatar de ${user.username}`)
    .setImage(avatar)
    .setColor(bot.color)
    .addFields(
      {
        name: "PNG",
        value: `[LIEN](${user.displayAvatarURL({ format: "png" })})`,
        inline: true,
      },
      {
        name: "JPEG",
        value: `[LIEN](${user.displayAvatarURL({ format: "jpg" })})`,
        inline: true,
      },
      {
        name: "WEBP",
        value: `[LIEN](${user.displayAvatarURL({ format: "webp" })})`,
        inline: true,
      },
      {
        name: "GIF",
        value: `[LIEN](${user.displayAvatarURL({ format: "gif" })})`,
        inline: true,
      }
    )
    .setFooter(bot.footer)
    .setTimestamp()
    .setURL(user.displayAvatarURL({ dynamic: true }));

  message.channel.send({ embeds: [embed] });
};
