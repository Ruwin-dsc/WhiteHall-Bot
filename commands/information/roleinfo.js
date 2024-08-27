const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

exports.help = {
  name: "roleinfo",
  category: "infos",
  description: "Permet de voir les informations d'un rôle",
  utilisation: "roleinfo [role]",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const embedCommandUsage = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}roleinfo [role]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) {
    return message.reply({ embeds: [embedCommandUsage] });
  }

  const role =
    message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
  if (!role) {
    return message.reply({ embeds: [embedCommandUsage] });
  }

  const position = `\`${message.guild.roles.cache.size - role.position}\`/\`${
    message.guild.roles.cache.size
  }\``;

  const permissions =
    role.permissions.toArray().length !== 0
      ? role.permissions
          .toArray()
          .map((perm) => perm[0] + perm.slice(1).toLowerCase())
          .join(", ")
      : "Aucun";

  const embedRoleInfo = new EmbedBuilder()
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setTimestamp()
    .setTitle(`**Information du rôle** ${role}`).setDescription(`
      ➔ **Information sur le rôle**
      > \`•\` **Nom :** ${role.name}
      > \`•\` **ID :** ${role.id}
      > \`•\` **Couleur :** ${role.hexColor.toUpperCase()}
      > \`•\` **Visibilité :** ${role.hoist ? "Oui" : "Non"}
      > \`•\` **Utilisateurs :** ${role.members.size}
      > \`•\` **Mentionable :** ${role.mentionable ? "Oui" : "Non"}
      > \`•\` **Position :** ${position}
      > \`•\` **Créé le :** ${moment(role.createdTimestamp).format(
        "Do MMMM YYYY, h:mm:ss"
      )} | Il y a ${Math.floor(
    (Date.now() - role.createdTimestamp) / 86400000
  )} jour(s)
      > \`•\` **Permissions :** ${permissions}
    `);

  return message.reply({ embeds: [embedRoleInfo] });
};
