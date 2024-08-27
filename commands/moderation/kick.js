const { EmbedBuilder } = require('discord.js');
const kick = require('../../slashcommands/kick');

exports.help = {
  name: "kick",
  category: 'moderation',
  description: 'Permet d\'expulser un membre du serveur',
  utilisation: 'kick [utilisateur] (raison)',
  permission: 'KICK_MEMBERS'
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}kick [utilisateur] (raison)\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let user = message.mentions.users.first() || await message.guild.users.cache.get(args[0]);
  let raison = args.slice(1).join(" ");

  if (!user) return message.channel.send({ embeds: [nondef] });
  if (!raison) raison = "Aucune raison donnée";

if (user.id === message.author.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer cette action sur toi même 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  if (user.id === message.guild.ownerId) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer cette action sur l'owner du serveur !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  if (user.id === bot.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer sur moi 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  if(user.member && message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  await message.guild.members.kick(user, { reason: raison });
   const kickembed = new EmbedBuilder()
  .setTitle(`Expulsement`)
  .setDescription(`Le membre ${user} a été kick du serveur.\nRaison : ${raison}\nPar : ${message.author.username}`)
  .setColor(bot.color)
  .setFooter(bot.footer)
  await user.send({embeds: [kickembed]})
  await message.channel.send(`Le membre ${user} a été kick du serveur.\nRaison : ${raison}\nPar : ${message.author.username}`);

    const embed = new EmbedBuilder()
      .setTitle(`**Kick**`)
      .setDescription(`<@${message.author.id}> a kick <@${user.id}> pour la raison: ${raison}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

      const logsQuery = await bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`);
      const channellogs = logsQuery[0]?.mods;
    
      if (channellogs) {
        bot.channels.cache.get(channellogs).send({ embeds: [embed] }).catch();
      }
}
