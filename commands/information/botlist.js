const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

exports.help = {
  name: "botlist",
  category: "infos",
  description: "Permet de voir la liste de tous les bots sur le serveur",
  utilisation: "botlist",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const bots = message.guild.members.cache
    .filter((m) => m.user.bot)
    .map((m) => `**${m.user.username}**:\`${m.user.id}\``);
  const pageSize = 10;
  const pageCount = Math.ceil(bots.length / pageSize);
  let currentPage = 0;

  if (pageCount === 0) {
    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setTitle(`Liste des bots (0 bots)`)
      .setDescription("*Aucun Bots*");

    return message.reply({ embeds: [embed] });
  }

  const generatePageEmbed = () => {
    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setTitle(`Liste des bots (${bots.length} bots)`)
      .setDescription(
        bots
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .join("\n")
      );

    return embed;
  };

  const embed = generatePageEmbed();
  const navigationRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("previous")
      .setStyle(ButtonStyle.Primary)
      .setLabel("Précédent")
      .setDisabled(currentPage === 0),
    new ButtonBuilder()
      .setCustomId("next")
      .setStyle(ButtonStyle.Primary)
      .setLabel("Suivant")
      .setDisabled(currentPage === pageCount - 1)
  );

  const response = await message.reply({
    embeds: [embed],
    components: [navigationRow],
  });

  const filter = (interaction) => interaction.user.id === message.author.id;
  const collector = response.createMessageComponentCollector({
    filter,
    time: 60000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.customId === "previous") {
      currentPage--;
    } else if (interaction.customId === "next") {
      currentPage++;
    }

    const newEmbed = generatePageEmbed();
    await interaction.update({ embeds: [newEmbed] });

    navigationRow.components[0].setDisabled(currentPage === 0);
    navigationRow.components[1].setDisabled(currentPage === pageCount - 1);
    await response.edit({ components: [navigationRow] });
  });

  collector.on("end", () => {
    navigationRow.components.forEach((component) =>
      component.setDisabled(true)
    );
    response.edit({ components: [navigationRow] });
  });
};
