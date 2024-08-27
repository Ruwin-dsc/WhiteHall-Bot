const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require("discord.js");
const Discord = require("discord.js")

exports.help = {
  name: "adminlist",
  category: "infos",
  description: "Permet de voir la liste des membres admin",
  utilisation: "adminlist",
  permission: "EVERYONE",
  aliases: ["listadmin"],
};

exports.run = async (bot, message, args) => {
  var filtre = message.guild.members.cache.filter(
    (member) =>
      member.permissions.has(Discord.PermissionFlagsBits.Administrator) &&
      !member.user.bot
  );
  const admins = filtre.map(
    (m, i) => `**${m.user.username}**: \`${m.user.id}\``
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(admins.length / itemsPerPage);
  let page = 1;

  const generateEmbed = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const currentAdmins = admins.slice(start, end);

    const embed = new EmbedBuilder()
      .setTitle(
        `Liste des administrateurs (Page ${page}/${totalPages}) (${admins.length})`
      )
      .setDescription(currentAdmins.join("\n"))
      .setColor(bot.color)
      .setFooter(bot.footer);

    return embed;
  };

  const previousButton = new ButtonBuilder()
    .setCustomId("previous")
    .setLabel("Précédent")
    .setStyle(ButtonStyle.Primary);

  const nextButton = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("Suivant")
    .setStyle(ButtonStyle.Primary);

  const buttonRow = new ActionRowBuilder().addComponents(
    previousButton,
    nextButton
  );

  const embedMessage = await message.reply({
    embeds: [generateEmbed(page)],
    components: [buttonRow],
  });

  const filter = (interaction) => interaction.user.id === message.author.id;
  const collector = embedMessage.createMessageComponentCollector({
    filter,
    time: 60000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.customId === "previous") {
      if (page > 1) {
        page--;
        await interaction.update({
          embeds: [generateEmbed(page)],
          components: [buttonRow],
        });
      }
    } else if (interaction.customId === "next") {
      if (page < totalPages) {
        page++;
        await interaction.update({
          embeds: [generateEmbed(page)],
          components: [buttonRow],
        });
      }
    }
  });

  collector.on("end", () => {
    embedMessage.edit({ components: [] });
  });
};
