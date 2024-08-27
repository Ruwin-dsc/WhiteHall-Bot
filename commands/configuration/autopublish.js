const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: "autopublish",
    category: 'configuration',
    description: "Permet d'activer/désactiver le mode autopublish pour envoyer les annonces du serveur automatiquement",
    utilisation: "autopublish [on/off]",
    permission: "ADMINISTRATOR"
}

exports.run = async (bot, message, args) => {

    const nondef = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}autopublish on/off\``)
        .setColor(bot.color)
        .setFooter(bot.footer);

    const c2 = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, l'autopublish est déjà désactivé !`)
        .setColor(bot.color)
        .setFooter(bot.footer);

    const c3 = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`) 
        .setDescription(`<@${message.author.id}>, l'autopublish est déjà activé !`)
        .setColor(bot.color)
        .setFooter(bot.footer);

    if (!args[0]) {
        return message.channel.send({ embeds: [nondef] });
    }

    if (args[0] === 'on') {
        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
            if (err) throw err;

            if (req.length < 1) {
                bot.db.query(`INSERT INTO configuration (guildID, autopublish) VALUES ("${message.guild.id}", "on")`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish activé`)
                    .setDescription(`<@${message.author.id}>, l'autopublish a bien été activé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return message.reply({ embeds: [success] });
            } else {
                const c = req[0].autopublish;
                if (c === 'on') {
                    return message.channel.send({ embeds: [c3] });
                }

                bot.db.query(`UPDATE configuration SET autopublish = 'on' WHERE guildID = ${message.guild.id}`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish activé`)
                    .setDescription(`<@${message.author.id}>, l'autopublish a bien été activé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return message.reply({ embeds: [success] });
            }
        });
    }

    if (args[0] === 'off') {
        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
            if (err) throw err;

            if (req.length < 1) {
                bot.db.query(`INSERT INTO configuration (guildID, autopublish) VALUES ("${message.guild.id}", "off")`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish désactivé`)
                    .setDescription(`<@${message.author.id}>, l'autopublish a bien été désactivé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return message.reply({ embeds: [success] });
            } else {
                const c = req[0].autopublish;
                if (c === 'off') {
                    return message.channel.send({ embeds: [c2] });
                }

                bot.db.query(`UPDATE configuration SET autopublish = 'off' WHERE guildID = ${message.guild.id}`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish désactivé`)
                    .setDescription(`<@${message.author.id}>, l'autopublish a bien été désactivé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return message.reply({ embeds: [success] });
            }
        });
    }

}