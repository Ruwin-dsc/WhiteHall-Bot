const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "8ball",
  category: "funny",
  description: 'Permet de poser une question à la boule magique',
  utilisation: '8ball [question]',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  if (!args[0]) {
    let b = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}8ball [question]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.reply({ embeds: [b] });
  }

  const responses = [
    "Non.",
    "Je te réponds plus tard...",
    "Peut-être.",
    "Possible.",
    "Je ne veux pas y répondre.",
    "Arrête de m'utiliser.",
    "Je dois aider les membres, non répondre à vos questions.",
    "Oui.",
    "Si je ne réponds pas à ta question, que vas-tu faire ? :)",
    "Désolé, je dois aller manger.",
  ];

  let embed = new EmbedBuilder()
    .setColor(bot.color)
    .addFields(
      { name: "Question:", value: args.join(" "), inline: false },
      { name: "Réponse:", value: responses[Math.floor(Math.random() * responses.length)], inline: false }
    )
    .setFooter(bot.footer)
    .setTimestamp();

  message.channel.send({ embeds: [embed] });
};
