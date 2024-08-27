const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

exports.help = {
  name: "unhide",
  description: "Permet d'afficher un salon",
  category: "outils",
  utilisation: "unhide",
  permission: "MANAGE_CHANNELS",
  aliases: ["afficher"],
};

exports.run = async (bot, message, args) => {


    message.channel.permissionOverwrites.set([
  {
    id: message.guild.id,
    allow: [Discord.PermissionsBitField.Flags.ViewChannel],
  }
]);

  const reas2 = new EmbedBuilder()
    .setTitle(`Salon Affiché`)
    .setDescription(`<@${message.author.id}>, Le salon n'est plus caché.`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [reas2] });
  const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Salon Affiché`)
    .setTimestamp()
    .setDescription(`${message.author} a affiché le salon <#${message.channel.id}>.`)
    .setFooter(bot.footer);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(console.error);
  });
};
