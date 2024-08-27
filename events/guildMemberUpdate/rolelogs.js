const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember, bot) {
            bot.db.query(`SELECT * FROM logs WHERE guildID = "${oldMember.guild.id}"`, async (err, req) => {
                if (req.length < 1) return;

                const antirole = req[0].role;
                if (antirole === 'off') return;

                const channel = bot.channels.cache.get(antirole);
                if (!channel || !(channel instanceof Discord.TextChannel)) return;

                const audit = await oldMember.guild.fetchAuditLogs({ 
                    limit: 1, 
                    type: Discord.AuditLogEvent.RoleUpdate
                });
                const memberRoleUpdateEntry = audit.entries.first();

                if (!memberRoleUpdateEntry) return;

                const { executor, target } = memberRoleUpdateEntry;
                if (target.id !== newMember.id) return;

                const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
                const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

                const removedRolesList = removedRoles.map(role => `<@&${role.id}>`);
                const addedRolesList = addedRoles.map(role => `<@&${role.id}>`);

                const removedRolesText = removedRolesList.length > 0 ? `Rôles retirés : ${removedRolesList.join(', ')}` : '';
                const addedRolesText = addedRolesList.length > 0 ? `Rôles ajoutés : ${addedRolesList.join(', ')}` : '';

                const embed = new Discord.EmbedBuilder()
                    .setTitle('Membre de guilde mis à jour')
                    .setDescription(`Le membre <@${target.id}> a été mis à jour par <@${executor.id}>.`)
                    .addField('Rôles retirés', removedRolesText || 'Aucun rôle retiré')
                    .addField('Rôles ajoutés', addedRolesText || 'Aucun rôle ajouté')
                    .setColor(bot.color)
                    .setTimestamp()
                    .setFooter(bot.footer)

                channel.send({ embeds: [embed] });
            });
    }
};
