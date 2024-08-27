const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "backup-list",
  description: "Permet de voir la list de vos backups",
  permission: "Aucune",
  dm: true,

  async run(bot, interaction, slashCommand) {

    const prob = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(
        `<@${interaction.user.id}>, vous n'avez pas de Backup ou la backup recherchée n'existe pas !`
      )
      .setColor(bot.color)
      .setFooter(bot.footer);

    bot.db.query(
      `SELECT * FROM backup WHERE ownerId = "${interaction.user.id}"`,
      async (err, req) => {
        if (err) throw err;
        if (req.length < 1) return interaction.reply({ embeds: [prob] });

        const backupsList = req
          .map(
            (backupData, index) =>
              `> Backup n°${index + 1}: ${backupData.guildName} - \`${
                backupData.backupId
              }\``
          )
          .join("\n");

        const embed = new EmbedBuilder()
          .setTitle(`${bot.emoji.folder}・Liste des backups`)
          .setDescription(backupsList)
          .setColor(bot.color)
          .setFooter(bot.footer);

        interaction.reply({ embeds: [embed] }).catch(() => false);
      }
    );

  }}