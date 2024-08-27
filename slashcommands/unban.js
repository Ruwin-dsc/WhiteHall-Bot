const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "unban",
  description: "Permet de débannir une personne",
  permission: Discord.PermissionFlagsBits.BanMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez débannir",
      required: true,
      autocomplete: true,
    }
  ],

  async run(bot, interaction, slashCommand) {
    const d = slashCommand.getUser("utilisateur");
    const user = bot.users.fetch(d.id).catch(err => {})
    
    if(!user) {
        const a = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`Je n'ai pas réussi à trouver cette utilisateur !`)
        .setColor(bot.color)
        .setFooter(bot.footer)

        interaction.reply({embeds: [a], ephemeral: true})
    }

       interaction.guild.members.unban(d.id)
        .then(() => {
          const embed = new EmbedBuilder()
          .setTitle(`Utilisateur débanis`)
          .setDescription(`${d} a été débannis avec succès !`)
          .setColor(bot.color)
          .setFooter(bot.footer)
          interaction.reply({
            embeds: [embed]
          })
        })
        .catch(() => {
          const embed = new EmbedBuilder()
          .setTitle(`${bot.emoji.deny}・Erreur`)
          .setDescription(`${d} cette utilisateur n'est pas bannis !`)
          .setColor(bot.color)
          .setFooter(bot.footer)
          interaction.reply({
            embeds: [embed]
          })
        })


  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    const log = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle('Débannissement')
      .setTimestamp()
      .setDescription(`${interaction.user} (\`${interaction.user.id}\`) a débanni ${d} (${d.id}) !`)
      .setFooter(bot.footer);

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(err => {});
  });


  }
}