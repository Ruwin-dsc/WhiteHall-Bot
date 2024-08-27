const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "unwarn",
  description: "Permet d'enlever un avertissement à une personne",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez enlevé l'avertissement",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "identifiant",
      description: "L'identifiant de l'avertissement.",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const user = slashCommand.getUser("utilisateur");
    const id = slashCommand.getString("identifiant")

  if (user.id === interaction.user.id) {
    return interaction.reply("Tu ne peux pas te unwarn !");
  }
  bot.db.query(
    `SELECT * FROM warns WHERE guildID = "${interaction.guild.id}" AND userID = "${user.id}" AND warnID = '${id}'`,
    async (err, req) => {
      if (req.length < 1) {
        return interaction.reply("Aucun avertissement pour ce membre/ID du warn invalide");
      }

      bot.db.query(
        `DELETE FROM warns WHERE guildID = "${interaction.guild.id}" AND userID = "${user.id}" AND warnID = "${id}"`
      );
      interaction.reply(`Vous avez supprimé un avertissement du membre ${user}`);
    }
  );

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("**Unwarn**")
      .setDescription(`<@${interaction.user.id}> a unwarn ${user}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    channel.send({ embeds: [embed] });
  });


  }
}