const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "removerole",
  category: "outils",
  description: "Permet de retirer le rôle d'un membre",
  utilisation: "removerole [membre] [nom/mention/id du rôle]",
  permission: "MANAGE_ROLES"
}

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n\n**Utilisation:** \`${bot.prefix}removerole [membre] [role]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.slice(1).join(' ')) || message.guild.roles.cache.get(args[1]);

  if (!user || !role) {
    return message.reply({ embeds: [nondef] });
  }

 if (role.position >= message.member.roles.highest.position){
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas retirer ce rôle car il est au dessus de toi !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.channel.send({ embeds: [a] });
  }
            
  if(user.member && message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }
            

  try {
    await user.roles.remove(role.id);
    const successEmbed = new EmbedBuilder()
      .setDescription(`${user} a été retiré de ce rôle : ${role}.`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    message.reply({ embeds: [successEmbed] });
  } catch (error) {
    const errorEmbed = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription("Impossible de retirer ce rôle à ce membre")
      .setColor(bot.color)
      .setFooter(bot.footer);
    message.reply({ embeds: [errorEmbed] });
  }
}
