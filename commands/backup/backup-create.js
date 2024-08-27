const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

exports.help = {
  name: "backup-create",
  category: "backup",
  description: "Permet de créer une backup",
  utilisation: "backup-create",
  permission: "OWNER",
};

exports.run = async (bot, message, args) => {

  const es = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, vous n'avez plus de place pour créé une backup faîtes la commande \`${bot.prefix}backup-delete\`pour en retirer !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const prob = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, Je n'ai pas pu créé la backup, je n'ai sûrement pas les permissions nécessaires...`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  bot.db.query(
    `SELECT * FROM backup WHERE ownerId = "${message.author.id}"`,
    async (err, req) => {
      if (err) throw err;
      if (req.length >= 5) return message.channel.send({ embeds: [es] });
    }
  );

  const basemessage = await message
    .reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**${bot.emoji.snake} Création de la backup en cours...** Vous allez recevoir un message privé quand la création sera terminée`
          )
          .setColor(bot.color)
          .setFooter(bot.footer),
      ],
    })
    .catch(() => false);

  backup
    .create(message.guild, { maxMessagesPerChannel: 5 })
    .then(async (backupData) => {
      message.author
        .send({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${bot.emoji.snake} Backup créée`)
              .setDescription(
                `**La backup ${message.guild.name} a bien été créée avec l'id ** \`${backupData.id}\` **!**\n\n**Voici comment l'utiliser:**\n\`\`\`${bot.prefix}backup-info ${backupData.id}\`\`\`\n\`\`\`${bot.prefix}backup-load ${backupData.id}\`\`\``
              )
              .setColor(bot.color)
              .setFooter(bot.footer),
          ],
        })
        .catch(() => false);

      bot.db.query(
        `INSERT INTO backup (ownerId, backupId, guildName) VALUES ("${message.author.id}", "${backupData.id}", "${message.guild.name}")`
      );
    })
    .catch((e) =>
      basemessage.edit({ embeds: [prob], content: `${e}` }).catch(() => false)
    );
};
