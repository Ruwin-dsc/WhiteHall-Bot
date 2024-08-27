const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

exports.help = {
  name: "lock",
  description: "Verrouille un salon",
  category: "outils",
  utilisation: "lock",
  permission: "ADMINISTRATOR",
  aliases: ["verrouiller"],
};

exports.run = async (bot, message, args) => {
      message.channel.permissionOverwrites.set([
  {
    id: message.guild.id,
    deny: [Discord.PermissionsBitField.Flags.SendMessages],
  }
]);

  const reas2 = new EmbedBuilder()
    .setTitle(`Salon Fermé`)
    .setDescription(`<@${message.author.id}>, Le salon a été fermé.`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [reas2] });
  const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Salon Fermé`)
    .setTimestamp()
    .setDescription(`${message.author} a fermé le salon <#${message.channel.id}>.`)
    .setFooter(bot.footer);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; });
  });

}