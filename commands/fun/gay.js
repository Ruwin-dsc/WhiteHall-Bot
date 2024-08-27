const Discord = require("discord.js");

exports.help = {
    name: "gay",
    category: "funny",
    utilisation: 'gay (utilisateur)',
    description: 'Permet de voir le pourcentage de gay',
    permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
    const block = bot.emoji.blacksquare;
    const heart = "🏳️‍🌈";

    let user;
    if (message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
        user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
        if (!user) {
            let b = new Discord.EmbedBuilder()
                .setTitle(`${bot.emoji.deny}・Erreur`)
                .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}gay (utilisateur)\``)
                .setColor(bot.color)
                .setFooter(bot.footer);
            return message.reply({ embeds: [b] });
        }
    } else {
        user = message.user ? message.user : message.author;
    }

    let loveEmbed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`Niveau de **Gay** de __**${user} !**__ ${bot.emoji.rainbowflag}`)
        .addField(`Gay à :`, ship())
        .setFooter(bot.footer);

    message.reply({ embeds: [loveEmbed] });

    function ship() {
        const hearts = Math.floor(Math.random() * 10) + 0;
        const str = `${heart.repeat(hearts)}${block.repeat(10 - hearts)} ${hearts * 10}% !`;
        return str;
    }
};
