const Discord = require('discord.js');

module.exports = {
  name: 'channelDelete',
  async execute(channel, bot) {
    bot.db.query(`SELECT channel FROM logs WHERE guildID = "${channel.guild.id}"`, async (err, req) => {
      if (req.length < 1) return;
      const antichannel = req[0].channel;
      if (antichannel === "off") return;
      
      const audit = await channel.guild.fetchAuditLogs({ 
        type: Discord.AuditLogEvent.ChannelDelete,
            limit: 1,
       });
      const channelcreate = audit.entries.first().executor;
      
      const a = bot.channels.cache.get(antichannel) ? bot.channels.cache.get(antichannel).name ? "yes" : "no" : "no";
      if (a === "no") return;

      let channeltype;
        if(channel.type == "0") channeltype = "**Salon Textuelle**"
        if(channel.type == "2") channeltype = "**Salon Vocale**"
        if(channel.type == "4") channeltype = "**Catégorie**"
        if(channel.type == "13") channeltype = "**Conférence**"
        if(channel.type == "15") channeltype = "**Forum**"
        if(channel.type == "5") channeltype = "**Salon des annonces**"
      
      const embed = new Discord.EmbedBuilder()
        .setTitle('Salon supprimé ! <:channel:1199415362211553392>')
        .setDescription(`> <@${channelcreate.id}> vient de \`supprimer un salon\` !\n> Nom du salon: <#${channel.id}>\n> Type: ${channeltype}`)
        .setColor(bot.color)
        .setTimestamp()
        .setFooter(bot.footer)
      
      bot.channels.cache.get(antichannel).send({ embeds: [embed] });
    });
  }
};
