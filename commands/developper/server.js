const {
    EmbedBuilder,
} = require(`discord.js`);


exports.help = {
    name: "server",
    category: 'developper',
    description: "Permet de configurer les vocaux temporaire",
    utilisation: "tempvoc salon catégorie",
    permission: "owner"
}
    exports.run = async (bot, message, args, prefix) => {
        if (!bot.config.owner.includes(message.author.id)) return;
        if (args[0] === "list") {
            const embed = new EmbedBuilder()
            .setTitle(`Serveurs (${bot.guilds.cache.size})`)
            .setDescription(bot.guilds.cache.map((g) => `**${g.name}** (${g.id}) - ${g.memberCount} membres - <@${g.ownerId}>`).join("\n\n"))

            message.reply({embeds: [embed]})
        }

        if (args[0] === 'leave') {
            let guild = bot.guilds.cache.get(args[1])

            if (!guild) return message.channel.send(`Aucun serveur trouvé pour \`${args[1] || 'rien'}\``);
            guild.leave()

            message.reply(`Je viens de quitter le serveur \`${guild.name}\` !`)
        }
        if (args[0] === 'invite') {
            try {
            const guild = await bot.guilds.fetch(args[1])
            if (!guild) return message.channel.send(`Aucun serveur trouvé pour \`${args[1] || 'rien'}\``);

            const invite = await guild.channels.cache.filter(channel => channel.type === 0).first().createInvite();
            message.channel.send(`Voici le lien d'invitation pour le serveur ${guild.name} - ${invite.url}`);
        } catch (error) {
            message.channel.send('Une erreur s\'est produite.');
            
        }
        }

    }