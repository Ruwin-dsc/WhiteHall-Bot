const { EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    async execute(message, bot) {
        if (!message.guild) return;
        
        bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
            if (err) {
                console.error(err);
                return;
            }

            if (req.length < 1) return;

            const salon = req[0].message;
            if (salon === 'off') return;

            const channel = bot.channels.cache.get(salon);
            if (!channel) return;

            try {
                const audit = await message.guild.fetchAuditLogs({
                    limit: 1, 
                    type: AuditLogEvent.MessageDelete
                });

                const deletionLog = audit.entries.first();
                if (!deletionLog) return;

                const { executor, target } = deletionLog;

                const authorName = message.author ? message.author.tag : 'Utilisateur introuvable';

                const embed = new EmbedBuilder()
                    .setColor(bot.color)
                    .setTitle('**Message Supprimé**')
                    .setDescription(`**${authorName}** a supprimé son message dans <#${message.channel.id}>\n\n${message.content}`)
                    .setTimestamp()
                    .setFooter(bot.footer);

                const executorEmbed = new EmbedBuilder()
                    .setColor(bot.color)
                    .setTitle('**Message Supprimé**')
                    .setDescription(`<@${executor.id}> (\`${executor.id}\`) a supprimé le message de ${authorName} dans <#${message.channel.id}>\n\n${message.content}`)
                    .setTimestamp()
                    .setFooter(bot.footer);

                if (message.embeds.length > 0) {
                    return channel.send({
                        content: `**${executor.tag}** (\`${executor.id}\`) a supprimé l'embed ci-dessous dans le salon <#${message.channel.id}>`,
                        embeds: [message.embeds[0]]
                    });
                }

                if (message.author && message.author.id === target.id) {
                    channel.send({ embeds: [embed] });
                } else {
                    channel.send({ embeds: [executorEmbed] });
                }
            } catch (error) {
                console.error(error);
            }
        });
    }
};
