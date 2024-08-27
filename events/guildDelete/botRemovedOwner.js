
const { EmbedBuilder } = require('discord.js');


module.exports = {
name: "guildDelete",
async execute(guild, bot) {

    if (guild.memberCount < 10) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Retirement sur un serveur", iconURL: `${bot.user.displayAvatarURL()}` })
            .setColor(bot.color)
            .setDescription(
                `
                > **Nom du serveur :** ${guild.name}
                > **Identifiant du serveur :** ${guild.id}
                > **Propriétaire du serveur :** <@${guild.ownerId}>
                > **Membres :** ${guild.memberCount}
                > **Boosts :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boost(s))
                > **Date de création :** <t:${parseInt(guild.createdAt / 1000)}:f> (<t:${parseInt(guild.createdAt / 1000)}:R>)
                > **Nombre de serveur ou le bot est présent :** ${bot.guilds.cache.size}
                `
            )
            .setThumbnail(guild.iconURL())
            .setImage(guild.bannerURL({ size: 1024 }))
            .setFooter(bot.footer)

        bot.channels.cache.get(bot.config.salon.GuildRemovedLog).send({ embeds: [embed] })
    
}
}