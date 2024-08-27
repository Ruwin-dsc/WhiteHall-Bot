const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: 'ban',
  category: 'moderation',
  description: 'Permet de bannir un utilisateur',
  utilisation: 'ban [Utilisateur] (raison)',
  permission: 'BAN_MEMBERS'
};

exports.run = async (bot, message, args, prefix) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}ban [utilisateur] (raison)\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let member;
  if (message.mentions.members.size > 0) {
    member = message.mentions.members.first();
  } else {
    member = await bot.users.fetch(args[0]).catch(() => {});
  }

  if (!member) return message.reply({ embeds: [nondef] });

  if (member.id === message.author.id || member.id === message.guild.ownerId || member.id === bot.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.channel.send({ embeds: [a] });
  }

  if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.channel.send({ embeds: [a] });
  }

  let reason = args.slice(1).join(" ") || `Aucune raison`;

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle('Membre Banni !')
    .setDescription(`Membre : ${member} \nBanni par : ${message.author} \nRaison : ${reason}`)
    .setTimestamp()
    .setFooter(bot.footer);

  member.send({ content: `Tu as été banni par ${message.author} pour la raison suivante:\n\n${reason}` }).catch(() => false);

  await message.guild.members.ban(member, { reason: reason })
    .then(() => message.reply({ embeds: [embed] }))
    .catch((error) => {
      console.error(error);
      const a = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`Une erreur s'est produite lors du bannissement. Assurez-vous que j'ai les permissions nécessaires et que l'utilisateur n'est pas supérieur à moi dans la hiérarchie des rôles.`)
        .setColor(bot.color)
        .setFooter(bot.footer);
      return message.channel.send({ embeds: [a] });
    });

  const logs = bot.db.get(`SELECT mods FROM logs WHERE guildID = "${message.guild.id}"`);
  if (logs && logs !== "off") {
    const logChannel = bot.channels.cache.get(logs);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setTitle(`**Bannissement**`)
        .setDescription(`<@${message.author.id}> a banni ${member} pour la raison ${reason}`)
        .setColor(bot.color)
        .setTimestamp()
        .setFooter(bot.footer);
      logChannel.send({ embeds: [logEmbed] });
    }
  }
}
