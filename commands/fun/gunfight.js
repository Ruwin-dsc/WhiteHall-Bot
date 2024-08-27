const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Discord = require('discord.js')

exports.help = {
    name: 'gunfight',
    category: "funny",
    utilisation: 'gunfight [membre]',
    description: 'Permet de faire un combat de pistolet',
    permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
    const opponent = message.mentions.users.first();
    const b = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}fight [@utilisateur]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
    if (!opponent) return message.reply({embeds: [b]});

    const positions = {
        three: `_ _ <@${message.author.id}> :levitate: :point_right: **3** :point_left: :levitate: <@${opponent.id}>`,
        two: `_ _ <@${message.author.id}> :levitate: :point_right: **2** :point_left: :levitate: <@${opponent.id}>`,
        one: `_ _ <@${message.author.id}> :levitate: :point_right: **1** :point_left: :levitate: <@${opponent.id}>`,
        go: `_ _ <@${message.author.id}> :levitate: :point_right: **GO!** :point_left: :levitate: <@${opponent.id}>`,
        ended1: `_ _ :levitate: :point_right: **STOP!** :skull_crossbones: :levitate:`,
        ended2: `_ _ :levitate: :skull_crossbones: **STOP!** :point_left: :levitate: `,
    };

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('shoot1')
                .setLabel('Shoot!')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('useless')
                .setLabel('\u200b')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('shoot2')
                .setLabel('Shoot!')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true)
        );

    const msg = await message.channel.send({
        content: positions.three,
        components: [row],
    });

    function countdown() {
        setTimeout(() => {
            msg.edit({
                content: positions.two,
                components: [row],
            });
        }, 1000);
        setTimeout(() => {
            msg.edit({
                content: positions.one,
                components: [row],
            });
        }, 2000);
        setTimeout(() => {
            row.components[0].setDisabled(false);
            row.components[2].setDisabled(false);
            msg.edit({
                content: positions.go,
                components: [row],
            });
        }, 3000);
    }

    countdown();

    const filter = (button) => {
        return button.user.id === message.author.id || button.user.id === opponent.id;
    };

    const collector = msg.createMessageComponentCollector({ filter, componentType: Discord.ComponentType.Button, max: 1 });

    collector.on('collect', (button) => {
        row.components[0].setDisabled(true);
        row.components[2].setDisabled(true);

        if (button.customId === 'shoot1' && button.user.id === message.author.id) {
            msg.edit({
                content: positions.ended1,
                components: [row],
            });
            button.reply({ content: `<@${message.author.id}> a gagné !` });
        } else if (button.customId === 'shoot2' && button.user.id === opponent.id) {
            msg.edit({
                content: positions.ended2,
                components: [row],
            });
            button.reply({ content: `<@${opponent.id}> a gagné!` });
        }
    });
};
