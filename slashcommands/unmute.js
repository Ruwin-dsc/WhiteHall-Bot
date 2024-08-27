const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "unmute",
  description: "Permet de unmute une personne",
  permission: Discord.PermissionFlagsBits.MuteMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez unmute",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "identifiant",
      description: "L'identifiant du mute.",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const user = slashCommand.getUser("utilisateur");
    const idmute = slashCommand.getString("identifiant")

    const target = interaction.guild.members.cache.get(user.id);
  if (!target) {
    return interaction.reply({ content: `L'utilisateur n'est pas sur le serveur ou n'a pas été trouvé !`, ephemeral: true });
  }

  if (interaction.user.id === target.id) {
    return interaction.reply("Vous ne pouvez pas supprimer vos mutes");
  }
  if (interaction.guild.ownerId === target.id) {
    return interaction.reply("Vous ne pouvez pas supprimer les mutes du propriétaire du serveur");
  }
  if (
    (await interaction.guild.members.fetchMe()).roles.highest.comparePositionTo(target.roles.highest) <= 0
  ) {
    return interaction.reply("Le bot ne peut pas supprimer les mutes de ce membre");
  }
  
await target.timeout(null);
  bot.db.query(
    `SELECT * FROM mutes WHERE guild = "${interaction.guild.id}" AND user = "${target.id}" AND mute = '${idmute}'`,
    async (err, req) => {
      if (req.length < 1) {
        return interaction.reply("Aucun mute pour ce membre/ID du mute invalide");
      }

      bot.db.query(
        `DELETE FROM mutes WHERE guild = "${interaction.guild.id}" AND user = "${target.id}" AND mute = "${idmute}"`
      );
      interaction.reply(`Vous avez supprimé un mute du membre ${target}`);
    }
  );

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    const embed = new Discord.EmbedBuilder()
      .setTitle("**Unmute**")
      .setDescription(`<@${interaction.user.id}> a unmute ${target} dont l'id est ${idmute}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    channel.send({ embeds: [embed] });
  });

  }
}
