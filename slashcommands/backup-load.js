const { EmbedBuilder } = require("discord.js");
const backup = require("discord-backup");

module.exports = {
  name: "backup-load",
  description: "Permet de charger une backup",
  permission: "Aucune",
  dm: false,
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

const reas = new EmbedBuilder()
  .setTitle(`${bot.emoji.deny}・Erreur`)
  .setDescription(
    `<@${interaction.user.id}>, pour utiliser cette commande tu dois avoir la permission \`OWNER\` !`
  )
  .setColor(bot.color)
  .setFooter(bot.footer);
if (interaction.user.id != interaction.guild.ownerId)
  return interaction.reply({ embeds: [reas] });

const prob = new EmbedBuilder()
  .setTitle(`${bot.emoji.deny}・Erreur`)
  .setDescription(
    `<@${interaction.user.id}>, vous n'avez pas de Backup ou la backup recherchée n'existe pas !`
  )
  .setColor(bot.color)
  .setFooter(bot.footer);

const nondef = new EmbedBuilder()
  .setTitle(`${bot.emoji.deny}・Erreur`)
  .setDescription(
    `<@${interaction.user.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}backup-load [ID]\``
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

const backupip = args[0];
if (!backupip) return interaction.reply({ embeds: [nondef] });

bot.db.query(
  `SELECT * FROM backup WHERE ownerId = "${interaction.user.id}" AND backupId = "${args[0]}"`,
  async (err, req) => {
    if (err) throw err;
    if (req.length < 1) return interaction.reply({ embeds: [prob] });
    let name = req[0].guildName;

    const slt = await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `**${bot.emoji.snake} Chargement de la backup en cours...** Vous recevrez un interaction privé quand la backup sera fini.`
            )
            .setColor(bot.color)
            .setFooter(bot.footer),
        ],
      })
      .then(async (backupData) => {
        backup.load(backupip, interaction.guild).catch(() =>
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

        interaction.user
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

  }}

