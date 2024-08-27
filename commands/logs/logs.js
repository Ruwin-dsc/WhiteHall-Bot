const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "logs",
  category: 'logs',
  description: "Permet de voir les configurations pour les logs",
  utilisation: "logs",
  permission: "ADMINISTRATOR"
};

exports.run = async (bot, message, args) => {

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (err) throw err;

    const logCategories = [
      { name: "Ban-Unban", field: "ban" },
      { name: "Bot", field: "bot" },
      { name: "Salon", field: "channel" },
      { name: "Message", field: "message" },
      { name: "Rôle", field: "role" },
      { name: "Boost", field: "boostlogs" },
      { name: "Joinleave", field: "joinleave" },
      { name: "Emoji", field: "emojis" },
      { name: "Vocal", field: "voice" },
      { name: "AntiRaid", field: "antiraid" },
      { name: "Mods", field: "mods" },
      { name: "Invitations", field: "invitelogs" }
    ];

    const logFields = logCategories.map(category => {
      let value = req && req.length > 0 ? `${req[0][category.field]}` : "Indéfini";
      if(value !== "off" && value !== "Indéfini") value = `<#${req[0][category.field]}>`
      return `**${category.name}** : ${value}`;
    }).join("\n");

    const ARG1 = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`${bot.emoji.book} Logs`)
      .setDescription(logFields)
      .setTimestamp()
      .setFooter(bot.footer);

    message.channel.send({ embeds: [ARG1] });
  });
};