const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

exports.help = {
  name: "backup-load",
  category: "backup",
  description: "Permet de télécharger une backup",
  utilisation: "backup-load [ID]",
  permission: "OWNER",
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

  const backupip = args[0];
  if (!backupip) return message.channel.send({ embeds: [nondef] });

  bot.db.query(
    `SELECT * FROM backup WHERE ownerId = "${message.author.id}" AND backupId = "${args[0]}"`,
    async (err, req) => {
      if (err) throw err;
      if (req.length < 1) return message.channel.send({ embeds: [prob] });
      let name = req[0].guildName;

      const slt = await message
        .reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `**${bot.emoji.snake} Chargement de la backup en cours...** Vous recevrez un message privé quand la backup sera fini.`
              )
              .setColor(bot.color)
              .setFooter(bot.footer),
          ],
        })
        .then(async (backupData) => {
          backup
            .load(backupip, message.guild)
            .catch(() =>
              slt
                .edit({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        `**${bot.emoji.deny} Impossible de charger la backup**`
                      )
                      .setColor(bot.color),
                  ],
                })
                .catch(() => false)
            );

          message.author
            .send({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`${bot.emoji.folder} Backup téléchargée`)
                  .setDescription(
                    `**La backup ${name} a bien été téléchargée** !`
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
