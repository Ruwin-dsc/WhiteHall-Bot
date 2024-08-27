const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuOptionBuilder, ButtonStyle } = require('discord.js');
const { Util } = require('discord.js');
const Discord = require("discord.js")

exports.help = {
    name:"setticket",
    category: 'configuration',
    description: "Permet de configurer les tickets",
    utilisation: "setticket",
    aliases: ["ticket"],
    permission: "ADMINISTRATOR"
} 

exports.run = async (bot, message, args) => {
    function createTicketEmbed(channel, category, messageId, transcriptmp, boutonclaim) {
        const embedTicket = new EmbedBuilder()
          .setTitle(`Configuration des TICKETS`)
          .setDescription(`Bienvenue dans le pannel de configuration du bot <@${bot.user.id}> ! Utilise le Select Menu pour configurer les tickets`)
          .addFields(
            { name: `Salon`, value: `${channel}`, inline: true },
            { name: `Catégorie`, value: `${category}`, inline: true },
            { name: `Message`, value: `${messageId}`, inline: true },
            { name: `Transcript MP`, value: `${transcriptmp}`, inline: true },
            { name: `Bouton Claim`, value: `${boutonclaim}`, inline: true },
            { name: `Options`, value: `Clique sur le menu ${bot.emoji.gear} Options`, inline: true },
          )
          .setColor(bot.color)
          .setFooter(bot.footer);
      
        return embedTicket;
      }

      function createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess) {
        const embedOptionss = new EmbedBuilder()
          .setTitle(`Configuration des Options`)
          .setDescription(`Bienvenue dans le pannel de configuration du bot <@${bot.user.id}> ! Utilise le Select Menu pour configurer les tickets`)
          .addFields(
            { name: `Texte (Titre)`, value: `${text}`, inline: true },
            { name: `Emoji`, value: `${emoji}`, inline: true },
            { name: `Description`, value: `${descriptionselect}`, inline: true },
            { name: `Message d'ouverture de ticket`, value: `${msgouverture}`, inline: true },
            { name: `Rôles mentionnés`, value: `${rolemention}`, inline: true },
            { name: `Rôles ayant accès`, value: `${roleacess}`, inline: true },
          )
          .setColor(bot.color)
          .setFooter(bot.footer);
      
        return embedOptionss;
      }


   const troplong = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, votre choix est trop long, il peut contenir seulement 100 caractères !`)
    .setColor(bot.color)
    .setFooter(bot.footer)
 
    const troplong2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, votre choix est trop long, il peut contenir seulement 2048 caractères !`)
    .setColor(bot.color)
    .setFooter(bot.footer)



    const config = new EmbedBuilder()
    .setDescription(`<@${message.author.id}>, votre choix a bien été sauvegardé ! Vous pouvez dès maintenant utiliser le boutton rafraîchir pour voir votre configuration !`)
    .setColor(bot.color)
    .setFooter(bot.footer)

    let menuoptions1 = new StringSelectMenuBuilder()
    .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Choisis une option")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("Ajouter une option")
                .setValue("addoption")
                .setDescription('Ajouter une option')
                .setEmoji(bot.emoji.plus),
            new StringSelectMenuOptionBuilder()
                .setLabel("Retire une option")
                .setValue("removeoption")
                .setDescription('Retirer une option')
                .setEmoji(bot.emoji.moins),
            new StringSelectMenuOptionBuilder()
                .setLabel("Liste des options")
                .setValue("listoption")
                .setDescription('Liste des options')
                .setEmoji(bot.emoji.book),
        )

    let menuoptions = new StringSelectMenuBuilder()
    .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Choisis une option")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("Salon")
                .setValue("salonticket")
                .setDescription('Permet de spécifier le salon du ticket')
                .setEmoji(bot.emoji.channel),
            new StringSelectMenuOptionBuilder()
                .setLabel("Catégorie")
                .setValue("categorieticket")
                .setDescription('Permet de spécifier la catégorie des tickets')
                .setEmoji(bot.emoji.category),
            new StringSelectMenuOptionBuilder()
                .setLabel("Message")
                .setValue("messageticket")
                .setDescription('Permet de spécifier le message du ticket')
                .setEmoji(bot.emoji.message),
            new StringSelectMenuOptionBuilder()
                .setLabel("Transcript MP")
                .setValue("transcriptticket")
                .setDescription('Permet d\'activer/désactiver les transcripts en Message Privé')
                .setEmoji(bot.emoji.transcript),
            new StringSelectMenuOptionBuilder()
                .setLabel("Boutton Claim")
                .setValue("buttonclaimticket")
                .setDescription('Permet d\'activer/désactiver les bouttons claim en message privé')
                .setEmoji(bot.emoji.button),
            new StringSelectMenuOptionBuilder()
                .setLabel("Options")
                .setValue("optionticket")
                .setDescription('Permet d\'indiquer les options du ticket')
                .setEmoji(bot.emoji.gear),   
        )

        let menuoptions3 = new StringSelectMenuBuilder()
    .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Choisis une option")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("Texte (titre)")
                .setValue("titleticket")
                .setDescription('Permet de spécifier le titre du menu')
                .setEmoji(bot.emoji.eye_speech),
            new StringSelectMenuOptionBuilder()
                .setLabel("Emoji")
                .setValue("emojiticket")
                .setDescription('Permet de spécifier l\'emoji du menu.')
                .setEmoji(bot.emoji.zanyface),
            new StringSelectMenuOptionBuilder()
                .setLabel("Description")
                .setValue("descriptionticket")
                .setDescription('Permet de spécifier la description du menu')
                .setEmoji(bot.emoji.message),
            new StringSelectMenuOptionBuilder()
                .setLabel("Message d'ouverture")
                .setValue("msgouvertureticket")
                .setDescription('Permet de spécifier le Message d\'ouverture du ticket')
                .setEmoji(bot.emoji.snake),
            new StringSelectMenuOptionBuilder()
                .setLabel("Rôles mentionnés")
                .setValue("rolementticket")
                .setDescription('Permet de spécifier les rôles mentionner du ticket')
                .setEmoji(bot.emoji.ampoule),
            new StringSelectMenuOptionBuilder()
                .setLabel("Rôles ayant accès")
                .setValue("roleacessticket")
                .setDescription('Permet de spécifier les rôles ayant accès au ticket')
                .setEmoji(bot.emoji.laptop),         
        )

        const saveButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('savetickett')
                            .setLabel('Sauvegarder')
                            .setStyle(ButtonStyle.Success)
                    )




       
        let channel;
        let category;
        let messageId;
        let transcriptmp;
        let boutonclaim;
        
        bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
          if (req.length < 1) {
            channel = "Non défini";
            category = "Non défini";
            messageId = "Non défini";
            transcriptmp = ":x:";
            boutonclaim = ":x:";
          } else {
            channel = `<#${req[0].channelId}>`;
            if(channel == `<#${null}>`) channel = "Non défini"
            category = `<#${req[0].categoryId}>`;
            if(category == `<#${null}>`) category = "Non défini"
            messageId = req[0].messageId;
            if(messageId == null) messageId = "Non défini"
            transcriptmp = req[0].transcriptmp;
            if(transcriptmp == "off") transcriptmp = ":x:"
            if(transcriptmp == "on") transcriptmp = ":white_check_mark:"
            boutonclaim = req[0].boutonclaim;
            if(boutonclaim == "off") boutonclaim = ":x:"
            if(boutonclaim == "on") boutonclaim = ":white_check_mark:"
          }
        
          const embedTicket = createTicketEmbed(channel, category, messageId, transcriptmp, boutonclaim, bot);

          const refreshButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('refreshButton')
                            .setLabel('Rafraîchir')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId('activateticket')
                        .setLabel('Activer les tickets')
                        .setStyle(ButtonStyle.Success)
                    )

          menumsg = await message.channel.send({ embeds: [embedTicket], components: [new ActionRowBuilder().addComponents([menuoptions]), refreshButton] });
        

    let msg = menumsg


    let filter2 = (m) => m.author.id === message.author.id

    let filter1 = (i) => i.user.id === message.author.id;
    
    const col = await msg.createMessageComponentCollector({
        filter: filter1,
        componentType: Discord.ComponentType.StringSelect
    })

    const collector = msg.createMessageComponentCollector({
        componentType: Discord.ComponentType.Button,
      });
      
      collector.on('collect', async (interaction) => {
        interaction.deferUpdate()
        if (interaction.customId === 'refreshButton') {
          
            let channel;
            let category;
            let messageId;
            let transcriptmp;
            let boutonclaim;
            
            bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
              if (req.length < 1) {
                channel = "Non défini";
                category = "Non défini";
                messageId = "Non défini";
                transcriptmp = ":x:";
                boutonclaim = ":x:";
              } else {
                channel = `<#${req[0].channelId}>`;
                if(channel == `<#${null}>`) channel = "Non défini"
                category = `<#${req[0].categoryId}>`;
                if(category == `<#${null}>`) category = "Non défini"
                messageId = req[0].messageId;
                if(messageId == null) messageId = "Non défini"
                transcriptmp = req[0].transcriptmp;
                if(transcriptmp == "off") transcriptmp = ":x:"
                if(transcriptmp == "on") transcriptmp = ":white_check_mark:"
                boutonclaim = req[0].boutonclaim;
                if(boutonclaim == "off") boutonclaim = ":x:"
                if(boutonclaim == "on") boutonclaim = ":white_check_mark:"
              }
            
              const embedTicket = createTicketEmbed(channel, category, messageId, transcriptmp, boutonclaim, bot);
              const refreshButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('refreshButton')
                            .setLabel('Rafraîchir')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId('activateticket')
                        .setLabel('Activer les tickets')
                        .setStyle(ButtonStyle.Success)
                    )
    
             await msg.edit({ embeds: [embedTicket], components: [new ActionRowBuilder().addComponents([menuoptions]), refreshButton] });
            })
          }

          if (interaction.customId === 'activateticket') {
            bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
              if (req.length < 1) {
                return message.reply(`Merci d'indiquer les configurations !`);
              } else {
                if (req[0].channelId == null) return message.reply(`Le salon des tickets n'a pas été défini !`);
                if (req[0].categoryId == null) return message.reply(`La catégorie des tickets n'a pas été défini !`);
                if (req[0].messageId == null) return message.reply(`Le message des tickets n'a pas été défini !`);
          
                const messageid = req[0].messageId;
                const channelmsgid = req[0].salonmsgId;
                const salonticket = req[0].channelId;
          
                bot.db.query(`SELECT * FROM ticketoptions WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                  if (req.length < 1) {
                    return message.reply(`Vous devez indiquer au moins une option !`);
                  } else {
                    const messageId = messageid;
                    const channelId = channelmsgid;
                    const channel = message.guild.channels.cache.get(channelId);
          
                    let menuOption = []; 
                    for (let i = 0; i < req.length; i++) {
                      
                      const option = req[i];
                      let descriptionpourleselects = option.descriptionselect;
                      if (descriptionpourleselects == "aucun") descriptionpourleselects = "‎";
                      menuOption.push({ 
                        name: `${option.texte}`, // Quand j'arr
                        value: `${i}-ticket`, 
                        description: `${descriptionpourleselects}`, 
                        emoji: `${option.emoji}`
                      }); 
                    }


                    let menuSelect = new StringSelectMenuBuilder()
                      .setCustomId('TicketChannel')
                      .setPlaceholder("Sélectionne ton ticket !")
                      .addOptions(menuOption.map(opt => {
                        return {
                          label: opt.name,
                          value: opt.value,
                          description: opt.description,
                          emoji: opt.emoji
                        }
                      }))
                 
             
          
                    if (channel) {
                      try {
                        const messageManager = channel.messages;
                        const message = await messageManager.fetch(messageId);
                        const ticketsalon = message.guild.channels.cache.get(salonticket);
          
                        if (message) {
                       
                          if (message.embeds.length > 0) {
                            const originalEmbed = message.embeds[0];
                            const copyEmbed = new EmbedBuilder(originalEmbed);
                            return await ticketsalon.send({ embeds: [copyEmbed], components: [new ActionRowBuilder().addComponents([menuSelect])] });
                          }
                          await ticketsalon.send({ content: message.content, components: [new ActionRowBuilder().addComponents([menuSelect])] });
          
            
                        } else {
                          console.log('Le message spécifié n\'existe pas.');
                        }
                      } catch (error) {
                        message.channel.send('Une erreur s\'est produite lors de la copie du message !');
                        console.log(error);
                      }
                    } else {
                      message.channel.send('Le salon spécifié n\'existe pas ou n\'est pas un salon "texte".');
                    }
                  }
                });
              }
            });
          }
          
          
      });


    col.on("collect", async (i) => {
        i.deferUpdate()

        if (i.values[0] == "salonticket") {
            const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le salon où sera envoyé les message du Ticket ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
            let collected = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                errors: ["time"]
            }).then(async (collected) => {

                var msg = collected.first();
              const channelo = i.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
            if(!channelo) { 
                const nochannel = new EmbedBuilder()
                .setTitle(`${bot.emoji.deny}・Erreur`)
                .setDescription(`<@${message.author.id}>, le salon que vous avez indiqué est invalide !`)
                .setColor(bot.color)
                .setFooter(bot.footer) 

                            message.channel.send({embeds: [nochannel]});
                            msg.delete()
                            return ez.delete()
            }

            bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(err) throw err;
            
                if(req.length < 1){
                    bot.db.query(`INSERT INTO ticketconfig (guildId, channelId) VALUES ("${message.guild.id}", "${channelo.id}")`)
                    msg.delete()
                    ez.delete()
                    message.channel.send({embeds: [config]})
                } else {
            bot.db.query(`UPDATE ticketconfig SET channelId = '${channelo.id}' WHERE guildId = ${message.guild.id}`.replace("<#", "").replace(">", ""))
            msg.delete()
            ez.delete()
            message.channel.send({embeds: [config]})
        }
    })      
        })}

        if (i.values[0] == "categorieticket") {
            const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est la catégorie des tickets ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
            let collected = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                
                errors: ["time"]
            }).then(async (collected) => {

                var msg = collected.first();
              const categeryo = i.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
            if(!categeryo) { 
                const nochannel = new EmbedBuilder()
                .setTitle(`${bot.emoji.deny}・Erreur`)
                .setDescription(`<@${message.author.id}>, la catégorie que vous avez indiqué est invalide !`)
                .setColor(bot.color)
                .setFooter(bot.footer) 

                            message.channel.send({embeds: [nochannel]});
                            msg.delete()
                            return ez.delete()
            }


            bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(err) throw err;
            
                if(req.length < 1){
                    bot.db.query(`INSERT INTO ticketconfig (guildId, categoryId) VALUES ("${message.guild.id}", "${categeryo.id}")`)
                    msg.delete()
                    ez.delete()
                    message.channel.send({embeds: [config]})
                } else {
            bot.db.query(`UPDATE ticketconfig SET categoryId = '${categeryo.id}' WHERE guildId = ${message.guild.id}`.replace("<#", "").replace(">", ""))
            msg.delete()
            ez.delete()
            message.channel.send({embeds: [config]})
        }
    })      
        })}

        if (i.values[0] == "messageticket") {
            const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le salon du message du ticket ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
            let collected = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                
                errors: ["time"]
            }).then(async (collected) => {

                var msg = collected.first();
              const channelo = i.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
            if(!channelo) { 
                const nochannel = new EmbedBuilder()
                .setTitle(`${bot.emoji.deny}・Erreur`)
                .setDescription(`<@${message.author.id}>, le salon que vous avez indiqué est invalide !`)
                .setColor(bot.color)
                .setFooter(bot.footer) 

                            message.channel.send({embeds: [nochannel]});
                            msg.delete()
                            return ez.delete()
            }

            const ezz = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est l'identifiant du message du ticket ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
            let collected3 = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                
                errors: ["time"]
            }).then(async (collected2) => {
                try { 

                var msgg = collected2.first();
                var fetchedMessage = await channelo.messages.fetch(collected2.first().content)
            if(!fetchedMessage) { 
                const nochannel = new EmbedBuilder()
                .setTitle(`${bot.emoji.deny}・Erreur`)
                .setDescription(`<@${message.author.id}>, le message que vous avez indiqué est invalide !`)
                .setColor(bot.color)
                .setFooter(bot.footer) 

                            message.channel.send({embeds: [nochannel]});
                            msg.delete()
                            msgg.delete()
                            ez.delete()
                     return ezz.delete()
            }
        } catch(e) {
            const nochannel = new EmbedBuilder()
                .setTitle(`${bot.emoji.deny}・Erreur`)
                .setDescription(`<@${message.author.id}>, le message que vous avez indiqué est invalide !`)
                .setColor(bot.color)
                .setFooter(bot.footer) 

                            message.channel.send({embeds: [nochannel]});
                            msg.delete()
                            msgg.delete()
                            ez.delete()
                     return ezz.delete()
        }

            bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(err) throw err;
            
                if(req.length < 1){
                    bot.db.query(`INSERT INTO ticketconfig (guildId, salonmsgId, messageId) VALUES ("${message.guild.id}", "${channelo.id}", "${msgg}")`)
                    msg.delete()
                    ez.delete()
                    message.channel.send({embeds: [config]})
                } else {
            bot.db.query(`UPDATE ticketconfig SET salonmsgId = '${channelo.id}' WHERE guildId = ${message.guild.id}`.replace("<#", "").replace(">", ""))
            bot.db.query(`UPDATE ticketconfig SET messageId = '${msgg}' WHERE guildId = ${message.guild.id}`.replace("<#", "").replace(">", ""))
            msg.delete()
            msgg.delete()
            ez.delete()
            ezz.delete()
            message.channel.send({embeds: [config]})
        }
    })      
}) })}

if (i.values[0] == "transcriptticket") {
    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Souhaitez-vous activer ou désactiver les transcripts en message privé ?\n*Indiquer \`on\` pour activer et \`off\` pour désactiver.*`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
    let collected = await message.channel.awaitMessages({
        filter: filter2,
        max: 1,
        
        errors: ["time"]
    }).then(async (collected) => {

        var msgj = collected.first();
        var msg = collected.first().content;
    if(msg !== 'on' && msg !== 'off') { 
        const nochannel = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, le choix que vous avez indiquer est invalide ! Merci d'indiquer \`on\` pour activer et \`off\` pour désactiver.`)
        .setColor(bot.color)
        .setFooter(bot.footer) 

                    message.channel.send({embeds: [nochannel]});
                    msgj.delete()
                    return ez.delete()
    }


    bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(err) throw err;
    
        if(req.length < 1){
            bot.db.query(`INSERT INTO ticketconfig (guildId, transcriptmp) VALUES ("${message.guild.id}", "${msg}")`)
            msg.delete()
            ez.delete()
            message.channel.send({embeds: [config]})
        } else {
    bot.db.query(`UPDATE ticketconfig SET transcriptmp = '${msg}' WHERE guildId = ${message.guild.id}`.replace("<#", "").replace(">", ""))
    msgj.delete()
    ez.delete()
    message.channel.send({embeds: [config]})
}
})      
})}

