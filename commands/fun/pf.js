const Discord = require("discord.js");

exports.help = {
    name: "pf",
    category: "funny",
    description: "Permet de jouer à pile ou face",
    utilisation: "pf",
    permission: "EVERYONE"
};

exports.run = async (bot, message, args) => {
    let replies = [`Pile ${bot.emoji.coin}`, `Face ${bot.emoji.coin}`];
    let res = Math.floor(Math.random() * replies.length);
    
    let embed = new Discord.EmbedBuilder()
        .setTitle("Pile ou face ?")
        .setDescription(`La réponse est : **${replies[res]} !**`)
        .setColor(bot.color)
        .setFooter(bot.footer);

    message.reply({ embeds: [embed] });
};
