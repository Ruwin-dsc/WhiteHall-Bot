const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "uptime",
  category: "général",
  description: "Permet de voir depuis quand le bot est connecté",
  utilisation: "uptime",
  permission: "ADMINISTRATOR",
  aliases: ["up", "uptimer"] 
};

exports.run = async (bot, message) => {
  let days = Math.floor(bot.uptime / 86400000);
  let hours = Math.floor(bot.uptime / 3600000) % 24;
  let minutes = Math.floor(bot.uptime / 60000) % 60;
  let seconds = Math.floor(bot.uptime / 1000) % 60;

  const embed = new EmbedBuilder()
    .setTitle("Voici le temps de ma connexion !")
    .setDescription(
      `Je suis connecté depuis ${days} jours ${hours} heure(s) ${minutes} minute(s) ${seconds} seconde(s) !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setTimestamp();

  return message.reply({ embeds: [embed] });
};
