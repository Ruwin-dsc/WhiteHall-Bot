const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

exports.help = {
  name: "invitescrapper",
  description: "Permet d'avoir les informations d'un serveur à partir de l'url",
  utilisation: "invitescrapper [URL]",
  permission: "EVERYONE",
  category: "infos",
};

exports.run = async (bot, message, args) => {
  const d = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}invitesrapper [URL]`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  try {
    const url = args[0];
    const invite = await bot.fetchInvite(url);
    const server = invite.guild;

    const embed = new EmbedBuilder()
      .setTitle(`${server.name}`)
      .setColor(bot.color)
      .setFooter(bot.footer)

      .setThumbnail(
        server.iconURL({
          dynamic: true,
          size: 512,
        })
      )
      .setImage(server.bannerURL({ dynamic: true, size: 1024 }))
      .setDescription(`
        ➔ **Informations sur le serveur**
      > \`•\` **Nom :** ${server.name}
      > \`•\` **Description :** ${server.description || "Aucune"}
      > \`•\` **ID :** ${server.id}
      > \`•\` **Créé le :** ${moment.utc(server.createdAt).format("LLLL")}
      > \`•\` **URL :** https://discord.gg/${
        server.vanityURLCode || "whitehall (aucune)"
      }
      ➔ **Autres**
      > \`•\` **Boosts :** ${server.premiumSubscriptionCount}
      > \`•\` **Niveau de boost :** ${server.premiumTier || "TIER_0"}
      > \`•\` **Niveau de vérification :** ${server.verificationLevel}
      > \`•\` **Salon système :** ${server.systemChannel || "Aucun"}
      > \`•\` **Salon règlement :** ${server.rulesChannel || "Aucun"}
      > \`•\` **Partenaire :** ${server.partnered || "Non"}
      > \`•\` **Vérifié :** ${server.verified || "Non"}
      > \`•\` **Salon AFK :** ${server.afkChannel || "Aucun"}
      ➔ **Bannière**
        `);

    message.channel.send({ embeds: [embed] });
  } catch (error) {
    await message.channel.send({ embeds: [d] });
    console.log(error);
  }
};
