const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "banner",
  category: "infos",
  description: "Permet de voir la bannière d'une personne",
  utilisation: "banner (membre)",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
 
  const ddEmbed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, n'a pas de bannière`)
    .setColor(bot.color)
    .setFooter(bot.footer);
    
const nousers = new EmbedBuilder()
  .setTitle(`${bot.emoji.deny}・Erreur`)
  .setDescription(
    `<@${message.author.id}>, merci de mentionner un utilisateur valide, il se peut que l'utilisateur n'a pas de serveur en commun avec le bot !`
  )
  .setColor(bot.color)
  .setFooter(bot.footer);

let member;
if (message.mentions.members.first()) {
  member = message.mentions.members.first().user;
} else if (args[0]) {
  member = await bot.users.cache.get(args[0]);
} else {
  member = message.author;
}

if (!member)
  return message.reply({
    embeds: [nousers],
  });

  const url = await member
    .fetch()
    .then((user) =>
      user.bannerURL({ format: "png", dynamic: true, size: 4096 })
    );

  if (!url) return message.reply({ embeds: [ddEmbed] });
  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(member.username)
    .setImage(url)
    .setTimestamp()
    .setFooter(bot.footer);

  message.reply({ embeds: [embed] });
};
