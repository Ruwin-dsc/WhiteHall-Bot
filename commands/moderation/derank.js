const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: 'derank',
  category: 'moderation',
  description: 'Permet de retirer tous les rôles d\'un membre',
  utilisation: "derank [utilisateur]",
  permission: "MANAGE_ROLES"
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`**<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}derank [membre]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) {
    return message.channel.send({ embeds: [nondef] });
  }

  const user = message.mentions.members.first() || await message.guild.members.cache.get(args[0]);
  if (!user) {
    return message.channel.send({ embeds: [nondef] });
  }

  if (user.id === message.author.id) {
    return message.channel.send({ embeds: [nondef] });
  }

  if (user.roles.highest.position > bot.user.id) {
    return message.channel.send({ content: `Je n'ai pas les permissions nécessaires pour **derank** <@${user.id}>` });
  }

  if(user.member && message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }
            
            
            

  user.roles.set([], `Derank par ${message.author.tag}`);

  const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Derank`)
    .setTimestamp()
    .setDescription(`**Derank**: ${user}\n**Auteur**: ${message.author}`)
    .setFooter(bot.footer);

  const logsQuery = await bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`);
  const channellogs = logsQuery[0]?.mods;

  if (channellogs) {
    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch();
  }


  const success = new EmbedBuilder()
  .setDescription(`J'ai dérank ${user}.`)
  .setColor(bot.color)
  .setFooter(bot.footer)
  
  message.channel.send({ embeds: [success] });
};