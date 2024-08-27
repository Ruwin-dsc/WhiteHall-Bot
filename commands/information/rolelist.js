const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

exports.help = {
  name: "rolelist",
  category: "infos",
  description: "Permet de voir la liste de tous les rôles",
  utilisation: "rolelist",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  let i0 = 0;
  let i1 = 10;
  let page = 1;

  const description = message.guild.roles.cache
    .map((r, i) => `${r} \`${r.id}\` \`(${r.members.size} Membres)\``)
    .slice(i0, i1)
    .join("\n");

  const embed = new EmbedBuilder()
    .setTitle(`Liste des rôles (${message.guild.roles.cache.size})`)
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setDescription(description);

  const previousButton = new ButtonBuilder()
    .setLabel("Précédent")
    .setStyle(ButtonStyle.Success)
    .setCustomId("previous_role");

  const nextButton = new ButtonBuilder()
    .setLabel("Suivant")
    .setStyle(ButtonStyle.Success)
    .setCustomId("next_role");

  const pagesRow = new ActionRowBuilder().addComponents(
    previousButton,
    nextButton
  );

  if (message.guild.roles.cache.size < 10) {
    return message.channel.send({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          previousButton.setDisabled(true),
          nextButton.setDisabled(true)
        ),
      ],
    });
  }

  const msg = await message.channel.send({
    embeds: [embed],
    components: [pagesRow],
  });

  const filter = (i) => i.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter });

  collector.on("collect", async (i) => {
    i.deferUpdate();

    if (i.customId === "previous_role") {
      i0 = Math.max(0, i0 - 10);
      i1 = Math.max(10, i1 - 10);
      page = Math.max(1, page - 1);

      if (i0 === 0) {
        previousButton.setDisabled(true);
      }

      const newDescription = message.guild.roles.cache
        .map((r, i) => `${r} \`${r.id}\` (${r.members.size} Membres)\``)
        .slice(i0, i1)
        .join("\n");

      embed.setFooter(bot.footer).setDescription(newDescription);

      msg.edit({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(previousButton, nextButton),
        ],
      });
    }

    if (i.customId === "next_role") {
      i0 = Math.min(message.guild.roles.cache.size - 10, i0 + 10);
      i1 = Math.min(message.guild.roles.cache.size, i1 + 10);
      page = Math.min(Math.ceil(message.guild.roles.cache.size / 10), page + 1);

      if (i1 >= message.guild.roles.cache.size) {
        nextButton.setDisabled(true);
      }

      const newDescription = message.guild.roles.cache
        .map((r, i) => `${r} \`${r.id}\` \`(${r.members.size} Members)\``)
        .slice(i0, i1)
        .join("\n");

      embed.setFooter(bot.footer).setDescription(newDescription);

      msg.edit({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(previousButton, nextButton),
        ],
      });
    }
  });
};
