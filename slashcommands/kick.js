const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "kick",
  description: "Permet d'expulser une personne",
  permission: Discord.PermissionFlagsBits.KickMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez expulser",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "raison",
      description: "La raison de l'expulsement",
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
    const raison = slashCommand.getString("raison") !== null ? slashCommand.getString("raison") : "Aucune raison fournie"

    if (user.id === interaction.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas effectuer cette action sur toi même 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (user.id === interaction.guild.ownerId) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas effectuer cette action sur l'owner du serveur !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (user.id === bot.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas effectuer sur moi 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if(user.member && interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  await interaction.guild.members.kick(user, { reason: raison });
  await user.send(`
  Tu as été kick du serveur ${interaction.guild.name}, raison: ${raison}
  `)
  const kickembed = new EmbedBuilder()
  .setTitle(`Expulsement`)
  .setDescription(`Le membre ${user} a été kick du serveur.\nRaison : ${raison}\nPar : ${interaction.user.username}`)
  .setColor(bot.color)
  .setFooter(bot.footer)
  await interaction.reply({ embeds: [kickembed] });

    const embed = new EmbedBuilder()
      .setTitle(`**Kick**`)
      .setDescription(`<@${interaction.user.id}> a kick <@${user.id}> pour la raison: ${raison}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

      const logsQuery = await bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`);
      const channellogs = logsQuery[0]?.mods;
    
      if (channellogs) {
        bot.channels.cache.get(channellogs).send({ embeds: [embed] }).catch();
      }





  }
}