const Discord = require('discord.js');

exports.help = {
  name: 'screenshot',
  category: 'image',
  description: "Permet de faire un screenshot",
  utilisation: "screenshot [lien]",
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  if (!args[0]) {
    const d = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Utilisation de la commande`)
      .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande.\n **Utilisation:** \`${bot.prefix}screenshot [lien]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);

    return message.reply({ embeds: [d] });
  }

  const link = args.join(" ");
  const screen = `https://api.popcat.xyz/screenshot?url=${link}`;

  const embed = new Discord.EmbedBuilder()
    .setDescription('*Si l\'image n\'apparaît pas, vérifiez que le lien est correct*')
    .setImage(screen)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [embed] });
};
