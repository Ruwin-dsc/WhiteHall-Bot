const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

exports.help = {
  name: "backup-delete",
  category: "backup",
  description: "Permet de supprimer une backup",
  utilisation: "backup-delete [id de la backup]",
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

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}backup-load [id de la backup]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  bot.db.query(
    `SELECT * FROM backup WHERE ownerId = "${message.author.id}"`,
    async (err, req) => {
      if (err) throw err;
      if (req.length < 1) return message.channel.send({ embeds: [prob] });
    }
  );

  const backupId = args[0];
  if (!backupId) return message.channel.send({ embeds: [nondef] });

  bot.db.query(
    `SELECT * FROM backup WHERE ownerId = "${message.author.id}" AND backupId = "${backupId}"`,
    async (err, req) => {
      if (err) throw err;
      if (req.length < 1) return message.channel.send({ embeds: [prob] });

      backup.remove(backupId);
      message
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
};
