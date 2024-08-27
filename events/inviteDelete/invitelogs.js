const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'inviteDelete',
    async execute(invite, bot) {
        bot.db.query(`SELECT * FROM logs WHERE guildId = "${invite.guild.id}"`, (err, req) => {
            if (req.length < 1) return;
            const channel = req[0].invitelogs;

            if (channel == 'off') return;

            const a = bot.channels.cache.get(channel) ? bot.channels.cache.get(channel).name ? "yes" : "no" : "no";
            if (a === "no") return;
            

    const invitation = {
        url: invite.url,
        salon: invite.channel,
        timeExpires: invite.expiresAt,
        member: invite.inviter,
        maxUses: invite.maxUses
    }
    if (invitation.maxUses === 0) invitation.maxUses = 'Illimité'
    if (!invitation.timeExpires) {
        invitation.timeExpires = '\`Jamais\`'
    } else {
        invitation.timeExpires = `<t:${Math.floor(invitation.timeExpires / 1000)}:R>`
    }
    const embed = new EmbedBuilder()
    .setColor('PURPLE')
    .setTitle('Invitation suprimée')
    .setDescription(`
    Une invitation a été supprimé du salon ${invitation.salon} (\`${invitation.salon.id}\`)

    Url: ${invitation.url}

    `)
    .setFooter(bot.footer)

    invite.guild.channels.cache.get(channel).send({ embeds: [embed] })

        })
    }}