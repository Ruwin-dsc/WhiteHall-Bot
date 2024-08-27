const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "ping",
  category: "général",
  description: "Permet de voir la latence du bot et de l'API",
  utilisation: "ping",
  aliases: ["latence", "ms", "speed"],
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  try {
    const replyMessage = await message.reply("Calcul du ping...");
    const ping = replyMessage.createdTimestamp - message.createdTimestamp;
    const apiPing = bot.ws.ping

    let pingEmoji = "";
    let apiPingEmoji = "";

    if (apiPing < 100) {
      apiPingEmoji = `${bot.emoji.greencircle} (Très bon)`;
    } else if (apiPing < 1000) {
      apiPingEmoji = `${bot.emoji.orangecircle} (ça va)`;
    } else {
      apiPingEmoji = `${bot.emoji.redcircle}  (Aiee c'est la merde la :/)`;
    }

    if (ping < 100) {
      pingEmoji = `${bot.emoji.greencircle} (Très bon)`;
    } else if (ping < 1000) {
      pingEmoji = `${bot.emoji.orangecircle} (ça va)`;
    } else {
      pingEmoji = `${bot.emoji.redcircle}  (Aiee c'est la merde la :/)`;
    }

    const exampleEmbed = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle("**Latence**")
      .setDescription(
        `
            \nLatence de l'API : ${apiPing}ms ${apiPingEmoji}
            `
      )
      .setTimestamp()
      .setFooter(bot.footer);

    message.channel.send({ embeds: [exampleEmbed] });
    replyMessage.delete();
  } catch (error) {
    console.error(error);
  }
};
