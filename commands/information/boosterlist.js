const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");

exports.help = {
  name: "boosterlist",
  description: "Permet de voir les boosters du serveur",
  category: "infos",
  utilisation: "boosterlist",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const boosters = message.guild.members.cache
    .filter((member) => member.premiumSince)
    .map((m) => `**${m.user.username}**:\`${m.user.id}\``);
  const pageSize = 10;
  const pageCount = Math.ceil(boosters.length / pageSize);
  let currentPage = 0;

  if (pageCount === 0) {
    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setTitle(
        `Liste des boosters ${bot.emoji.crystalball} (${message.guild.premiumSubscriptionCount} boosts) (0 boosters)`
      )
      .setDescription("*Aucun utilisateur booster*");

    return message.reply({ embeds: [embed] });
  }

  const generatePageEmbed = () => {
    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setTitle(
        `Liste des boosters ${bot.emoji.crystalball} (${message.guild.premiumSubscriptionCount} boosts) (${boosters.length} boosters)`
      )
      .setDescription(
        boosters
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
