const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: "constantmsg",
    category: 'configuration',
    description: "Permet de configurer un message pour qu'il soit toujours en bas",
    utilisation: "constantmsg [text/clear]",
    permission: "ADMINISTRATOR"
};

exports.run = async (bot, message, args) => {
    const b = new EmbedBuilder()
        .setTitle(`${bot.prefix}・Utilisation de la commande`)
        .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}constantmsg [text/clear]\``)
        .setColor(bot.color)
        .setFooter(bot.footer);

    const arg = args.join(" ");
    if (!arg) {
        return message.reply({ embeds: [b] });
    }

    if (arg === 'clear') {
        bot.db.query(`DELETE FROM constantmsg WHERE channel = ${message.channel.id}`);
        const c = new EmbedBuilder()
            .setDescription(`Les messages constants du salon <#${message.channel.id}> ont bien été supprimés`)
            .setColor(bot.color)
            .setFooter(bot.footer);
        return message.channel.send({ embeds: [c] });
    }

    const e = new EmbedBuilder()
        .setDescription(`Le message ${args.join(" ")} a bien été sauvegardé ! Pour supprimer tous les constantmessages faîtes \`${bot.prefix}constantmsg clear\``)
        .setColor(bot.color)
        .setFooter(bot.footer);

    bot.db.query(`INSERT INTO constantmsg (guildId, channel, messages_complet) VALUES ("${message.guild.id}", "${message.channel.id}", "${args.join(" ")}")`);
    message.channel.send({ embeds: [e] });
};