const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

module.exports = {
  name: "backup-delete",
  description: "Permet de supprimer une backup",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "string",
      name: "identifiant",
      description: "Identifiant de la backup",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const backupId = slashCommand.get("identifiant").value;
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
    }
  );

  bot.db.query(
    `SELECT * FROM backup WHERE ownerId = "${interaction.user.id}" AND backupId = "${backupId}"`,
    async (err, req) => {
      if (err) throw err;
      if (req.length < 1) return interaction.reply({ embeds: [prob] });

      backup.remove(backupId);
      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `**${bot.emoji.snake} La backup avec l'id \`${backupId}\` a été supprimée**`
              )
              .setColor(bot.color)
              .setFooter(bot.footer),
          ],
        })
        .catch(() => false);

      bot.db.query(`DELETE FROM backup WHERE backupId = ${backupId}`);
    }
  );
  },
};
