const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
  name: 'guildBanRemove',
  async execute(member, bot) {
    const logs = await member.guild.fetchAuditLogs({ 
        type: Discord.AuditLogEvent.MemberBanRemove,
	    limit: 1,
    
    }).catch(console.error);


    const banLog = logs.entries.first();
    

    const { executor, target } = banLog;
    bot.db.query(`SELECT * FROM logs WHERE guildID = "${member.guild.id}"`, (err, req) => {
      if (req.length < 1) return;

      const channelId = req[0].ban;
      if (channelId === 'off' || channelId === null) return;

      const channel = bot.channels.cache.get(channelId);


      const embed = new EmbedBuilder()
        .setColor(bot.color)
        .setThumbnail(bot.user.displayAvatarURL({ size: 2048 }))
        .setTitle('<:InoxBan1:1199482569192919212> ‣ LOGS | Membres Débanis')
        .setDescription(`Information de l'utilisateur:\n > **Membre: ${member.user}** \n > **ID: ${member.user.id}**\n > **Auteur: ${executor}**`)
        .setFooter(bot.footer)
        .setTimestamp(new Date());

      channel.send({ embeds: [embed] });
    });
  }
};
