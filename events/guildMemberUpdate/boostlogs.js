
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberUpdate",
    async execute(oldMember, newMember, bot) {
        const oldStatus = oldMember.premiumSince;
        const newStatus = newMember.premiumSince;

        bot.db.query(`SELECT * FROM logs WHERE guildID = "${oldMember.guild.id}"`, async (err, req) => {
            if(req.length < 1) return;
                    
                  
            const logs = req[0].boostlogs;
            if(logs == 'off') return; 

        const channel = bot.channels.cache.get(logs)

        if(!channel) return;

        if(!oldStatus && newStatus) channel.send({ embeds: [
            new EmbedBuilder()
                .setTitle("Nouveau boost !")
                .setDescription(`${newMember.user} vient de booster le serveur !`)
                .setColor(bot.color)
                .setFooter(bot.footer)
        ] })


        if(oldStatus && !newStatus) channel.send({ embeds: [
            new EmbedBuilder()
                .setTitle("Unboost !")
                .setDescription(`${newMember.user} vient de unbooster le serveur ! `)
                .setColor(bot.color)
                .setFooter(bot.footer)
        ] })
    })}
};