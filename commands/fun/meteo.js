const Discord = require("discord.js");
const weather = require('weather-js');

exports.help = {
    name: "meteo",
    category: "funny",
    description: 'Permet de voir la météo',
    utilisation: 'meteo [ville]',
    permission: 'EVERYONE'
};

exports.run = (bot, message, args) => {
    if (args.length === 0) {
        const c = new Discord.EmbedBuilder()
            .setTitle(`${bot.emoji.deny}・Erreur`)
            .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}meteo [ville]\``)
            .setColor(bot.color)
            .setFooter(bot.footer);
        return message.channel.send({ embeds: [c] });
    }

    weather.find({ search: args.join(" "), degreeType: 'C' }, function(err, result) {
        if (err || result.length === 0) {
            const b = new Discord.EmbedBuilder()
            .setTitle(`${bot.emoji.deny}・Erreur`)
            .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}meteo [ville]\``)
            .setColor(bot.color)
            .setFooter(bot.footer);
            return message.channel.send({ embeds: [b] });
        }

        const current = result[0].current;
        const location = result[0].location;

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${current.skytext}**`)
            .setTitle(`Météo de ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(bot.color)
            .addFields(
                { name: 'Timezone', value: `UTC${location.timezone}`, inline: true },
                { name: 'Type de degré', value: location.degreetype, inline: true },
                { name: 'Température', value: `${current.temperature} Degrés`, inline: true },
                { name: 'Ressenti', value: `${current.feelslike} Degrés`, inline: true },
                { name: 'Vent', value: current.winddisplay, inline: true },
                { name: 'Humidité', value: `${current.humidity}%`, inline: true }
            )
            .setTimestamp()
            .setFooter(bot.footer);

        message.channel.send({ embeds: [embed] });
    });
};
