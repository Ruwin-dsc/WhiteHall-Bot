const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: 'unbanall',
  category: 'moderation',
  description: 'Permet de débanir tous les bannis d\'un serveur',
  permission: 'BAN_MEMBERS',
  utilisation: 'unbanall'
};

exports.run = async (bot, message, args) => {
  const banwait = new EmbedBuilder()
  .setDescription(`<@${message.author.id}>, unban all en cours merci de patienter...`)
  .setColor(bot.color)
  .setFooter(bot.footer);

  const noban = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, Aucun utilisateur est banni`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  message.channel.send({ embeds: [banwait] }).then(async (msg) => {
    const bans = await message.guild.bans.fetch();

    if (bans.size === 0) {
      msg.edit({ embeds: [noban] });
    } else {
      bans.forEach((ban) => {
        message.guild.members.unban(ban.user.id);
      });

      const ban = new EmbedBuilder()
      .setDescription(`<@${message.author.id}>, J'ai débanis ${bans.size} membres avec succès !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

      msg.edit({ embeds: [ban] });
    }
  });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;
    if(channellogs == "off") return

    const log = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle('Unbanall')
      .setTimestamp()
      .setDescription(`${message.author} (\`${message.author.id}\`) a effectué unbanall !`)
      .setFooter(bot.footer);

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(console.error);
  });
};
