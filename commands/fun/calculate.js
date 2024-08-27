const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const { evaluate } = require('mathjs');

exports.help = {
  name: "calculate",
  category: "funny",
  description: "Permet de calculer une expression",
  utilisation: "calculate [calcul]",
  permission: "EVERYONE", 
  aliases: ['calc']
};

exports.run = async (bot, message, args) => {
  try {
    if (!args[0]) {
      const b = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}calculate [calcul]\``)
        .setColor(bot.color)
        .setFooter(bot.footer);
      
      return message.reply({ embeds: [b] });
    }

    const e = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, une erreur s'est produite lors du calcul de l'expression. Vérifiez que le calcul est une expression valide.\nNote: le signe multiplication est '*' et le signe division est '/'.`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    const result = evaluate(args.join(" "));

    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle('Calculatrice')
      .setDescription(`**Expression**: \`\`\`${args.join(" ")}\`\`\`\n**Résultat**: \`\`\`${result}\`\`\``)
      .setFooter(bot.footer)
      .setTimestamp();
      
    message.channel.send({ embeds: [embed] });
  } catch (e) {
    message.channel.send({embeds: [e]});
  }
};
