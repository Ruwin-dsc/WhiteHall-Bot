const Discord = require('discord.js');

module.exports = {
    name: 'roleCreate',
    async execute(role, bot) {
        bot.db.query(`SELECT * FROM logs WHERE guildID = "${role.guild.id}"`, async (err, req) => {
            if (req.length < 1) return;

            const antirole = req[0].role;
            if (antirole === 'off') return;

            const audit = await role.guild.fetchAuditLogs({ 
                limit: 1, 
                type: Discord.AuditLogEvent.RoleCreate
             });
            const roleCreateEntry = audit.entries.first();

            if (!roleCreateEntry) return;

            const { executor, target } = roleCreateEntry;
            if (target.id !== role.id) return;

            const channel = bot.channels.cache.get(antirole);
            if (!channel) return
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Rôle Créé ! ${bot.emoji.wl}`)
                .setDescription(`> <@${executor.id}> vient de \`créer un rôle\` !\n> Rôle : <@&${role.id}> (\`${role.id}\`) (\`${role.name}\`)`)
                .setTimestamp()
                .setColor(bot.color)
                .setFooter(bot.footer)

            channel.send({ embeds: [embed] }).catch(console.error);
        });
    }
};
