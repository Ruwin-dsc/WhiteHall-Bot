const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "Permet de voir la latence du bot",
    permission: "Aucune",
    dm: true,
    
    async run(bot, interaction) {
         const apiPing = bot.ws.ping


         if (apiPing < 100) {
           apiPingEmoji = `${bot.emoji.greencircle} (Très bon)`;
         } else if (apiPing < 1000) {
           apiPingEmoji = `${bot.emoji.orangecircle} (ça va)`;
         } else {
           apiPingEmoji = `${bot.emoji.redcircle}  (Aiee c'est la merde la :/)`;
         }

         const exampleEmbed = new Discord.EmbedBuilder()
           .setColor(bot.color)
           .setTitle("**Latence**")
           .setDescription(
             `
            Latence de l'API : ${apiPing}ms ${apiPingEmoji}
            `
           )
           .setTimestamp()
           .setFooter(bot.footer);

         interaction.reply({ embeds: [exampleEmbed] });

    }
}