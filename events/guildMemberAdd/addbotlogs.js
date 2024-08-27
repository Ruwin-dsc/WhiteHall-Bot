const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot, args) {
    if (member.bot) {
      bot.db.query(`SELECT bot FROM logs WHERE guildID = "${member.guild.id}"`, async (err, req) => {
        if (req.length < 1) return;

        const logs_Antibot = req[0].bot;
        if (logs_Antibot === 'off') return;

        const auditLog = await member.guild.fetchAuditLogs({ 
            type: Discord.AuditLogEvent.BotAdd,
	        limit: 1,   
        }).then(audit => audit.entries.first());
        if (auditLog.executor.id === bot.user.id) return;

        const channel = bot.channels.cache.get(logs_Antibot);
        if (!channel) return;

        const embed = new EmbedBuilder()
          .setTitle(`Nouveau bot ajouté ! ${bot.emoji.bot}`)
          .setDescription(`> <@${auditLog.executor.id}> a ajouté un \`bot\` au serveur !\n> Bot ajouté: <@${member.id}>`)
          .setColor('PURPLE')
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp();

        channel.send({ embeds: [embed] });
      });
    }
  }
};
