const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: 'nuke',
  category: 'outils',
  description: "Permet de refaire un salon",
  utilisation: "nuke",
  aliases: ['renew'],
  permission: "MANAGE_CHANNELS"
}

exports.run = async (bot, message, args) => {

  if (!message.channel.deletable) {
    const rea = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`Ce salon ne peut pas être Recrée`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.reply({ embeds: [rea] });
  }

  const newchannel = await message.channel.clone();
  await message.channel.delete();
  await newchannel.send(`Recrée par \`${message.author.username}\``).then(async mess => setTimeout(async () => { mess.delete() }, 10000));

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    const log = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Recrée`)
      .setTimestamp()
      .setDescription(`${message.author} (\`${message.author.id}\`) a recréé le salon ${message.channel} !`)
      .setFooter(bot.footer);

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; });
  });
}
