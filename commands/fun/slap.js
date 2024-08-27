const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "slap",
  category: "funny",
  description: "Permet de taper une personne",
  utilisation: "slap [utilisateur] [text]",
  permission: "EVERYONE"
};

exports.run = async (bot, message, args) => {
  const b = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Utilisation de la commande`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}slap [utilisateur] [text]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);
    
  const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!Member) {
    return message.channel.send({ embeds: [b] });
  }
   
  const Other = args.slice(1).join(" ");
  if (!Other) {
    return message.reply({ embeds: [b] });
  }
  if (Other.length > 50) {
    return message.channel.send("Caractères limités à 50!");
  }

  const Embed = new EmbedBuilder()
    .setColor(bot.color)
    .setImage(encodeURI(`https://vacefron.nl/api/batmanslap?text1=Aie&text2=${Other}&batman=${message.author.avatarURL({ format: "png" })}&robin=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp()
    .setFooter(bot.footer);

  return message.channel.send({ embeds: [Embed] });
};
