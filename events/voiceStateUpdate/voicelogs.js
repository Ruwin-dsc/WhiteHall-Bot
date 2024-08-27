const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, bot) {
        const oldUser = oldState.member;
        const newUser = newState.member;

        bot.db.query(`SELECT * FROM logs WHERE guildID = "${newUser.guild.id}"`, async (err, req) => {
            if (req.length < 1) return;
            const channelo = req[0].voice;
            if (channelo === 'off') return;

            const channel = bot.channels.cache.get(channelo);
            if (!channel || !(channel instanceof Discord.TextChannel)) return;

            if (oldState.mute !== newState.mute) {
                const action = newState.mute ? "mute" : "démute";
                const embed = new EmbedBuilder()
                    .setDescription(`${newUser} s'est ${action} dans <#${oldUser.voice.channelId}>`)
                    .setColor(bot.color)
                    .setTimestamp()
                    .setFooter(bot.footer);

                channel.send({ embeds: [embed] });
            } else if (oldState.deaf !== newState.deaf) {
                const action = newState.deaf ? "mute casque" : "démute casque";
                const embed = new EmbedBuilder()
                    .setDescription(`${newUser} s'est ${action} dans <#${oldUser.voice.channelId}>`)
                    .setColor(bot.color)
                    .setTimestamp()
                    .setFooter(bot.footer);

                channel.send({ embeds: [embed] });
            }
        });
    }
};
