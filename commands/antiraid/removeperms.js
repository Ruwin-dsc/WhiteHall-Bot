const Discord = require("discord.js");

exports.help = {
  name: 'removeperms',
  utilisation: 'removeperms [admin/ban/kick/role/everyone/server/viewchannel/voice/webhooks]',
  category: "gestion",
  description: 'Permet de désactiver les permissions spécifiées pour tous les rôles du serveur.',
  permission: "OWNER"
};

exports.run = async (bot, message, args) => {

  const nofound = new Discord.EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement cette commande\n**Utilisation:** \`removeperms [admin/ban/kick/role/everyone/server/viewchannel/voice/webhooks]\` !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const permissionsMap = {
    admin: [Discord.PermissionsBitField.Flags.Administrator],
    ban: [Discord.PermissionsBitField.Flags.BanMembers],
    kick: [Discord.PermissionsBitField.Flags.KickMembers],
    role: [Discord.PermissionsBitField.Flags.ManageRoles],
    everyone: [Discord.PermissionsBitField.Flags.MentionEveryone],
    server: [Discord.PermissionsBitField.Flags.ManageGuild],
    viewchannels: [Discord.PermissionsBitField.Flags.ViewChannel],
    voice: [Discord.PermissionsBitField.Flags.MuteMembers, Discord.PermissionsBitField.Flags.MoveMembers, Discord.PermissionsBitField.Flags.DeafenMembers],
    webhooks: [Discord.PermissionsBitField.Flags.ManageWebhooks],
  };

  const permission = args[0]?.toLowerCase();

  if (!permission || !permissionsMap[permission]) {
    return message.channel.send({embeds: [nofound]});
  }

  const permissions = permissionsMap[permission];

  const roles = message.guild.roles.cache.filter((role) =>
    role.permissions.any(permissions)
  );

  roles.forEach((role) => {
    role.setPermissions(role.permissions.remove(permissions)).catch(() => {});
  });

  const permEmbed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`**Je désactive les permissions ${permission.toUpperCase()} à tous les rôles.**`)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [permEmbed] });
};
