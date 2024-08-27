const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "clearwebhook",
  category: 'outils',
  description: "Permet de clear tous les webhooks du serveur",
  utilisation: "clearwebhook",
  permission: "MANAGE_WEBHOOKS",
  aliases: ['clwebhook']
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Aucun Webhook`)
    .setDescription(`<@${message.author.id}>, il n'y a aucun webhook sur le serveur !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const webhooks = await message.guild.fetchWebhooks();

  if (webhooks.size === 0) {
    return message.channel.send({ embeds: [nondef] });
  }

  await Promise.all(
    webhooks.map(async (webhook) => {
      await webhook.delete();
    })
  );

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`${webhooks.size} ont été supprimés du serveur`)
    .setFooter(bot.footer);

    const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Supression de webhook`)
    .setTimestamp()
    .setDescription(`${message.author} a supprimé ${webhooks.size}.`)
    .setFooter(bot.footer);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; });
  });

  return message.channel.send({ embeds: [embed] });
};
