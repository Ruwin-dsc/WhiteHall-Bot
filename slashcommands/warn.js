const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "warn",
  description: "Permet d'avertir une personne",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez avertir",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "raison",
      description: "La raison de l'avertisseme,t",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const d = slashCommand.getUser("utilisateur");
    if(!d) {
        const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, L'utilisateur est invalide !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a], ephemeral: true});
    }
    const user = await interaction.guild.members.fetch(d.id);
    if(!user) return interaction.reply({ content: `L'utilisateur n'est pas sur le serveur !`, ephemeral: true})
    const reason = slashCommand.getString("raison") !== null ? slashCommand.getString("raison") : "Aucune raison fournie"

    try {
    await user.send(
      `${interaction.user.username} vous a warn sur le serveur ${interaction.guild.name} pour la raison : \`${reason}\` :scream:!`
    );
  } catch (err) {}

  await interaction.reply(`Vous avez warn <@${user.id}> pour la raison : \`${reason}\` avec succès !`);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("**Warn**")
      .setDescription(`<@${interaction.user.id}> a warn ${user} pour la raison ${reason}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    channel.send({ embeds: [embed] });
  });

  let ID = await bot.function.createID("WARN");

  bot.db.query(
    `INSERT INTO warns (guildID, userID, authorID, warnID, reason, date) VALUES ('${interaction.guild.id}', '${user.id}', '${interaction.user.id}', '${ID}', '${reason.replace(
      /'/g,
      "\\'"
    )}', '${Date.now()}')`
  );

}
}