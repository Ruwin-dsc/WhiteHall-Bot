const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Discord = require("discord.js");

exports.help = {
    name: "soutien",
    category: 'configuration',
    description: "Permet de configurer le système de soutien",
    utilisation: "soutien",
    permission: "ADMINISTRATOR"
};

exports.run = async (bot, message, args) => {
    let roleId;
    let statut;
    let activate;
    let menumsg;
    let aa;
    function createSoutienEmbed(roleId, statut, activate) {
        const soutienembed = new EmbedBuilder()
            .setTitle(`Paramètre de Compteur`)
            .setColor(bot.color)
            .setFooter(bot.footer)
            .addFields(
                { name: `${bot.emoji.eyes}・Rôle soutien`, value: `<@&${roleId}>`, inline: true },
                { name: `${bot.emoji.information}・Statut`, value: statut, inline: true },
                { name: `${bot.emoji.slashcommands}・Module`, value: activate, inline: true }
            );
        return soutienembed;
    }

    function createSoutienButton(activate) {
        if (activate === "Activé") aa = "Désactiver"
        if (activate === "Désactivé") aa = "Activer"
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('rolesoutien')
                .setEmoji(bot.emoji.eyes)
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('statutsoutien')
                .setEmoji(bot.emoji.information)
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('activatesoutien')
                .setLabel(aa)
                .setStyle(ButtonStyle.Primary),
        );

        return button;
    }

    const activateEmbed = new EmbedBuilder()
        .setColor(bot.color)
        .setFooter(bot.footer)
        .setDescription(`Le module soutien a bien été activé !`);

    const deactivateEmbed = new EmbedBuilder()
        .setColor(bot.color)
        .setFooter(bot.footer)
        .setDescription(`Le module soutien a bien été désactivé !`);

    

    bot.db.query(`SELECT * FROM soutien WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if (err) {
            console.error('Erreur lors de la requête de la base de données:', err);
            return;
        }

        roleId = req.length < 1 ? "Non défini" : req[0].role;
        statut = roleId == `<@&${null}>` ? "Non défini" : req[0].statut;
        activate = req.length < 1 ? "Désactiver" : req[0].status === "on" ? "Activé" : "Désactivé";

        const soutienembed = createSoutienEmbed(roleId, statut, activate);

        let filter2 = (m) => m.author.id === message.author.id;

        const soutienbutton = createSoutienButton(activate);

       
        
        menumsg = await message.channel.send({ embeds: [soutienembed], components: [soutienbutton] });

        const collector = menumsg.createMessageComponentCollector({
            componentType: Discord.ComponentType.Button
        });
        collector.on('collect', async (interaction) => {
            interaction.deferUpdate()
            if (interaction.customId === 'rolesoutien') {

                
                const ez = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le rôle accordé aux membres qui auront le statut ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false });

                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                });

                var msg = collected.first();
                const mentionedRoles = msg.mentions.roles;
                const norole = new EmbedBuilder()
                    .setTitle(`${bot.emoji.deny}・Erreur`)
                    .setDescription(`<@${message.author.id}>, vous devez mentionner un rôle !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);

                if (mentionedRoles.size === 0) {
                    msg.delete();
                    ez.delete();
                    return message.reply({ embeds: [norole] });
                } else {
                    const role = mentionedRoles.first();
                    roleId = role.id;
                    msg.delete();
                    ez.delete();

                    
                    bot.db.query(`UPDATE soutien SET role = '${roleId}' WHERE guildId = ${message.guild.id}`)

                    const EmbedSoutien = createSoutienEmbed(roleId, statut, activate);
                    const soutienButton = createSoutienButton(activate);
                    menumsg.edit({ embeds: [EmbedSoutien], components: [soutienButton]});
                }
            }

            if (interaction.customId === 'statutsoutien') {
                const ez = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le statut ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false });

                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                });

                var msg = collected.first();
                const norole = new EmbedBuilder()
                    .setTitle(`${bot.emoji.deny}・Erreur`)
                    .setDescription(`<@${message.author.id}>, votre statut est trop long, il doit être minimum de 20 caractères !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);

                if (msg.content.length > 20) {
                    msg.delete();
                    ez.delete();
                    return message.reply({ embeds: [norole] });
                } else {
                    statut = msg.content;
                    msg.delete();
                    ez.delete();
                    bot.db.query(`UPDATE soutien SET statut = '${statut}' WHERE guildId = ${message.guild.id}`)
                    const EmbedSoutien = createSoutienEmbed(roleId, statut, activate);

                    const soutienButton = createSoutienButton(activate);
                    menumsg.edit({ embeds: [EmbedSoutien], components: [soutienButton] });
                }
            }

            if (interaction.customId === 'activatesoutien') {
                if (activate === "Désactivé") {
                    bot.db.query(`UPDATE soutien SET statut = '${statut}' WHERE guildId = ${message.guild.id}`)
                    bot.db.query(`UPDATE soutien SET role = '${roleId}' WHERE guildId = ${message.guild.id}`)
                    bot.db.query(`UPDATE soutien SET status = 'on' WHERE guildId = ${message.guild.id}`)
                    
                        activate = "Activé";

                        const soutienButton = createSoutienButton(activate);
                        const EmbedSoutien = createSoutienEmbed(roleId, statut, activate);
                        menumsg.edit({ embeds: [EmbedSoutien], components: [soutienButton] });
                        message.channel.send({ embeds: [activateEmbed] });
                    
                } else {
                    bot.db.query(`UPDATE soutien SET statut = '${statut}' WHERE guildId = ${message.guild.id}`)
                    bot.db.query(`UPDATE soutien SET role = '${roleId}' WHERE guildId = ${message.guild.id}`)
                    bot.db.query(`UPDATE soutien SET status = 'off' WHERE guildId = ${message.guild.id}`)
                    aa = "Activer"
                        activate = "Désactivé";
                        const soutienButton = createSoutienButton(activate);
                        const EmbedSoutien = createSoutienEmbed(roleId, statut, activate);
                        menumsg.edit({ embeds: [EmbedSoutien], components: [soutienButton] });
                        message.channel.send({ embeds: [deactivateEmbed] });
                    
                }
            }
        });
    });
};
