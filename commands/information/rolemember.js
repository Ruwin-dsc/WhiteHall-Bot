const {
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");

exports.help = {
  name: "rolemember",
  description: "Affiche les membres qui ont un certain rôle",
  utilisation: "rolemember <nom ou id ou mention du rôle>",
  permission: "MANAGE_ROLE",
  category: "infos",
};

exports.run = async (bot, message, args, prefix) => {
  const reas = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les rôles\` !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!message.member.permissions.has("MANAGE_ROLES"))
    return message.channel.send({ embeds: [reas] });

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}rolemember [role]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) {
    return message.channel.send({ embeds: [nondef] });
  }

  const role =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find((role) => role.name === args[0]);

  if (!role) {
    return message.channel.send({ embeds: [nondef] });
  }

  const members = role.members.map(
    (member) => `**<@${member.id}>**: \`${member.id}\``
  );

  const maxPerPage = 10;
  const numPages = Math.ceil(members.length / maxPerPage);

  let page = 0;
  const generateEmbed = (page) => {
    const start = page * maxPerPage;
    const end = (page + 1) * maxPerPage;

    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Membres avec le rôle ${role.name}`)
      .setDescription(members.slice(start, end).join("\n"))
      .setFooter(bot.footer);

    return embed;
  };

  const embed = generateEmbed(page);

  const previousButton = new ButtonBuilder()
    .setCustomId("previous_page")
    .setLabel("Précédent")
    .setStyle(ButtonStyle.Primary);

  const nextButton = new ButtonBuilder()
    .setCustomId("next_page")
    .setLabel("Suivant")
    .setStyle(ButtonStyle.Primary);

  const menuOptions = [];
  for (let i = 1; i <= numPages; i++) {
    menuOptions.push({ label: i.toString(), value: i.toString() });
  }

  const row = new ActionRowBuilder().addComponents(previousButton, nextButton);

  const msg = await message.channel.send({
    embeds: [embed],
    components: [row],
  });

  const filter = (i) => i.user.id === message.author.id;

  const collector = msg.createMessageComponentCollector({ filter });

  collector.on("collect", async (i) => {
    if (i.customId === "page_select") {
      const selectedPage = parseInt(i.values[0]) - 1;
      if (selectedPage >= 0 && selectedPage < numPages) {
        page = selectedPage;
        const newEmbed = generateEmbed(page);
        selectMenu.setPlaceholder(`Page ${page + 1}/${numPages}`);
        i.update({ embeds: [newEmbed], components: [row] });
      }
    } else if (i.customId === "previous_page") {
      page--;
      const newEmbed = generateEmbed(page);
      if (page === 0) previousButton.setDisabled(true);
      nextButton.setDisabled(false);
      i.update({ embeds: [newEmbed], components: [row] });
    } else if (i.customId === "next_page") {
      page++;
      const newEmbed = generateEmbed(page);
      if (page === numPages - 1) nextButton.setDisabled(true);
      previousButton.setDisabled(false);
      i.update({ embeds: [newEmbed], components: [row] });
    }
  });
};
