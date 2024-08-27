const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "backup-list",
  category: "backup",
  description: "Permet de voir la liste des backups",
  utilisation: "backup-list",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const prob = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, vous n'avez pas de Backup ou la backup recherchée n'existe pas !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  bot.db.query(
    `SELECT * FROM backup WHERE ownerId = "${message.author.id}"`,
    async (err, req) => {
      if (err) throw err;
      if (req.length < 1) return message.channel.send({ embeds: [prob] });

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

      message.channel.send({ embeds: [embed] }).catch(() => false);
    }
  );
};
