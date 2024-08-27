const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")

exports.help = {
    name: 'presetlogs',
    utilisation: 'presetlogs',
    description: `Permet de créer automatiquement la catégorie des logs.`,
    category: 'logs',
    permission: 'ADMINISTRATOR'
};

exports.run = async (bot, message, args) => {


    bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
        if(req.length < 1) {
        bot.db.query(`INSERT INTO logs (guildID) VALUES ("${message.guild.id}")`)
        }
        
        message.channel.send(`Création de la **catégorie des logs** en cours...`).then(msge => {
            message.guild.channels.create({
                name: "📚・LOGS",
                type: Discord.ChannelType.GuildCategory,
                permissionsOverwrites: [{
                    id: message.guild.id,
                    deny: [Discord.PermissionsBitField.Flags.ViewChannel]
                }]
            }).then(c => {
                const createLogChannel = async (names, target) => {
                    const logs = await c.guild.channels.create({
                        name: names,
                        type: Discord.ChannelType.GuildText,
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: [Discord.PermissionsBitField.Flags.ViewChannel]
                            },
                        ],
                    });
                    bot.db.query(`UPDATE logs SET ${target} = '${logs.id}' WHERE guildID = ${message.guild.id}`);
                };

                createLogChannel('📁・logs-roles', 'role');
                createLogChannel('📁・logs-message', 'message');
                createLogChannel('📁・logs-antiraid', 'antiraid');
                createLogChannel('📁・logs-mods', 'mods');
                createLogChannel('📁・logs-boost', 'boostlogs');
                createLogChannel('📁・logs-vocaux', 'voice');
                createLogChannel('📁・logs-joinleave', 'joinleave');
                createLogChannel('📁・logs-channel', 'channel');
                createLogChannel('📁・logs-ban-unban', 'ban');
                createLogChannel('📁・logs-addbot', 'bot');
                createLogChannel('📁・logs-emojis', 'emojis');
                createLogChannel('📁・logs-invites', 'invitelogs');

                msge.edit(`Création de la **catégorie des logs** effectuée avec succès.`);
            });
        });
    });
};