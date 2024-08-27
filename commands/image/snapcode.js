const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: 'snapcode',
    description: 'Affiche le snapcode du snap précisé',
    utilisation: 'snapcode [nom du compte]',
    permission: 'EVERYONE',
    category: 'image'
};

exports.run = async (bot, message, args) => {
    const d = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Utilisation de la commande`)
        .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande.\n **Utilisation:** \`${bot.prefix}snapcode [nom du compte]\``)
        .setColor(bot.color)
        .setFooter(bot.footer);

    if (!args.length) {
        return message.channel.send({ embeds: [d] });
    }

    const pseudo = args[0];
    const snapcode = `https://feelinsonice.appspot.com/web/deeplink/snapcode?username=${pseudo}&size=320&type=PNG`;

    const embed = new EmbedBuilder()
        .setTitle(`Snap de ${pseudo}`)
        .setImage(snapcode)
        .setColor(bot.color);

    message.channel.send({ embeds: [embed] });
};
