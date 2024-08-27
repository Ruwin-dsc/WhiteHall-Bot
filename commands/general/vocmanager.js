const {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageCollector,
} = require("discord.js");

exports.help = {
  name: "vocmanager",
  category: "vocal",
  description: "Permet de configurer son salon vocale",
  utilisation: "vocmanager",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const vocalChannel = message.member.voice.channel;
  if (!vocalChannel) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${bot.emoji.deny}・Erreur`)
          .setDescription(
            `Vous devez être dans un salon vocale pour utiliser cette commande.`
          )
          .setColor(bot.color)
          .setFooter(bot.footer),
      ],
    });
  }

  const user = message.member;
  const vocalName = user.nickname || user.user.username;

  if (vocalChannel.name !== `🔊・${vocalName}`) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${bot.emoji.deny}・Erreur`)
          .setDescription(
            `Le nom du salon vocale où vous vous trouvez ne correspond pas à votre pseudo. Utiliser la commande \`${bot.prefix}tempvoc\` pour configurer les salons vocalaux personalisés.`
          )
          .setColor(bot.color)
          .setFooter(bot.footer),
      ],
    });
  }

  const row1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("lock")
      .setLabel("Lock")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("unlock")
      .setLabel("Unlock")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("hide")
      .setLabel("Hide")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("unhide")
      .setLabel("Unhide")
      .setStyle(ButtonStyle.Primary)
  );

  const row2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("mute")
      .setLabel("Mute")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("demute")
      .setLabel("Demute")
      .setStyle(ButtonStyle.Primary)
  );

  const row3 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("limit")
      .setLabel("Set Limit")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("disconnect")
      .setLabel("Disconnect")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("delete")
      .setLabel("Delete")
      .setStyle(ButtonStyle.Danger)
  );

  const embed = new EmbedBuilder()
    .setTitle(`Configuration de votre salon vocale`)
    .setDescription(`Salon vocale : **${vocalName}**`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const reply = await message.channel.send({
    embeds: [embed],
    components: [row1, row2, row3],
  });

  const filter = (interaction) => interaction.user.id === message.author.id;
  const collector = message.channel.createMessageComponentCollector({
    filter,
    time: 60000,
  });

  collector.on("collect", async (interaction) => {
    await interaction.deferUpdate();

    switch (interaction.customId) {
      case "lock":
        vocalChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
          Connect: false,
        });
        message.reply("Votre salon vocal est maintenant fermé !");
        break;
      case "unlock":
        vocalChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
          Connect: true,
        });
        message.reply("Votre salon vocal est maintenant ouverte !");
        break;
      case "hide":
        vocalChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
          ViewChannel: false,
        });
        message.reply("Votre salon vocal est maintenant cachée !");
        break;
      case "unhide":
        vocalChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
          ViewChannel: true,
        });
        message.reply("Votre salon vocal n'est plus cacher !");
        break;
      case "mute":
        vocalChannel.members.forEach((member) => {
          member.voice.setMute(true);
        });
        message.reply(
          "Tous les membres de votre salon vocal sont maintenant muet"
        );
        break;
      case "demute":
        vocalChannel.members.forEach((member) => {
          member.voice.setMute(false);
        });
        message.reply(
          "Tous les membres de votre salon vocal sont maintenant démute"
        );
        break;
      case "limit":
        const collectorLimit = new MessageCollector(message.channel, filter, {
          time: 30000,
        });
        message.channel
          .send(
            "Quelle est la limite de la vocal ? Merci de spécifier un nombre entre 1 et 99."
          )
          .then(() => {
            collectorLimit.on("collect", async (msg) => {
              const limit = parseInt(msg.content);
              if (!isNaN(limit) && limit >= 1 && limit <= 99) {
                vocalChannel.setUserLimit(limit);
                msg.reply(`La limite de la vocal a été définie sur ${limit}.`);
                collectorLimit.stop();
              } else {
                msg.reply(
                  "La limite de la vocal doit être un nombre entre 1 et 99. Réessayez."
                );
              }
            });

            collectorLimit.on("end", (collected) => {
              if (collected.size === 0) {
                message.channel.send(
                  "La configuration de la limite de la vocal a expiré. Réessayez."
                );
              }
            });
          });
        break;
      case "disconnect":
        vocalChannel.members.forEach((member) => {
          member.voice.disconnect();
        });
        message.reply(
          "Vous avez déconnecté tous les membres de votre vocal avec succès"
        );
        break;
      case "delete":
        vocalChannel.delete();
        message.reply("Votre vocale a été supprimée !");
        reply.delete();
        break;
      default:
        break;
    }
  });

  collector.on("end", () => {
    reply
      .edit({
        embeds: [embed],
        components: [],
      })
      .catch(() => false);
  });
};
