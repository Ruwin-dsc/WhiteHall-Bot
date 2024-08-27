const Discord = require("discord.js")
const {
  EmbedBuilder
} = require("discord.js");
const moment = require("moment");


module.exports = {
  name: "roleinfo",
  description: "Permet de voir les informations d'un rôle",
  permission: "Aucune",
  dm: false,
  options: [
    {
      type: "role",
      name: "role",
      description: "Le rôle dont vous souhaitez avoir les informations",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
        const role = slashCommand.getRole("role");

     const position = `\`${
       interaction.guild.roles.cache.size - role.position
     }\`/\`${interaction.guild.roles.cache.size}\``;

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
       .setTitle(`**Information du rôle**`).setDescription(`
      ➔ **Information sur le rôle**
      > \`•\` **Rôle :** ${role}
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

     return interaction.reply({ embeds: [embedRoleInfo] });

  }
}