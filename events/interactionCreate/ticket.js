const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, bot) {
    if(interaction.values == "tun"){
      return interaction.reply(`${interaction.guild.ownerId} Cet forme de ticket n'est plus disponible. Faîtes la commande \`setticket\` pour les reconfigurer\nSi vous avez besoin d'aide le support est toujours là https://discord.gg/7xFnasnrtf !\nMerci d'utiliser le bot !`)
    }
    if(interaction.values == "tdeux"){
      return interaction.reply(`${interaction.guild.ownerId} Cet forme de ticket n'est plus disponible. Faîtes la commande \`setticket\` pour les reconfigurer\nSi vous avez besoin d'aide le support est toujours là https://discord.gg/7xFnasnrtf !\nMerci d'utiliser le bot !`)
    }
    if(interaction.values == "ttrois"){
      return interaction.reply(`${interaction.guild.ownerId} Cet forme de ticket n'est plus disponible. Faîtes la commande \`setticket\` pour les reconfigurer\nSi vous avez besoin d'aide le support est toujours là https://discord.gg/7xFnasnrtf !\nMerci d'utiliser le bot !`)
    }
    if(interaction.values == "tquatre"){
      return interaction.reply(`${interaction.guild.ownerId} Cet forme de ticket n'est plus disponible. Faîtes la commande \`setticket\` pour les reconfigurer\nSi vous avez besoin d'aide le support est toujours là https://discord.gg/7xFnasnrtf !\nMerci d'utiliser le bot !`)
    }
    
    if (interaction.customId == "claim-ticket") {
      const guild = bot.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);

        chan.permissionOverwrites.set([
            {
              id: bot.users.cache.get(chan.topic),
              allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: bot.users.cache.get(interaction.user.id),
              allow: [Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
          ]);
        chan.send(`<@!${interaction.user.id}> a claim le ticket !`)
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'TicketChannel') {

        let category;
        let transcriptmp;
        let boutonclaim;

      bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${interaction.guild.id}"`, async (err, req) => {
        if(req.length < 1) {
          return
        } else {
            if(req[0].categoryId == null) return
            category = req[0].categoryId
            if(req[0].transcriptmp == "off") transcriptmp = "off"
            if(req[0].transcriptmp == "on") transcriptmp = "on"
            if(req[0].boutonclaim == "off") boutonclaim = "off"
            if(req[0].boutonclaim == "on") boutonclaim = "on"

        }
      })


      const selectedValue = interaction.values[0];

      const regex = /^(\d+)-ticket$/;
      const match = selectedValue.match(regex);
      if (match) {
        const optionIndex = parseInt(match[1]);//ici pk -1 ? att 0 - 1 = -1, -1++ = -2 MDRR SA MARCHE jsuis trop con ma souris n'a plus de batterie au passage faut là faut faire le hel p pour les slash et
        // prefix faut que je fasse un moyen pour que ça mette auto
        // Je t'ai dis enève le -1 sa marche gg jsuis le boss
        bot.db.query(`SELECT * FROM ticketoptions WHERE guildId = "${interaction.guild.id}"`, async (err, req) => {
          if (req.length > optionIndex) {
            const selectedOption = req[optionIndex];

            if (selectedOption.roleacess) {
              const roles = selectedOption.roleacess.split(' ')
                .map(role => role.replace(/<@&|>/g, ''));

              const rolePermissions = roles.map(roleId => ({
                id: roleId,
                allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
              }));

              interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                parent: category,
                topic: interaction.user.id,
                type: Discord.ChannelType.GuildText,
                permissionOverwrites: [
                  {
                    id: interaction.user.id,
                    allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
                  },
                  ...rolePermissions,
                  {
                    id: interaction.guild.roles.everyone,
                    deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                  },
                ],
              }).then(async c => {
                interaction.reply({
                  content: `Le ticket a été créé avec succès ! <#${c.id}>`,
                  ephemeral: true
                });

                let desc;
                if(selectedOption.msgouverture == "aucun") desc = `<@${interaction.user.id}> a créé un ticket ! \n> Merci d'**attendre** un membre du staff !`
                if(selectedOption.msgouverture !== "aucun") desc = selectedOption.msgouverture + "!"
              
                const embed = new EmbedBuilder()
                                    .setColor(bot.color)
                                    .setTitle(`${selectedOption.emoji}・${selectedOption.texte}`)
                                    .setDescription(`${desc}`)
                                    .setFooter(bot.footer)
                                    .setTimestamp();
                            
                const row = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('close-ticket')
                    .setLabel('Fermer')
                    .setEmoji(bot.emoji.locked)
                    .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                    .setCustomId('ticket-transcript')
                    .setLabel('Transcript')
                    .setEmoji(bot.emoji.memo)
                    .setStyle(ButtonStyle.Success)
                );
                  
                if (boutonclaim === "on") {
                  row.addComponents(
                    new ButtonBuilder()
                      .setCustomId('claim-ticket')
                      .setLabel('Claim')
                      .setEmoji('⚠️')
                      .setStyle(ButtonStyle.Success)
                  )
                }
                  

                                
                const opened = await c.send({
                  content: `<@!${interaction.user.id}> || ${selectedOption.rolemention} ||`,
                  embeds: [embed],
                  components: [row]
                });
                              
                opened.pin().then(() => {
                  opened.channel.bulkDelete(1);
                });
             });
            } 
          } 
        });
      } 
    }
  }
}