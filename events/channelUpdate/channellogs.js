const Discord = require('discord.js');

module.exports = {
  name: "channelUpdate",
  async execute(oldChannel, newChannel, bot) {
    bot.db.query(`SELECT channel FROM logs WHERE guildID = "${oldChannel.guild.id}"`, async (err, req) => {
      if (req.length < 1) return;
      const channelssss = req[0].channel;
      if (channelssss === "off") return;

      const audit = await oldChannel.guild.fetchAuditLogs({ 
        type: Discord.AuditLogEvent.ChannelCreate,
            limit: 1,
       });
      const channelcreate = audit.entries.first().executor;

      const a = bot.channels.cache.get(channelssss) ? bot.channels.cache.get(channelssss).name ? "yes" : "no" : "no";
      if (a === "no") return;

      let embed = new Discord.EmbedBuilder()
        .setTitle('Salon Update ! <:channel:1199415362211553392>')
        .setColor(bot.color)
        .setTimestamp()
        .setFooter(bot.footer)

      if (oldChannel.name !== newChannel.name) {
        embed.setDescription(`> <@${channelcreate.id}> vient de \`modifié le nom d'un salon\` !\n> Salon : <#${oldChannel.id}>\n> Ancien : ${oldChannel.name}\n> Nouveau : ${newChannel.name}`);
        bot.channels.cache.get(channelssss).send({ embeds: [embed] });
      } else if (oldChannel.type !== newChannel.type) {
        embed.setDescription(`> <@${channelcreate.id}> vient de \`modifié le type d'un salon\` !\n> Salon : <#${oldChannel.id}>\n> Ancien : ${types[oldChannel.type]}\n> Nouveau : ${types[newChannel.type]}`);
        bot.channels.cache.get(channelssss).send({ embeds: [embed] });
      } else if (oldChannel.topic !== newChannel.topic) {
        embed.setDescription(`> <@${channelcreate.id}> vient de \`modifié le topic d'un salon\` !\n> Salon : <#${oldChannel.id}>\n> Ancien : ${oldChannel.topic}\n> Nouveau : ${newChannel.topic}`);
        bot.channels.cache.get(channelssss).send({ embeds: [embed] });
      }
    });
  }
};
