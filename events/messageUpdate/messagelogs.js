const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    execute(oldMessage, newMessage, bot) {
        let message = newMessage
        bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, (err, req) => {
            if (err) {
                console.error(err);
                return;
            }

            if (req.length < 1) return;
            const channelID = req[0].message;

            if (channelID === 'off') return;

            const channel = bot.channels.cache.get(channelID);
            if (!channel) return;

            const a = channel.name ? "yes" : "no";
            if (a === "no") return;

            if (oldMessage.content === '' || oldMessage.content === message.content) return;

            let authorInfo;
            try {
                authorInfo = `${message.author} (\`${message.author.username} / ${message.author.id}\`)`;
            } catch (e) {
                authorInfo = 'Utilisateur introuvable';
            }

            const embed = new EmbedBuilder()
                .setTitle('Message édité')
                .setColor(bot.color)
                .setDescription(`${authorInfo} dans ${message.channel}`)
                .addFields(
                    {
                        name: '**Ancien message**',
                        value: `${oldMessage.content} ‎`,
                        inline: false
                    },
                )
                .addFields(
                    {
                        name: '**Nouveau message**',
                        value: `${message.content} ‎`,
                        inline: false,
                    }
                )
                .setTimestamp()
                .setFooter(bot.footer);

            channel.send({ embeds: [embed] });
        });
    }
};
