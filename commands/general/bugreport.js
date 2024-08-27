const Discord = require("discord.js");
const webhookClient = new Discord.WebhookClient({
  id: "1199419098963136622",
  token: "Bx7FvGuLUZj0miVYMthJ5PWeR_IrwwJu_72yYanJrFkck1yalp5i0J0sKs-86fvyKI28",
});

exports.help = {
  name: "bugreport",
  category: "général",
  description: "Permet d'avertir au owner du bot un bug",
  utilisation: "bugreport [bug]",
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const member = message.member;

  let d = new Discord.EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}bug [BUG]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const query = args.join(" ");
  if (!query) return message.reply({ embeds: [d] });
  const reportEmbed = new Discord.EmbedBuilder()
    .setTitle("__**Report Bug**__")
    .setDescription(
      `**Membre :**\n> ${member.user.username} \n**Bug :**\n > ${query}`
    )
    .setFooter({ text: `ID de l'utilisateur: ${member.user.id}` })
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(bot.color);

  message.channel.send({
    content: "Merci pour votre report ! Cela a été envoyé avec succès !!!",
  });
  webhookClient.send({ embeds: [reportEmbed] });
};
