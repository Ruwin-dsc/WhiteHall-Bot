const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

exports.help = {
  name: "backup-info",
  category: "backup",
  description: "Permet de voir les informations d'une backup",
  utilisation: "backup-info [ID]",
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
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}backup-load [ID]\``
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

      backup.fetch(backupId).then((backupInfos) => {
        message.channel
          .send({
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: `${backupInfos.data.name}`,
                  iconURL: `${backupInfos.data.iconURL}`,
                })
                .setDescription(
                  `**Voici les informations de la backup**\n\n**ID: \`${
                    backupInfos.id
                  }\`**\n**ID du serveur: \`${
                    backupInfos.data.guildID
                  }\`**\n**Taille: \`${
                    backupInfos.size
                  } MB\`**\n**Nom du serveur: \`${
                    backupInfos.data.name
                  }\`**\n**Backup créé le: <t:${Math.round(
                    backupInfos.data.createdTimestamp / 1000
                  )}>**`
                )
                .setColor(bot.color)
                .setFooter(bot.footer),
            ],
          })
          .catch(() => false);
      });
    }
  );
};