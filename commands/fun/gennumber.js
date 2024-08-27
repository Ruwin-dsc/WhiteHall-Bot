const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: "gennumber",
    permissions: 'EVERYONE',
    usage: "gennumber (min) (max)",
    category: "funny",
    description: "Permet de générer un nombre entre les deux nombres choisis"
};

exports.run = async (bot, message, args) => {
    const DICE = bot.emoji.dice
    const b = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, le premier nombre doit être plus petit que le deuxième.\n **Utilisation:** \`${bot.prefix}gennumber [min] [max]\``)
        .setColor(bot.color)
        .setFooter(bot.footer);

    let min = args[0] ? parseInt(args[0]) : 0;
    let max = args[1] ? parseInt(args[1]) : 100;

    const result = Math.round(Math.random() * (max - min) + min);

    const embedMsg = new EmbedBuilder()
        .setColor(bot.color)
        .setFooter(bot.footer)
        .setTitle(`${DICE} Nombre aléatoire ${DICE}`)
        .setDescription(`**Nombre min:** ${min}\n**Nombre max:** ${max}\n**Résultat:** ${result}`);

    if (!(min < max)) {
        return message.reply({ embeds: [b] });
    }

    return message.channel.send({ embeds: [embedMsg] });
};
