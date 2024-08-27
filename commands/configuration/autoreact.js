const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "autoreact",
  category: 'configuration',
  description: "Permet de configurer l'autoréaction à chaque message",
  utilisation: "autoreact [emoji/clear]",
  permission: "ADMINISTRATOR"
};

exports.run = async (bot, message, args) => {
  const b = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}autoreact [emoji/clear]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const arg = args.join(" ");

  if (!arg) {
    return message.reply({ embeds: [b] });
  }

  const c = new EmbedBuilder()
    .setDescription(
      `Les réactions du salon <#${message.channel.id}> ont bien été supprimées`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const d = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `**<@${message.author.id}>, L'emoji n'est pas valide.\n **Utilisation:** \`${bot.prefix}autoreact [emoji/clear]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const e = new EmbedBuilder()
    .setDescription(
      `La réaction ${args[0]} a bien été sauvegardée !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (arg === 'clear') {
    bot.db.query(`DELETE FROM autoreact WHERE channelId = ${message.channel.id}`);
    message.channel.send({ embeds: [c] });
  } else {
    try {
      message.react(args[0]);
    } catch (e) {
      message.channel.send({ embeds: [d] });
    }
    bot.db.query(`INSERT INTO autoreact (guildId, channelId, emoji) VALUES ("${message.guild.id}", "${message.channel.id}", "${arg}")`);
    message.channel.send({ embeds: [e] });
  }
};
