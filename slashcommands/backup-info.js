const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

module.exports = {
  name: "backup-info",
  description: "Permet de voir les informations d'une backup",
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
          if (req.length < 1) return interaction.channel.send({ embeds: [prob] });
        }
      );

      const backupId = slashCommand.get("Identifiant").value;

      bot.db.query(
        `SELECT * FROM backup WHERE ownerId = "${interaction.user.id}" AND backupId = "${backupId}"`,
        async (err, req) => {
          if (err) throw err;
          if (req.length < 1) return interaction.channel.send({ embeds: [prob] });

          backup.fetch(backupId).then((backupInfos) => {
            interaction.channel
              .send({
                embeds: [
                  new EmbedBuilder()
                    .setuser({
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

  }}