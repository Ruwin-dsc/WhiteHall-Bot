const { EmbedBuilder, Permissions } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "renew",
  description: "Permet de refaire un salon",
  permission: Discord.PermissionFlagsBits.ManageChannels,
  dm: false,

  async run(bot, interaction, slashCommand) {
    if (!interaction.channel.deletable) {
    const rea = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`Ce salon ne peut pas être renew`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return interaction.reply({ embeds: [rea] });
  }

  const newchannel = await interaction.channel.clone();
  await interaction.channel.delete();
  await newchannel.send(`renew par \`${interaction.user.username}\``).then(async mess => setTimeout(async () => { mess.delete() }, 10000));

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    const log = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`renew`)
      .setTimestamp()
      .setDescription(`${interaction.user} (\`${interaction.user.id}\`) a renew le salon ${interaction.channel} !`)
      .setFooter(bot.footer);

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(console.error);
  });

  }
}