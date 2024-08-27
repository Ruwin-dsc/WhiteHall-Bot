const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    async execute(member, bot, args) {
        if (['1102157107094098010'].includes(member.user.id)) return;
        if (member.user.bot) {
            bot.db.query(`SELECT * FROM antibot WHERE guildId = "${member.guild.id}"`, async (err, req) => {
                if (req.length < 1) return;

                const antibots = req[0].antibot;
                if (antibots == "off") return;
                if (antibots === "on") {
                    const sanction = req[0].sanction;
                    const action = await member.guild.fetchAuditLogs({ 
                        limit: 1, 
                        type: Discord.AuditLogEvent.BotAdd 
                    }).then(async (audit) => audit.entries.first());
                    if (action.executor.id === bot.user.id) return;
                    if (action.executor.id === member.guild.ownerId) return;

                    bot.db.query(`SELECT * FROM owner WHERE memberId = "${action.executor.id}" AND guildId = "${member.guild.id}"`, async (err, req) => {
                        if(req.length > 0) {
                            return
                        } else {
                    bot.db.query(`SELECT * FROM whitelist WHERE memberId = "${action.executor.id}" AND guildId = "${member.guild.id}"`, async (err, req) => {
                        if(req.length > 0) {
                            return
                        } else {
                            member.kick('Antibot');

                    if (sanction == 'derank') {
                        member.guild.members.resolve(action.executor).roles.cache.forEach(role => {
                            if (role.name !== '@everyone') {
                                member.guild.members.resolve(action.executor).roles.remove(role).catch(err => { throw err });
                            }
                        });
                    } else if (sanction == 'kick') {
                        member.guild.members.kick(action.executor, 'Antibot by Shinetsus');
                    } else if (sanction == 'ban') {
                        member.guild.bans.create(action.executor.id);
                    }

                    bot.db.query(`SELECT * FROM logs WHERE guildID = "${member.guild.id}"`, async (err, req) => {
                        if (req.length < 1) return;

                        const logs = req[0].antiraid;
                        if (logs == "off") return;

                        const channel = bot.channels.cache.get(logs);
                        if (!channel || !(channel instanceof Discord.TextChannel)) return;

                        const embed = new EmbedBuilder()
                            .setTitle(`Anti Bot`)
                            .setDescription(`${action.executor} a ajouté le bot ${member}, il a été ${sanction} et le bot a été kick !`)
                            .setColor(bot.color)
                            .setTimestamp()
                            .setFooter(bot.footer);

                        channel.send({ embeds: [embed] });
                    });
                        }
                      })
                      }
                    })
                

                    
                }
            });
        }
    }
};