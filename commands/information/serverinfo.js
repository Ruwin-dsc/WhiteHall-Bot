const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

exports.help = {
  name: "serverinfo",
  category: 'infos',
  description: "Affiche les informations du serveur",
  utilisation: "serverinfo",
  permission: "EVERYONE",
  aliases: ["si"],
};

exports.run = async (bot, message, args) => {
  const channels = message.guild.channels.cache;
  message.guild.owner = await message.guild.fetchOwner().then(m => m.user).catch(() => { });
  let guild = message.guild;
  let embed = new EmbedBuilder()
    .setThumbnail(message.guild.iconURL())
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setImage(guild.bannerURL({ size: 1024 }))
    .setDescription(`
      ➔ **Informations sur le serveur**
      > \`•\` **Nom :** ${message.guild.name}
      > \`•\` **Description :** ${guild.description || "Aucune"}
      > \`•\` **ID :** ${guild.id}
      > \`•\` **Owner :** ${message.guild.owner}
      > \`•\` **Créé le :** ${moment.utc(message.guild.createdAt).format('LLLL')}
      > \`•\` **URL :** https://discord.gg/${guild.vanityURLCode || "Shinetsus (aucun)"}
      ➔ **Statistiques du serveur**
      > \`•\` **Utilisateurs :** ${message.guild.memberCount}
      > \`•\` **Humains :** ${message.guild.members.cache.filter(m => !m.user.bot).size}
      > \`•\` **Bots :** ${message.guild.members.cache.filter(m => m.user.bot).size}
      > \`•\` **Salons textuels :** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}
      > \`•\` **Salons vocaux :** ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}
      > \`•\` **Rôles :** ${message.guild.roles.cache.size} 
      > \`•\` **Plus haut rôle :** ${message.guild.roles.highest}
      > \`•\` **Emojis :** ${message.guild.emojis.cache.size}
      ➔ **Autres**
      > \`•\` **Boosts :** ${message.guild.premiumSubscriptionCount}
      > \`•\` **Boosters :** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}
      > \`•\` **Niveau de boost :** ${guild.premiumTier || "TIER_0"}
      > \`•\` **Niveau de vérification :** ${message.guild.verificationLevel}
      > \`•\` **Salon système :** ${message.guild.systemChannel || "Aucun"}
      > \`•\` **Salon règlement :** ${message.guild.rulesChannel || "Aucun"}
      > \`•\` **Partenaire :** ${message.guild.partnered || "Non"}
      > \`•\` **Vérifié :** ${message.guild.verified || "Non"}
      > \`•\` **Notifications :** ${message.guild.defaultMessageNotifications}
      > \`•\` **Salon AFK :** ${message.guild.afkChannel || "Aucun"}
      ➔ **Bannière**
    `);

  message.channel.send({ embeds: [embed] });
};
