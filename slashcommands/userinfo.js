const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Permet de voir les informations d'un utilisateur",
  permission: "Aucune",
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez voir les informations",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const userId = slashCommand.getUser("utilisateur").id;
    const member = interaction.guild.members.cache.get(userId)
    if(!member) {
      return interaction.reply({content: `L'utilisateur que vous avez renseigné n'existe pas ou n'est pas sur le serveur !`, ephemeral: true})
    }

    const url = await member.user
    .fetch()
    .then((user) =>
      user.bannerURL({ format: "png", dynamic: true, size: 4096 })
    );


  const Statusfilter = {
    online: `<a:mb_online:1199429829611753643> : En ligne`,
    idle: `<a:mb_idle:1199429939448008884> : Inactif`,
    dnd: `<a:off:1199430003100749844> : Ne pas déranger`,
    offline: `<a:mb_offline:1199430084063412235> : Invisible`,
  };

const activities = member.presence?.activities
  ?.map((x, i) => {
    if (x.type === "CUSTOM_STATUS") {
      return `${x.emoji ? x.emoji.toString() + "・" : ""}${x.state || "Aucune activité"}`;
    } else {
      let activityType = x.type;
      if (activityType === "LISTENING") {
        activityType = "Écoute";
      } else if (activityType === "WATCHING") {
        activityType = "Regarde";
      } else if (activityType === "PLAYING") {
        activityType = "Joue à";
      } else if (activityType === "STREAMING") {
        activityType = "Stream";
      }

      return `${x.emoji ? x.emoji.toString() + "・" : ""}${activityType} **${x.name}**`;
    }
  })
  .join("\n") || "Aucune";

  const clientType = [
    { name: "desktop", text: "Ordinateur", emoji: "💻" },
    { name: "mobile", text: "Téléphone", emoji: "📱" },
    { name: "web", text: "Site internet", emoji: "🌍" },
    { name: "offline", text: "Hors ligne", emoji: "💤" },
  ];
  const clientStatus =
    member.presence?.clientStatus instanceof Object
      ? Object.keys(member.presence.clientStatus)
      : "Hors ligne";

  const deviceFilter = clientType.filter((device) =>
    clientStatus.includes(device.name)
  );
  const devices = !Array.isArray(deviceFilter)
    ? new Array(deviceFilter)
    : deviceFilter;

  const activityType = [
    "🎮 Joue à",
    "🎙 Streame",
    "🎧 Ecoute",
    "📺 Regarde",
    "",
    "🏆 En compétition",
  ];
  let nitro;
  if (member.user.displayAvatarURL({ dynamic: true }).endsWith(".gif"))
    nitro = "<:Nitro:1199430185888526376>";

  if (!member) return;

  var flags = {
    Staff: "<:DiscordEmployee:1199421064871166182>",
    Partner: "<:PartneredServerOwner:1199421131443150928>",
    BugHunterLevel1: "<:BugHunterLevel1:1199421253900046427>",
    BugHunterLevel2: "<:BugHunterLevel2:1199421305666154657>",
    Hypesquad: "<:HypeSquadEvents:1199421362813550703>",
    HypeSquadOnlineHouse2: "<:HouseBrilliance:1199421566409252924>",
    HypeSquadOnlineHouse1: "<:HouseBravery:1199421620826157177>",
    HypeSquadOnlineHouse3: "<:HouseBalance:1199421518715826307>",
    PremiumEarlySupporter: "<:soutien:1199421467822149744>",
    VerifiedDeveloper: "<:EarlyVerifiedBotDeveloper:1199421418698457189>",
    ActiveDeveloper: "<:ActiveDeveloper:1199421675515691008>",
  };

  const userBadges = member.user.flags.toArray().map(badge => flags[badge]).join(' ') || 'Aucun'

  const embed = new EmbedBuilder()
    .setAuthor({
      name: `${member.user.username}`,
      iconURL: member.user.displayAvatarURL({ dynamic: true }),
    })
    .setColor(bot.color)
    .setImage(url || null)
    .setThumbnail(
      member.user.displayAvatarURL({
        dynamic: true,
        size: 512,
      })
    )
    .addFields(
      {
        name: "➔ Informations sur l'utilisateur",
        value: `
                    > **\`•\` Nom d'utilisateur :** ${member.user} \`${
          member.user.id
        }\`
                    > **\`•\` ID :** ${member.user.id}
                    > **\`•\` Robot :** ${member.user.bot ? "Oui" : "Non"}
                    > **\`•\` Badge :** ${userBadges} ${
          nitro || " "
        }
                    > **\`•\` Création de compte :** <t:${parseInt(
                      member.user.createdTimestamp / 1000
                    )}:f> (<t:${parseInt(
          member.user.createdTimestamp / 1000
        )}:R>)
                    > **\`•\` Appareil :** ${devices
                      .map((device) => `${device.emoji} ${device.text}`)
                      .join(", ")}
                    > **\`•\` Activité :** ${activities}
                    > **\`•\` Statut :** ${
                      Statusfilter[member.presence?.status]
                    }
                    `,
        inline: false,
      },
      {
        name: "➔ Informations sur le membre",
        value: `
                    > **\`•\` A rejoint le serveur le :** <t:${parseInt(
                      member.joinedTimestamp / 1000
                    )}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
                    > **\`•\` Boost le serveur :** ${
                      member.premiumSince ? "Oui" : "Non"
                    }
                    > **\`•\` Surnom :** ${
                      member.nickname ? member.nickname : "Aucun"
                    }
                                        `,
        inline: false,
      },
      {
        name: "<a:p_pokesparkles:1199409011435511889>",
        value: `> **\`•\` Rôles (${member.roles.cache.size}) :** ${
          member.roles.cache.map((role) => role).join(", ") || "Aucun"
        }`,
        inline: false,
      }
    )
    .setFooter(bot.footer);

  interaction.reply({ embeds: [embed] });

  }
}