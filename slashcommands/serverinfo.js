const {
  EmbedBuilder
} = require("discord.js");
const moment = require("moment")

module.exports = {
  name: "serverinfo",
  description: "Permet de voir les informations du serveur",
  permission: "Aucune",
  dm: false,
 
  async run(bot, interaction, slashCommand) {
    const channels = interaction.guild.channels.cache;
    interaction.guild.owner = await interaction.guild
      .fetchOwner()
      .then((m) => m.user)
      .catch(() => {});
    let guild = interaction.guild;
    let embed = new EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL())
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setImage(guild.bannerURL({ size: 1024 })).setDescription(`
      ➔ **Informations sur le serveur**
      > \`•\` **Nom :** ${interaction.guild.name}
      > \`•\` **Description :** ${guild.description || "Aucune"}
      > \`•\` **ID :** ${guild.id}
      > \`•\` **Owner :** ${interaction.guild.owner}
      > \`•\` **Créé le :** ${moment
        .utc(interaction.guild.createdAt)
        .format("LLLL")}
      > \`•\` **URL :** https://discord.gg/${
        guild.vanityURLCode || "Shinetsu (aucun)"
      }
      ➔ **Statistiques du serveur**
      > \`•\` **Utilisateurs :** ${interaction.guild.memberCount}
      > \`•\` **Humains :** ${
        interaction.guild.members.cache.filter((m) => !m.user.bot).size
      }
      > \`•\` **Bots :** ${
        interaction.guild.members.cache.filter((m) => m.user.bot).size
      }
      > \`•\` **Salons textuels :** ${
        channels.filter((channel) => channel.type === "GUILD_TEXT").size
      }
      > \`•\` **Salons vocaux :** ${
        channels.filter((channel) => channel.type === "GUILD_VOICE").size
      }
      > \`•\` **Rôles :** ${interaction.guild.roles.cache.size} 
      > \`•\` **Plus haut rôle :** ${interaction.guild.roles.highest}
      > \`•\` **Emojis :** ${interaction.guild.emojis.cache.size}
      ➔ **Autres**
      > \`•\` **Boosts :** ${interaction.guild.premiumSubscriptionCount}
      > \`•\` **Boosters :** ${
        guild.members.cache.filter(
          (member) => member.roles.premiumSubscriberRole
        ).size
      }
      > \`•\` **Niveau de boost :** ${guild.premiumTier || "TIER_0"}
      > \`•\` **Niveau de vérification :** ${interaction.guild.verificationLevel}
      > \`•\` **Salon système :** ${interaction.guild.systemChannel || "Aucun"}
      > \`•\` **Salon règlement :** ${interaction.guild.rulesChannel || "Aucun"}
      > \`•\` **Partenaire :** ${interaction.guild.partnered || "Non"}
      > \`•\` **Vérifié :** ${interaction.guild.verified || "Non"}
      > \`•\` **Notifications :** ${interaction.guild.defaultMessageNotifications}
      > \`•\` **Salon AFK :** ${interaction.guild.afkChannel || "Aucun"}
      ➔ **Bannière**
    `);

    interaction.reply({ embeds: [embed] });
  }}