
const { EmbedBuilder } = require('discord.js');


module.exports = {
name: "guildCreate",
async execute(guild, bot) {
    if (guild.memberCount < 10) {
        guild.leave().catch(() => {})
        bot.channels.cache.get("1193594399909748786").send(`Je viens de quitter le serveur ${guild.name} car il a moins de 10 membres`)
      } else {
    const invite = await guild.channels.cache.filter(channel => channel.type === 0).first().createInvite();

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Arrivé sur un serveur", iconURL: `${bot.user.displayAvatarURL()}` })
            .setColor(bot.color)
            .setDescription(
                `
                > **Nom du serveur :** ${guild.name}
                > **Identifiant du serveur :** ${guild.id}
                > **Serveur Invite:** ${invite.url}
                > **Propriétaire du serveur :** <@${(await guild.fetchOwner()).user.id}> \`${(await guild.fetchOwner()).user.tag}\`
                > **Membres :** ${guild.memberCount}
                > **Boosts :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boost(s))
                > **Date de création :** <t:${parseInt(guild.createdAt / 1000)}:f> (<t:${parseInt(guild.createdAt / 1000)}:R>)
                > **Nombre de serveur ou le bot est présent :** ${bot.guilds.cache.size}
                `
            )
            .setThumbnail(guild.iconURL())
            .setImage(guild.bannerURL({ size: 1024 }))
            .setFooter(bot.footer)

        bot.channels.cache.get(bot.config.salon.GuildAddedLog).send({ embeds: [embed] })
            }
}
}