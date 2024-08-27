const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const fs = require("fs")
const Discord = require("discord.js")


module.exports = {
  name: 'interactionCreate',
  async execute(interaction, bot) {
   
    if (interaction.customId == "close-ticket") {
        const guild = bot.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);
    
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setCustomId('confirm-close')
            .setLabel('Fermer le ticket')
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId('ticket-no')
            .setLabel('Annuler la fermeture')
            .setStyle(ButtonStyle.Secondary),
          );
          
        const verif = await interaction.reply({
          content: 'Êtes vous sûr de vouloir fermer le ticket ?',
          components: [row]
        });
      
        const collector = interaction.channel.createMessageComponentCollector({
          componentType: Discord.ComponentType.Button,
          time: 10000
        });
      
        collector.on('collect', i => {
          if (i.customId == 'confirm-close') {
            interaction.editReply({
              content: `Ticket fermé par <@!${interaction.user.id}>`,
              components: []
            });
          
            chan.edit({
                name: `fermé-${chan.name}`,
                permissionOverwrites: [
                  {
                    id: bot.users.cache.get(chan.topic),
                    deny: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                    id: interaction.guild.roles.everyone,
                    deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                  },
                ],
              })
              .then(async () => {
                const embed = new EmbedBuilder()
                  .setColor(bot.color)
                  .setDescription('```Ticket terminé```')
                  .setFooter(bot.footer)
                  .setTimestamp();
              
                const row = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                    .setCustomId('delete-ticket')
                    .setLabel('Supprimer le ticket')
                    .setEmoji('🗑️')
                    .setStyle(ButtonStyle.Danger),
                  );
                  
                chan.send({
                  embeds: [embed],
                  components: [row]
                });
              });
            
            collector.stop();
          };
          if (i.customId == 'ticket-no') {
            interaction.editReply({
              content: 'Fermeture du ticket annulé !',
              components: []
            });
            collector.stop();
          };
        });
      
        collector.on('end', (i) => {
          if (i.size < 1) {
            interaction.editReply({
              content: 'Fermeture du ticket annulé !',
              components: []
            });
          };
        });
    };

    if (interaction.customId == "delete-ticket") {
        const guild = bot.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);

        chan.edit({
          permissionOverwrites: [
            {
              id: bot.users.cache.get(chan.topic),
              deny: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
          ],
        })
    
        chan.send('Suppression du channel...');
    
        setTimeout(() => {
            chan.delete();
        }, 5000);
    }
    if (interaction.customId == "ticket-transcript") {
        const msgd = await interaction.channel.send({
          content: 'Récupération des messages du ticket, cela peut prendre un certain temps...',
      }) 
    }

  }}