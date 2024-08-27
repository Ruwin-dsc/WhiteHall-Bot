const Discord = require("discord.js");
const figlet = require("figlet");

exports.help = {
  name: "ascii",
  category: "funny",
  utilisation: "ascii [text]",
  description: "Permet de mettre votre texte en ascii",
  permission: "EVERYONE"
};

exports.run = async (bot, message, args) => {
  let text = args.join(" ");
  
  if (!text) {
    const b = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}ascii [text]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
      
    return message.reply({ embeds: [b] });
  }
  
  if (text.length > 20) {
    const c = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de ne pas dépasser les 20 caractères.\n **Utilisation:** \`${bot.prefix}ascii [text]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
      
    return message.reply({ embeds: [c] });
  }
  
  figlet(text, function(err, data) {
    const asciiEmbed = new Discord.EmbedBuilder()
      .setTitle(`Ascii`)
      .setDescription(`\`\`\`${data}\`\`\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
    
    message.channel.send({ embeds: [asciiEmbed] });
  });
};
