const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, bot) {
        const member = oldState.member || newState.member;
        
        bot.db.query(`SELECT * FROM logs WHERE guildID = "${member.guild.id}"`, async (err, req) => {
            if (req.length < 1) return;
            const channelo = req[0].voice;
            if (channelo === 'off') return;
            
            const channel = bot.channels.cache.get(channelo);
            if (!channel || !(channel instanceof Discord.TextChannel)) return;
            
            if (oldState.channel && oldState.channel !== newState.channel) {
                const embed = new EmbedBuilder()
                    .setDescription(`${member} s'est déconnecté de <#${oldState.channel.id}>`)
                    .setColor(bot.color)
                    .setTimestamp()
                    .setFooter(bot.footer);
                
                channel.send({ embeds: [embed] });
            }
            
            if (newState.channel && oldState.channel !== newState.channel) {
                const embed = new EmbedBuilder()
                    .setDescription(`${member} s'est connecté à <#${newState.channel.id}>`)
                    .setColor(bot.color)
                    .setTimestamp()
                    .setFooter(bot.footer);
                
                channel.send({ embeds: [embed] });
            }
        });
    }
};