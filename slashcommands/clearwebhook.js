const {
  EmbedBuilder
} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "clearwebhook",
  description: "Permet de supprimer tous les webhooks d'un serveur",
  permission: Discord.PermissionFlagsBits.ManageWebhooks,
  dm: false,
 
  async run(bot, interaction, slashCommand) {
    const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Aucun Webhook`)
    .setDescription(`<@${interaction.user.id}>, il n'y a aucun webhook sur le serveur !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const webhooks = await interaction.guild.fetchWebhooks();

  if (webhooks.size === 0) {
    return interaction.reply({ embeds: [nondef] });
  }

  await Promise.all(
    webhooks.map(async (webhook) => {
      await webhook.delete();
    })
  );

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`${webhooks.size} webhooks ont été supprimés du serveur`)
    .setFooter(bot.footer);

    const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Supression de webhook`)
    .setTimestamp()
    .setDescription(`${interaction.user} a supprimé ${webhooks.size}.`)
    .setFooter(bot.footer);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch({});
  });

  return interaction.reply({ embeds: [embed] });

  }
}