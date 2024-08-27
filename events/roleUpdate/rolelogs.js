const Discord = require('discord.js');

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole, bot) {
        bot.db.query(`SELECT * FROM logs WHERE guildID = "${oldRole.guild.id}"`, async (err, req) => {
            if (req.length < 1) return;

            const antirole = req[0].role;
            if (antirole === 'off') return;

            const audit = await oldRole.guild.fetchAuditLogs({ 
                limit: 1, 
                type: Discord.AuditLogEvent.RoleUpdate
             });
            const roleUpdateEntry = audit.entries.first();

            if (!roleUpdateEntry) return;

            const { executor, target } = roleUpdateEntry;
            if (target.id !== newRole.id) return;

            const channel = bot.channels.cache.get(antirole);
            if (!channel) return;

            const embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Rôle Modifié ! ${bot.emoji.wl}`)
                .setDescription(`> <@${executor.id}> vient de \`modifier un rôle\` !\n> Rôle : <@&${newRole.id}> (\`${newRole.id}\`) (\`${newRole.name}\`)`)
                .setFooter(bot.Footer)

            if (oldRole.name !== newRole.name) {
                embed.addField('Changement de nom', `Avant : **${oldRole.name}**\nAprès : **${newRole.name}**`);
            }

            if (oldRole.color !== newRole.color) {
                embed.addField('Changement de couleur', `Avant : **#${oldRole.color.toString(16)}**\nAprès : **#${newRole.color.toString(16)}**`);
            }

            if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
                embed.addField('Changement de permissions', `Avant : **${oldRole.permissions.bitfield}**\nAprès : **${newRole.permissions.bitfield}**`);
            }

            embed.setTimestamp();

            channel.send({ embeds: [embed] }).catch(console.error);
        });
    }
};
