const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "unbanall",
  description: "Permet de débannir tous utilisateurs bannis",
  permission: Discord.PermissionFlagsBits.BanMembers,
  dm: false,
  async run(bot, interaction, slashCommand) {

      const banwait = new EmbedBuilder()
  .setDescription(`<@${interaction.user.id}>, unban all en cours merci de patienter...`)
  .setColor(bot.color)
  .setFooter(bot.footer);

  const noban = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${interaction.user.id}>, Aucun utilisateur est banni`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  interaction.reply({ embeds: [banwait] }).then(async (msg) => {
    const bans = await interaction.guild.bans.fetch();

    if (bans.size === 0) {
      msg.edit({ embeds: [noban] });
    } else {
      bans.forEach((ban) => {
        interaction.guild.members.unban(ban.user.id);
      });

      const ban = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}>, J'ai débanis ${bans.size} membres avec succès !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

      msg.edit({ embeds: [ban] });
    }
  });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;
    if(channellogs == "off") return

    const log = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle('Unbanall')
      .setTimestamp()
      .setDescription(`${interaction.user} (\`${interaction.user.id}\`) a effectué unbanall !`)
      .setFooter(bot.footer);

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(console.error);
  });

  }
}