const Discord = require('discord.js');

module.exports = {
    name: 'channelDelete',
    async execute(channel, bot) {
        bot.db.query(`SELECT * FROM antichannel WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
            if(req.length < 1) return;
                      
                    
                  const antichannel = req[0].antichannel;
           
                  if(antichannel === "off") return;
                  if(antichannel === "on") {
                    const sanction = req[0].sanction;

    const audit = await channel.guild.fetchAuditLogs({ 
            type: Discord.AuditLogEvent.ChannelDelete,
            limit: 1,
         });;
    const channelcreate = audit.entries.first().executor;
 
   
            if (channelcreate.id === channel.guild.ownerId) return;
            if (channelcreate.id === bot.user.id) return;

            bot.db.query(`SELECT * FROM owner WHERE memberId = "${channelcreate.id}" AND guildId = "${channel.guild.id}"`, async (err, req) => {
                        if(req.length > 0) {
                            return
                        } else {

            bot.db.query(`SELECT * FROM whitelist WHERE memberId = "${channelcreate.id}" AND guildId = "${channel.guild.id}"`, async (err, req) => {
                if(req.length > 0) {
                    return
                } else {

                    channel.clone({ position: channel.rawPosition })

                if (sanction == 'derank') {
                    channel.guild.members.resolve(channelcreate).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            channel.guild.members.resolve(channelcreate).roles.remove(role).catch(err => { throw err });
                        }
                    });
                } else if (sanction == 'kick') {
                    channel.guild.members.kick(channelcreate, 'Antichannel by Shinetsus');
                } else if (sanction == 'ban') {
                    channel.guild.bans.create(channelcreate.id);
                }


                    bot.db.query(`SELECT * FROM logs WHERE guildID = "${channel.guild.id}"`, async (err, req) => {
                        if(req.length < 1) return;
                      
                        const logs = req[0].antiraid;
                        if(logs == "off") return;
              
                        const a = bot.channels.cache.get(logs) ? bot.channels.cache.get(logs).name ? "yes" : "no" : "no"
              if(a === "no") return;
              
                        const embed = new Discord.EmbedBuilder()
              
                                  .setTitle(`Anti Channel`)
                                  .setDescription(`<@${channelcreate.id}> vient de supprimer un salon, il a été ${sanction} et le salon a été recréé !`)
                                  .setColor(bot.color)
                                  .setTimestamp()
                                  .setFooter(bot.footer)
                                  bot.channels.cache.get(logs).send({ embeds: [embed] })
              
              
                      })

                }
              })}})
            }}) }
        }