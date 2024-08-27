const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "addrole",
  category: "outils",
  utilisation: "addrole [utilisateur] [nom/id/mention du rôle]",
  permission: "MANAGE_ROLES",
  description: "Permet d'ajouter un rôle à un utilisateur", 
  aliases: ["addr"]
}

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}addrole [membre] [role]\``)
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
      .setDescription(`<@${message.author.id}>, tu ne peux pas ajouter ce rôle car il est au dessus de toi !`)
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
    await user.roles.add(role.id);
  } catch (error) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`Une erreur s'est produite lors de l'ajout du rôle. Assurez-vous que le rôle existe et que je dispose des permissions nécessaires.`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.channel.send({ embeds: [a] });
  }

  const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Ajout d'un rôle`)
    .setTimestamp()
    .setDescription(`${message.author} a ajouté le rôle ${role} (\`${role.id}\`) à ${user} (\`${user.id}\`).`)
    .setFooter(bot.footer);

  message.reply({ content: `${user}`, embeds: [log] });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; });
  });
}
