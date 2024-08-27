const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Discord = require("discord.js");

exports.help = {
  name: "prevname",
  description: "Affiche les surnoms d'un membre",
  permission: "MANAGE_MESSAGE",
  category: "général",
  utilisation: "prevname (membre/list)",
};

exports.run = async (bot, message, args) => {
  const noprevname = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`Il n'y a aucun prevname à supprimer !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const pastoi = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `Vous ne pouvez pas supprimer les prevnames d'un autre utilisateur !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);


  let user = message.mentions.users.first() || message.author || bot.users.cache.get(args[0])

  if (!user && args[0] !== "list") {
    return message.reply(
      `Impossible de trouver l'utilisateur spécifié.\n**Utilisation:** ${bot.prefix}prevname (membre/list)`
    );
  }
  if (args[0] == "list") {
    bot.db.query(`SELECT * FROM prevname`, async (err, req) => {
      const prevnamelist = new EmbedBuilder()
        .setTitle(`Liste des prevnames`)
        .setDescription(
          `\`${req.length}\` *utilisateurs enregistrés dans la db*`
        )
        .setColor(bot.color)
        .setFooter(bot.footer);

      return message.reply({ embeds: [prevnamelist] });
    });
  } else {

  const anyprevname = new EmbedBuilder()
    .setTitle(`Liste des anciens pseudos de ${user.username}`)
    .setDescription(`*Aucun prevname*`)
    .setFooter(bot.footer)
    .setColor(bot.color);

  bot.db.query(
    `SELECT * FROM prevname WHERE userID = '${user.id}'`,
    async (err, req) => {
      if (req.length < 1) {
        return message.reply({ embeds: [anyprevname] });
      }

      await req.sort((a, b) => parseInt(b.date) - parseInt(a.date));

      const embeds = [];
      let currentPage = 0;
      const itemsPerPage = 10;
      const totalPages = Math.ceil(req.length / itemsPerPage);

      for (let i = 0; i < req.length; i += itemsPerPage) {
        const embed = new EmbedBuilder()
          .setTitle(`Liste des anciens pseudos de ${user.username}`)
          .setColor(bot.color)
          .setTimestamp()
          .setFooter(bot.footer);

        let description = "";
        for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
          description += `<t:${Math.floor(parseInt(req[j].Date / 1000))}> - **${
            req[j].pseudo
          }**\n`;
        }

        embed.setDescription(description);
        embeds.push(embed);
      }

      const initialMessage = await message.reply({
        embeds: [embeds[currentPage]],
      });

      const previousButton = new ButtonBuilder()
        .setCustomId("prevname_previous")
        .setLabel("← Précédent")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true);

      const nextButton = new ButtonBuilder()
        .setCustomId("prevname_next")
        .setLabel("Suivant →")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true);

      const deleteButton = new ButtonBuilder()
        .setCustomId("prevname_delete")
        .setLabel("Supprimer tous les prevname")
        .setStyle(ButtonStyle.Danger);

      const buttonRow = new ActionRowBuilder().addComponents(
        previousButton,
        nextButton,
        deleteButton
      );

      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = initialMessage.createMessageComponentCollector({
        filter,
        time: 120000,
      });

      collector.on("collect", (interaction) => {
        if (interaction.customId === "prevname_previous") {
          if (currentPage > 0) {
            currentPage--;
            previousButton.setDisabled(currentPage === 0);
            nextButton.setDisabled(false);
            interaction.update({
              embeds: [embeds[currentPage]],
              components: [buttonRow],
            });
          }
        } else if (interaction.customId === "prevname_next") {
          if (currentPage < totalPages - 1) {
            currentPage++;
            previousButton.setDisabled(false);
            nextButton.setDisabled(currentPage === totalPages - 1);
            interaction.update({
              embeds: [embeds[currentPage]],
              components: [buttonRow],
            });
          }
        } else if (interaction.customId === "prevname_delete") {
          bot.db.query(
            `SELECT * FROM prevname WHERE userID = '${user.id}'`,
            async (err, req) => {
              if (req.length < 1) {
                return interaction.reply({ embeds: [noprevname] });
              }

              if (message.author.id !== user.id) {
                return interaction.reply({ embeds: [pastoi] });
              }
              bot.db.query(
                `DELETE FROM prevname WHERE userID = '${user.id}'`,
              );

              const success = new EmbedBuilder()
                .setTitle(`${bot.emoji.success}・Succès`)
                .setDescription(
                  `${req.length} pseudos ont été supprimés avec succès !`
                )
                .setColor(bot.color)
                .setFooter(bot.footer);

              interaction.reply({ embeds: [success] });
              interaction.update({
                embeds: [anyprevname],
                components: [buttonRow],
              });
            }
          );
        }
      });

      if (totalPages > 1) {
        nextButton.setDisabled(false);
        deleteButton.setDisabled(false);
      }

      initialMessage.edit({ components: [buttonRow] });
    }
  );}
};
