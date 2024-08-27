const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

exports.help = {
  name: "channelinfo",
  description: "Permet de donner les informations du salon",
  category: "infos",
  utilisation: "channelinfo (salon)",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  let d = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Utilisation de la commande`)
    .setDescription(
      `<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}channelinfo (salon)\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  let channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]) ||
    message.channel;

  if (!channel) {
    return message.reply({ embeds: [d] });
  }

  const totalUsers = channel.members.size;
  const nsfwStatus = channel.nsfw ? "Oui" : "Non";

  const embed = new EmbedBuilder()
    .setTitle("Information du salon")
    .setDescription(
      `
      ➔ **Information sur le salon ${channel}**
      > \`•\` **Nom :** ${channel.name}
      > \`•\` **Identifiant :** ${channel.id}
      > \`•\` **Type :** ${channel.type}
      > \`•\` **Utilisateurs :** ${totalUsers}
      > \`•\` **Création :** ${moment(channel.createdAt).format("DD/MMM/YYYY")}
      > \`•\` **NSFW :** ${nsfwStatus}
    `
    )
    .setColor(bot.color)
    .setTimestamp()
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
