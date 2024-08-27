const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "warnlist",
  description: "Affiche les warns d'un membre",
  permission: "MANAGE_MESSAGES",
  category: "moderations",
  utilisation: "warnlist [membre]",
};

exports.run = async (bot, message, args, db) => {
  const reas = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Permission manquante`)
    .setDescription(
      `<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les messages\` !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    return message.channel.send({ embeds: [reas] });
  }

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Permission manquante`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}warnlist [membre]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  let user;
  if (args.length >= 1) {
    user = message.mentions.users.first() || (await bot.users.fetch(args[0]));
    if (!user) return message.reply({ embeds: [nondef] });
  } else {
    user = message.author;
  }

  bot.db.query(`SELECT * FROM warns WHERE guildID = '${message.guildId}' AND userID = '${user.id}'`, async (err, req) => {

  

  if (req.length < 1) {
    return message.reply("Ce membre n'a pas de warns !");
  }

  req.sort((a, b) => parseInt(b.date) - parseInt(a.date));

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Warns de ${user.tag}`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(bot.footer);

    req.forEach((warn, index) => {
    const author = bot.users.cache.get(warn.authorID) || { tag: "Inconnu" };
    

    embed.addFields([
      {
        name: `Warn n°${index + 1}`,
        value: `> **Auteur** : ${author.tag}\n> **ID** : \`${warn.warnID}\`\n> **Date** : <t:${Math.floor(warn.date / 1000)}>\n> **Raison** : ${warn.reason}`,
      },
    ]);
  });

  message.reply({ embeds: [embed] });
});
};
