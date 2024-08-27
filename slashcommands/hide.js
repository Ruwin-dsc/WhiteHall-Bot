const { EmbedBuilder, Permissions } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "hide",
  description: "Permet de cacher un salon",
  permission: Discord.PermissionFlagsBits.ManageChannels,
  dm: false,

  async run(bot, interaction, slashCommand) {

    interaction.channel.permissionOverwrites.set([
  {
    id: interaction.guild.id,
    deny: [Discord.PermissionsBitField.Flags.ViewChannel],
  }
]);

    const reas2 = new EmbedBuilder()
      .setTitle(`Salon caché`)
      .setDescription(`<@${interaction.user.id}>, Le salon a été caché.`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    interaction.reply({ embeds: [reas2] });

    const log = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Salon caché`)
      .setTimestamp()
      .setDescription(`${interaction.user} a caché le salon <#${interaction.channel.id}>.`)
      .setFooter(bot.footer);

    bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
      if (req.length < 1) return;
      const channellogs = req[0].mods;

      bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; });
    });
  }
};