if (i.values[0] == "buttonclaimticket") {
    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Souhaitez-vous activer ou désactiver le bouton claim ?\n*Indiquer \`on\` pour activer et \`off\` pour désactiver.*`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
    let collected = await message.channel.awaitMessages({
        filter: filter2,
        max: 1,
        
        errors: ["time"]
    }).then(async (collected) => {

        var msgj = collected.first();
        var msg = collected.first().content;
    if(msg !== 'on' && msg !== 'off') { 
        const nochannel = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, le choix que vous avez indiquer est invalide ! Merci d'indiquer \`on\` pour activer et \`off\` pour désactiver.`)
        .setColor(bot.color)
        .setFooter(bot.footer) 

                    message.channel.send({embeds: [nochannel]});
                    msgj.delete()
                    return ez.delete()
    }


    bot.db.query(`SELECT * FROM ticketconfig WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(err) throw err;
    
        if(req.length < 1){
            bot.db.query(`INSERT INTO ticketconfig (guildId, boutonclaim) VALUES ("${message.guild.id}", "${msg}")`)
            msg.delete()
            ez.delete()
            message.channel.send({embeds: [config]})
        } else {
    bot.db.query(`UPDATE ticketconfig SET boutonclaim = '${msg}' WHERE guildId = ${message.guild.id}`.replace("<#", "").replace(">", ""))
    msgj.delete()
    ez.delete()
    message.channel.send({embeds: [config]})
}
})      
})}










if (i.values[0] == "optionticket") {


    const embedoptions = new EmbedBuilder()
    .setTitle(`Configuration des options`)
    .setDescription(`
    Bienvenue dans le pannel de configuration du bot <@${bot.user.id}> ! Utilise le select Menu pour configurer les tickets.

    > ${bot.emoji.plus} Ajouter une option
    > ${bot.emoji.moins} Retirer une option
    > ${bot.emoji.book} Liste des options
    `)
    .setColor(bot.color)
    .setFooter(bot.footer)

    const optionmenu = await message.channel.send({ embeds: [embedoptions], components: [new ActionRowBuilder().addComponents([menuoptions1])] })

    let filter2 = (m) => m.author.id === message.author.id

    let filter1 = (i) => i.user.id === message.author.id;
    
    const collectoroptions = await optionmenu.createMessageComponentCollector({
        filter: filter1,
        componentType: Discord.ComponentType.StringSelect
    })
      
      collectoroptions.on('collect', async (interaction) => {
        interaction.deferUpdate()

        if (interaction.values[0] == "removeoption") {
            const ez = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le titre du menu à supprimer?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
            let collected = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                
                errors: ["time"]
            }).then(async (collected) => {
                var msg = collected.first();

                bot.db.query(`SELECT * FROM ticketoptions WHERE guildId = "${message.guild.id}" AND texte = "${msg.content}"`, async (err, req) => {
                    if(req.length < 1) {
                        const noreq = new EmbedBuilder()
                        .setTitle(`${bot.emoji.deny}・Erreur`)
                        .setDescription(`<@${message.author.id}>, le menu n'a pas été trouvé merci de rentrer correctement la commande !`)
                        .setColor(bot.color)
                        .setFooter(bot.footer)

                        ez.delete()
                        msg.delete()
                        interaction.channel.send({embeds: [noreq]})
                        

                    } else {
                        ez.delete()
                        msg.delete()
                        const deleted = new EmbedBuilder()
                        .setColor(bot.color)
                        .setFooter(bot.footer)
                        .setDescription(`Le menu ${msg.content} a bien été supprimé !`)
                        bot.db.query(`DELETE FROM ticketoptions WHERE guildId = "${message.guild.id}" AND texte = "${msg.content}"`)

                        interaction.channel.send({embeds: [deleted]})
                    }
                })
            })
        }

        if (interaction.values[0] === "listoption") {
            bot.db.query(`SELECT * FROM ticketoptions WHERE guildId = "${message.guild.id}"`, async (err, req) => {
              if (req.length < 1) {
                const noreq = new EmbedBuilder()
                  .setTitle(`${bot.emoji.deny}・Erreur`)
                  .setDescription(`<@${message.author.id}>, il n'y a aucun menu qui a été créé !`)
                  .setColor(bot.color)
                  .setFooter(bot.footer);
                interaction.channel.send({ embeds: [noreq] });
              } else {
                let description = "";
                for (let i = 0; i < req.length; i++) {
                  description += `Menu ${i + 1} : Titre: ${req[i].texte}, Emoji: ${req[i].emoji}\n`;
                }
          
                const sc = new EmbedBuilder()
                  .setColor(bot.color)
                  .setFooter(bot.footer)
                  .setDescription(description);
          
                interaction.channel.send({ embeds: [sc] });
              }
            });
          }
          
        if (interaction.values[0] == "addoption") {

            let emoji;
            let msgouverture;
            let descriptionselect;
            let text;
            let rolemention;
            let rolementiondb;
            let roleacess;
            let roleacessdb;
            
    
                emoji = "Non défini";
                msgouverture = "aucun";
                descriptionselect = "aucun";
                text = "Non défini";
                rolemention = "Non défini";
                roleacess = "Non défini";
                

              const embedOptionss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);

        
            const menumsg3 = await message.channel.send({ embeds: [embedOptionss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton] })

            let filter2 = (m) => m.author.id === message.author.id

            let filter1 = (i) => i.user.id === message.author.id;
            
            const collectoroptionss = await menumsg3.createMessageComponentCollector({
                filter: filter1,
                componentType: Discord.ComponentType.StringSelect
            })

            const collector2 = menumsg3.createMessageComponentCollector({
                componentType: Discord.ComponentType.Button,
                 
              });

              collector2.on('collect', async (interactione) => {
                interactione.deferUpdate();
              
                if (interactione.customId === 'savetickett') {
                  if (emoji == "Non défini") {
                    message.reply({ content: `Vous n'avez pas défini l'emoji du menu ! Merci de le spécifier`, ephemeral: true });
                    return;
                  } 
                if (text == "Non défini") {
                                    message.reply({ content: `Vous n'avez pas défini le titre du menu ! Merci de le spécifier`, ephemeral: true });
                                    return;
                                } 
                if (rolemention == "Non défini") {
                                    message.reply({ content: `Vous n'avez pas défini les rôles mentionnés du ticket ! Merci de le spécifier`, ephemeral: true });
                                    return;
                                } 
                if (roleacess == "Non défini") {
                                    message.reply({ content: `Vous n'avez pas défini les rôles qui ont accès au ticket ! Merci de le spécifier`, ephemeral: true });
                                    return;
                                } 
 
              
                  bot.db.query(`SELECT * FROM ticketoptions WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if (req.length > 15) {
                        message.reply({ content: `Il y a trop de menus !`, ephemeral: true });
                      return;
                    }
              
                    bot.db.query(`SELECT * FROM ticketoptions WHERE guildId = "${message.guild.id}" AND texte = "${text}"`, async (err, req) => {
                      if (req.length > 0) {
                        message.reply({ content: `Le titre que vous avez désigné existe déjà ! Merci de le changer`, ephemeral: true });
                        return;
                      }
              
                      bot.db.query(`INSERT INTO ticketoptions (guildId, emoji, msgouverture, texte, rolemention, roleacess, descriptionselect) VALUES ("${message.guild.id}", "${emoji}", "${msgouverture}", "${text}", "${rolementiondb}", "${roleacessdb}", "${descriptionselect}")`);
              
                      message.reply({ content: `Menu de ticket sauvegardé avec succès !`, ephemeral: true });
                    });
                  });
                }
              });
              
              
              
              collectoroptionss.on('collect', async (a) => {
                a.deferUpdate()
                if (a.values[0] == "titleticket") {
                    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel sera le titre du menu ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        
                        errors: ["time"]
                    }).then(async (collected) => {
                
                        var msgj = collected.first();
                
                        if(msgj.content.length > 100) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [troplong]})
                        }
                
                        text = msgj.content
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})

                    })
                }
                if (a.values[0] == "descriptionticket") {
                    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel sera la description du menu ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        
                        errors: ["time"]
                    }).then(async (collected) => {
                
                        var msgj = collected.first();
                
                        if(msgj.content.length > 100) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [troplong]})
                        }
                
                        descriptionselect = msgj.content
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})

                    })
                }
                if (a.values[0] == "emojiticket") {
                    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel sera l'emoji du menu ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        
                        errors: ["time"]
                    }).then(async (collected) => {
                
                        var msgj = collected.first();

                        const emojiString = msgj.content;
    
                
                        emoji = msgj.content
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})

                    })
                }
                if (a.values[0] == "msgouvertureticket") {
                    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel sera le message d'ouverture ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        
                        errors: ["time"]
                    }).then(async (collected) => {
                
                        var msgj = collected.first();
                
                        if(msgj.content.length > 2048) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [troplong2]})
                        }

                        if(msgj.content.length > 1024) {
                            msgouverture = 'Description trop longue pour l\'afficher'
                        }
                
                        msgouverture = msgj.content
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})

                    })
                }
                if (a.values[0] == "rolementticket") {
                    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel(s) seront les rôles mentionnés dès l'ouverture du ticket ?\nS'il ya plusieurs rôles merci de l'envoyer comme ça \`@role, @role2, @role3, etc...\`\n**ATTENTION:** Vous devez mentionner les rôles, faîtes cela dans un salon privé.`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        
                        errors: ["time"]
                    }).then(async (collected) => {
                
                        var msgj = collected.first();
                
                        const mentionedRoles = msgj.mentions.roles;

                        const norole = new EmbedBuilder()
                        .setTitle(`${bot.emoji.deny}・Erreur`)
                        .setDescription(`<@${message.author.id}>, vous devez mentionner au moin un rôle !`)
                        .setColor(bot.color)
                        .setFooter(bot.footer)

                        const noroles = new EmbedBuilder()
                        .setTitle(`${bot.emoji.deny}・Erreur`)
                        .setDescription(`<@${message.author.id}>, Il ya trop de rôle vous pouvez en mentionner uniquement 21 !`)
                        .setColor(bot.color)
                        .setFooter(bot.footer)

                        if (mentionedRoles.size === 0) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [norole]})
                        }

                        if(mentionedRoles.size > 21) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [noroles]})
                        }

                        if (mentionedRoles.size === 1) {
                        const role = mentionedRoles.first(); 
                        rolemention = `<@&${role.id}>`
                        rolementiondb = `<@&${role.id}>`
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})
                        } else {
                        const roleNames = mentionedRoles.map(role => `<@&${role.id}>`);
                        const separatedRoles = roleNames.join('\n');
                        const separatedRoles2 = roleNames.join(' ');
                        
                        rolementiondb = separatedRoles2
                        rolemention = separatedRoles
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})

                        }
                    })
                }

                if (a.values[0] == "roleacessticket") {
                    const ez = await i.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel(s) seront les rôles quo auront accès au ticket ?\nS'il ya plusieurs rôles merci de l'envoyer comme ça \`@role, @role2, @role3, etc...\`\n**ATTENTION:** Vous devez mentionner les rôles, faîtes cela dans un salon privé.`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        
                        errors: ["time"]
                    }).then(async (collected) => {
                
                        var msgj = collected.first();
                
                        const mentionedRoles = msgj.mentions.roles;

                        const norole = new EmbedBuilder()
                        .setTitle(`${bot.emoji.deny}・Erreur`)
                        .setDescription(`<@${message.author.id}>, vous devez mentionner au moin un rôle !`)
                        .setColor(bot.color)
                        .setFooter(bot.footer)

                        const noroles = new EmbedBuilder()
                        .setTitle(`${bot.emoji.deny}・Erreur`)
                        .setDescription(`<@${message.author.id}>, Il ya trop de rôle vous pouvez en mentionner uniquement 21 !`)
                        .setColor(bot.color)
                        .setFooter(bot.footer)

                        if (mentionedRoles.size === 0) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [norole]})
                        }

                        if(mentionedRoles.size > 21) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [noroles]})
                        }

                        if (mentionedRoles.size === 1) {
                        const role = mentionedRoles.first(); 
                        roleacess = `<@&${role.id}>`
                        roleacessdb = `${role.id}`
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})
                        } else {
                        const roleNames = mentionedRoles.map(role => `<@&${role.id}>`);
                        const roleNames2 = mentionedRoles.map(role => `${role.id}`);
                        const separatedRoles = roleNames.join('\n');
                        const separatedRoles2 = roleNames2.join(' ');
                        
                        roleacessdb = separatedRoles2
                        roleacess = separatedRoles
                        msgj.delete()
                        ez.delete()

                        const embedOptionsss = createOptionsEmbed(emoji, msgouverture, descriptionselect, text, rolemention, roleacess);
                        menumsg3.edit({embeds: [embedOptionsss], components: [new ActionRowBuilder().addComponents([menuoptions3]), saveButton]})

                        }
                    })
                }
              })


        }

      })

}
   })

    });
  }

      