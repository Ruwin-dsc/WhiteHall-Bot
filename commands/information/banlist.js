const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

exports.help = {
  name: "banlist",
  category: "infos",
  description: "Permet de voir la liste des membres bannis",
  utilisation: "banlist",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const dEmbed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, le serveur ne comporte aucun membre banni.`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const bans = await message.guild.bans.fetch();
  const bannedMembers = bans
    .map((ban) => `**${ban.user.tag}**: \`${ban.user.id}\``)
    .join("\n");

  if (!bannedMembers) {
    return message.reply({ embeds: [dEmbed] });
  }

  const maxBannedMembersLength = 4096;
  if (bannedMembers.length > maxBannedMembersLength) {
    const pages = splitBannedMembersIntoPages(
      bannedMembers,
      maxBannedMembersLength
    );
    sendBannedMembersPages(message, pages);
  } else {
    const embed = new EmbedBuilder()
      .setTitle(`Liste des bannis`)
      .setDescription(bannedMembers)
      .setColor(bot.color)
      .setFooter(bot.footer)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};

function splitBannedMembersIntoPages(bannedMembers, maxBannedMembersLength) {
  const bannedMembersArray = bannedMembers.split("\n");
  const pages = [];

  let currentPage = [];
  for (const bannedMember of bannedMembersArray) {
    if (
      currentPage.join("\n").length + bannedMember.length <=
      maxBannedMembersLength
    ) {
      currentPage.push(bannedMember);
    } else {
      pages.push(currentPage);
      currentPage = [bannedMember];
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

async function sendBannedMembersPages(message, pages) {
  let currentPageIndex = 0;
  const maxPageIndex = pages.length - 1;

  const previousButton = new ButtonBuilder()
    .setCustomId("previous")
    .setLabel("<---")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(currentPageIndex === 0);

  const nextButton = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("--->")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(currentPageIndex === maxPageIndex);

  const buttonRow = new ActionRowBuilder().addComponents(
    previousButton,
    nextButton
  );

  const embed = createBannedMembersEmbed(pages[currentPageIndex]);

  const reply = await message.reply({
    embeds: [embed],
    components: [buttonRow],
  });

  const collector = reply.createMessageComponentCollector({
    componentType: "BUTTON",
    time: 60000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
      return interaction.reply({
        content:
          "Seul l'utilisateur qui a exécuté la commande peut interagir avec les boutons.",
        ephemeral: true,
      });
    }

    if (interaction.customId === "previous") {
      if (currentPageIndex > 0) {
        currentPageIndex--;
        await interaction.update({
          embeds: [createBannedMembersEmbed(pages[currentPageIndex])],
          components: [buttonRow],
        });
      }
    } else if (interaction.customId === "next") {
      if (currentPageIndex < maxPageIndex) {
        currentPageIndex++;
        await interaction.update({
          embeds: [createBannedMembersEmbed(pages[currentPageIndex])],
          components: [buttonRow],
        });
      }
    }
  });

  collector.on("end", () => {
    reply.edit({ components: [] });
  });
}

function createBannedMembersEmbed(page) {
  const embed = new EmbedBuilder()
    .setTitle(`Liste des bannis ${bannedMembers.length}`)
    .setDescription(page.join("\n"))
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setTimestamp();

  return embed;
}
