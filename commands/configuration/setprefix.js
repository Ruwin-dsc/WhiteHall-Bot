const { EmbedBuilder } = require('discord.js')

exports.help = {
    name: "setprefix",
    category: 'configuration',
    description: "Permet de configurer le prefix du bot",
    utilisation: "setprefix [prefix]",
    permission: "ADMINISTRATOR"

}
    exports.run = async (bot, message, args, prefix) => {

        let arg = message.content.trim().split(/ +/g)
        let b = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}setprefix [prefix]\``)
        .setColor(bot.color)
        .setFooter(bot.footer)
        if(!arg[1]) return message.reply({ embeds: [b] })
         const c5 = new EmbedBuilder()
        .setTitle(`Nouveau préfix`)
        .setDescription(`<@${message.author.id}>, le préfix du bot est maintenant ${arg[1]}`)
        .setColor(bot.color)
        .setFooter(bot.footer)
        
                bot.db.query(`UPDATE serveurs SET prefix = '${arg[1]}' WHERE guildId = ${message.guild.id}`)
                return message.channel.send({embeds: [c5]})
            }