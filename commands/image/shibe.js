const Discord = require('discord.js');
const fetch = require('node-fetch');

exports.help = {
    name: "shibe",
    category: "image",
    description: "Envoie une image de shiba !!",
    utilisation: "shibe",
    permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
    try {
        const res = await fetch('http://shibe.online/api/shibes');
        const [img] = await res.json();

        const embed = new Discord.EmbedBuilder()
            .setTitle(`${bot.emoji.dog} Shibe !! ${bot.emoji.dog}`)
            .setImage(img)
            .setColor(bot.color)
            .setFooter(bot.footer)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    } catch (err) {
        message.reply("Merci de réessayer plus tard.");
    }
};
