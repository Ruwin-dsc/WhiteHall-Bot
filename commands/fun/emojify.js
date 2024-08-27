const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: "emojify",
    permissions: 'EVERYONE',
    usage: "emojify [text]",
    category: "funny",
    description: "Permet de transformer des phrases en émojis"
};

exports.run = async (bot, message, args) => {
    const string = args.join(" ");
    if (!string) {
        let b = new Discord.EmbedBuilder()
            .setTitle(`${bot.emoji.deny}・Utilisation de la commande`)
            .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}emojify [text]\``)
            .setColor(bot.color)
            .setFooter(bot.footer);
        return message.reply({ embeds: [b] });
    }

    const specialCodes = {
        '0': ':zero:',
        '1': ':one:',
        '2': ':two:',
        '3': ':three:',
        '4': ':four:',
        '5': ':five:',
        '6': ':six:',
        '7': ':seven:',
        '8': ':eight:',
        '9': ':nine:',
        '#': ':hash:',
        '*': ':asterisk:',
        '?': ':grey_question:',
        '!': ':grey_exclamation:',
        ' ': '   '
    };

    const text = string.toLowerCase().split('').map(letter => {
        if (/[a-z]/g.test(letter)) {
            return `:regional_indicator_${letter}:`;
        } else if (specialCodes[letter]) {
            return specialCodes[letter];
        }
        return letter;
    }).join('');

    const a = new EmbedBuilder()
        .setTitle(`Emojify`)
        .setDescription(`${text}`)
        .setColor(bot.color)
        .setFooter(bot.footer);

    message.reply({ embeds: [a] });
};
