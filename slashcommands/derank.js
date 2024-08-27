const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "derank",
  description: "Permet de derank une personne",
  permission: Discord.PermissionFlagsBits.BanMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez derank",
      required: true,
      autocomplete: true,
    }
  ],

  async run(bot, interaction, slashCommand) {
    const d = slashCommand.getUser("utilisateur");

    const user = await interaction.guild.members.cache.get(d.id);
  if (!user) {
    const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`**<@${interaction.user.id}>, l'utilisateur que vous avez spécifier est invalide ou il n'est pas sur le serveur !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
    return interaction.reply({ embeds: [nondef] });
  }

  if (user.id === interaction.user.id) {
   const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas subir toi même cette action 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (user.id === interaction.guild.ownerId) {
        const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas faire cette action sur l'owner du serveur !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (user.roles.highest.position > bot.user.id) {
    return interaction.reply({ content: `Je n'ai pas les permissions nécessaires pour **derank** <@${user.id}>` });
  }

  if(user.member && interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

            

  user.roles.set([], `Derank par ${interaction.user.username}`);

  const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Derank`)
    .setTimestamp()
    .setDescription(`**Derank**: ${user}\n**Auteur**: ${interaction.user}`)
    .setFooter(bot.footer);

  const logsQuery = await bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`);
  const channellogs = logsQuery[0]?.mods;

  if (channellogs) {
    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch();
  }


  const success = new EmbedBuilder()
  .setDescription(`J'ai dérank ${user}.`)
  .setColor(bot.color)
  .setFooter(bot.footer)
  
  interaction.reply({ embeds: [success] });


  }}
    
