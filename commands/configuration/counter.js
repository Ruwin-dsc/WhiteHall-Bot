const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


exports.help = {
    name:"counter",
    category: 'configuration',
    description: "Permet de configurer les compteurs",
    utilisation: "counter",
    permission: "ADMINISTRATOR"
}


exports.run = async (bot, message, args) => {
    let counterchannel1;
    let counterchannel2;
    let counterchannel3;
    let counterchannel4;
    let counterchannel5;
    let options1;
    let options2;
    let options3;
    let options4;
    let options5
    let text1
    let text2
    let text3
    let text4
    let text5
    let namechannel

    let countertypedb;
    let number;
    let roledb
    roledb = null
    let salon;

    let newmsg;
    
    let optionss;
    optionss = "*Non paramétré*"
    let text;
    let textre;
    textre = "*Non paramétré*"

    function createTicketEmbed(optionss, salon, text) {
      
            const counterembed = new EmbedBuilder()
            .setTitle(`Paramètre de Compteur`)
            .setColor(bot.color)
            .setFooter(bot.footer)
            .setDescription(`
            \`Salon\`
            ${salon}
            \`Nom du salon\`
            ${text}
            \`Type de compteur\`
            ${optionss}
            `)
            return counterembed;
      
      }

      function dbEmbed() {
        return new Promise((resolve, reject) => {
          bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            if (err) {
              reject(err);
              return;
            }
      
            const defaultValue = "*Non paramétré*";
            const counterChannels = [defaultValue, defaultValue, defaultValue, defaultValue, defaultValue];
            const options = [defaultValue, defaultValue, defaultValue, defaultValue, defaultValue];
            const text = [defaultValue, defaultValue, defaultValue, defaultValue, defaultValue];
      
            for (let i = 0; i < req.length; i++) {
              const channelIndex = i;
              const optionIndex = i;
              const textIndex = i;
              counterChannels[channelIndex] = `<#${req[i].channelId}> (\`${req[i].channelId}\`)`;
              options[optionIndex] = `${req[i].options}`;
              text[textIndex] = req[i].text;
            }
      
            [counterchannel1, counterchannel2, counterchannel3, counterchannel4, counterchannel5] = counterChannels;
            [options1, options2, options3, options4, options5] = options;
            [text1, text2, text3, text4, text5] = text;
      
            const embedoriginal = new EmbedBuilder()
              .setTitle(`Paramètres des compteurs`)
              .setColor(bot.color)
              .setFooter(bot.footer)
              .setDescription(`*Si vous ne voyez pas la commande quand vous avez config, refaîtes la commande*`)
              .addFields(
                { name: `__:one: Compteur __`, value: `${counterchannel1}`, inline: false },
                { name: `__:two: Compteur __`, value: `${counterchannel2}`, inline: false },
                { name: `__:three: Compteur __`, value: `${counterchannel3}`, inline: false },
                { name: `__:four: Compteur __`, value: `${counterchannel4}`, inline: false },
                { name: `__:five: Compteur __`, value: `${counterchannel5}`, inline: false },
              );
      
            resolve(embedoriginal);
          });
        });
      }




        const bottoncounter = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("onecounter")
                .setEmoji("1️⃣")
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("twocounter")
                .setEmoji("2️⃣")
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("threecounter")
                .setEmoji("3️⃣")
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("fourcounter")
                .setEmoji("4️⃣")
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("fivecounter")
                .setEmoji("5️⃣")
                .setStyle(ButtonStyle.Primary),
                
            )



            let MenuSelectionCounter = new StringSelectMenuBuilder()
            .setCustomId('MenuSelectionCounter')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membre")
                        .setValue("membercount")
                        .setEmoji(bot.emoji.bustinsilhouette),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membre hors bot")
                        .setValue("memberxbotcount")
                        .setEmoji(bot.emoji.bustsinsilhouette),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de bots")
                        .setValue("botscount")
                        .setEmoji(bot.emoji.bot),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membres en vocal")
                        .setValue("voccount")
                        .setEmoji(bot.emoji.speakerhighvolume),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membres en ligne")
                        .setValue("memberonlinecount")
                        .setEmoji(bot.emoji.bluecircle),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membres en ligne hors bot")
                        .setValue("memberlignecount")
                        .setEmoji(bot.emoji.smallbluediamond),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membres hors ligne")
                        .setValue("memberhorslignecount")
                        .setEmoji(bot.emoji.redcircle),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de membres ayant un certain rôle")
                        .setValue("memberrolecount")
                        .setEmoji(bot.emoji.sparkles),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de salons")
                        .setValue("channelcount")
                        .setEmoji(bot.emoji.book),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de rôles")
                        .setValue("rolecount")
                        .setEmoji(bot.emoji.star),
                   new StringSelectMenuOptionBuilder()
                        .setLabel("Compteur de boost")
                        .setValue("boostcount")
                        .setEmoji(bot.emoji.diamond),
                    
                )

                const deleteCounter = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("deletecounter")
                    .setLabel('Supprimer un compteur')
                    .setStyle(ButtonStyle.Danger),
                )

                const buttoncounter = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("choosechannel")
                .setEmoji("🔖")
                .setLabel('Choisir le salon')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("savecounter")
                .setLabel("Sauvegarder")
                .setStyle(ButtonStyle.Primary),
            )
           dbEmbed()
           .then(async embed => {
            const msg = await message.channel.send({embeds: [embed], components: [bottoncounter, deleteCounter]})
        
           const menumsg = msg
           const embeddepart = msg

           let filter2 = (m) => m.author.id === message.author.id

            let filter1 = (i) => i.user.id === message.author.id;


            const collector = msg.createMessageComponentCollector({
                filter: filter1,
              });
              
              collector.on('collect', async (interaction) => {
                interaction.deferUpdate()

                if (interaction.customId === 'deletecounter') {
                    const ez = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le salon du compteur à supprimer ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false });
                  
                    let collected = await message.channel.awaitMessages({
                      filter: filter2,
                      max: 1,
                      time: 60000,
                      errors: ["time"]
                    }).then(async (collected) => {
                      const channelo = collected.first().content

                 
                        const selectQuery = `SELECT * FROM counter WHERE guildId = ${message.guild.id} AND channelId = ${channelo}`;
                  
                        bot.db.query(selectQuery, (err, req) => {                
                          if (!req) {
                            message.channel.send('Le compteur spécifié n\'a pas été trouvé.');
                            return;
                          }
                  
                          const deleteQuery = `DELETE FROM counter WHERE guildId = ${message.guild.id} AND channelId = ${channelo}`;
                  
                          bot.db.query(deleteQuery, (err, result) => {

                            collected.first().delete();
                        ez.delete();
                  
                            message.channel.send('J\'ai supprimé le compteur avec succès.');

                            dbEmbed()
           .then(async embed => {
            msg.edit({embeds: [embed], components: [bottoncounter, deleteCounter]})
        })
                          });
                        });
                      
                    });
                  }


                  
                  

                if (interaction.customId === 'savecounter') {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                        if(req.length >= 5) {

                            return interaction.reply(`Vous avez atteint le max de compteurs ! Merci d'en supprimer.`)

                        } else {
                            try {
                            const channel = await message.guild.channels.fetch(salon);
                            if(!channel) return message.reply("Le salon est incorrect !")

                            let newtext;
                            
                            if(countertypedb == "membercount") {
                                const memberall = message.guild.memberCount
                                newtext = textre.replace('<count>', memberall)
                            }

                            if(countertypedb == "memberxbotcount") {
                                const memberallnobot = message.guild.members.cache.filter(member => !member.user.bot).size;
                                newtext = textre.replace('<count>', memberallnobot)
                            }

                            if(countertypedb == "botscount") {
                                const botCount = message.guild.members.cache.filter(member => member.user.bot).size;
                                newtext = textre.replace('<count>', botCount)
                            }

                            if(countertypedb == "voccount") {
                                let totalMemberCount = 0;
                                message.guild.channels.cache.forEach(channel => {
                                if (channel.type === 'GUILD_VOICE') {
                                    totalMemberCount += channel.members.size;
                                }
                                });
                                newtext = textre.replace('<count>', totalMemberCount)
                            }

                            if(countertypedb == "memberonlinecount") {
                                const membresEnLigne = message.guild.members.cache.filter(member => member.presence && member.presence.status !== 'offline').size;
                                newtext = textre.replace('<count>', membresEnLigne)
                            }

                              if (countertypedb === "memberhorslignecount") {
                                const membresHorsLigne = message.guild.members.cache.filter(member => (!member.presence || member.presence.status === 'offline')).size;
                                newtext = textre.replace('<count>', membresHorsLigne);
                              }

                              if (countertypedb === "memberrolecount") {

                                const roleId = roledb
                                const role = message.guild.roles.cache.get(roleId);
                                if (role) {
                                    const membresAvecRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));
                                    const count = membresAvecRole.size;
                                newtext = textre.replace('<count>', count);
                                } else {
                                   return message.reply(`Le rôle semble incorrect !`)
                                }
                              }

                              if (countertypedb === "channelcount") {
                                const channelCount = message.guild.channels.cache.size;
                                newtext = textre.replace('<count>', channelCount);
                              }

                              if (countertypedb === "rolecount") {
                                const roleCount = message.guild.roles.cache.size;
                                newtext = textre.replace('<count>', roleCount);
                              }

                              if (countertypedb === "boostcount") {
                                const boostCount = message.guild.premiumSubscriptionCount;
                                newtext = textre.replace('<count>', boostCount);
                              }
                              
                              
                              



                            
                            await channel.edit({ name: newtext })
                        
                            bot.db.query(`INSERT INTO counter (guildId, channelId, options, text, roleId) VALUES ("${message.guild.id}", "${salon}", "${countertypedb}", "${textre}", "${roledb}")`)


                        } catch (e) {
                            console.log(e)
                        }

                        dbEmbed()
           .then(async embed => {
            msg.edit({embeds: [embed], components: [bottoncounter, deleteCounter]})
        })

                            
                        }



                    })
                }

                if (interaction.customId === 'onecounter') {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    optionss = options1
                    salon = counterchannel1
                    

                    const counterembed = createTicketEmbed(optionss, salon, text1);
                    
                   newmsg = msg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
    })
                }
                if (interaction.customId === 'twocounter') {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    optionss = options2
                    salon = counterchannel2
                    number = "2"

                    const counterembed = createTicketEmbed(options2, counterchannel2, text2);
                    
                    newmsg = msg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
    })

                }
                if (interaction.customId === 'threecounter') {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                      optionss = options3
                    salon = counterchannel3
                    number = "3"

                    const counterembed = createTicketEmbed(optionss, salon, text3);
                    
                    newmsg = msg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
    })

                }
                if (interaction.customId === 'fourcounter') {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    optionss = options4
                    salon = counterchannel4
                    number = "4"

                    const counterembed = createTicketEmbed(optionss, salon, text4);
                    
                    newmsg = msg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
    })

                }
                if (interaction.customId === 'fivecounter') {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    optionss = options5
                    salon = counterchannel5
                    number = "5"

                    const counterembed = createTicketEmbed(optionss, salon, text5);
                    
                    newmsg = msg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
    })

                }


                if (interaction.customId == "choosechannel") {
                    const ez = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le salon du compteur ?`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected) => {
        
                        var msg = collected.first();
                      const channelo = interaction.message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
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
                    msg.delete()
                    ez.delete()
                    const ezz = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le nom du salon ? Ecrivez <count> pour mettre le compteur. Ex: Membres: <count> --> Membres: 157`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                    let collected2 = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async (collected3) => {

                        var msgg = collected3.first();
                        if(!msgg.content.includes('<count>')) {
                            const nocount = new EmbedBuilder()
                            .setTitle(`${bot.emoji.deny}・Erreur`)
                            .setDescription(`<@${message.author.id}>, vous n'avez pas indiqué <count> !`)
                            .setColor(bot.color)
                            .setFooter(bot.footer) 
                            ezz.delete()
                            msgg.delete()
                            return message.channel.send({ embeds: [nocount]})
                        } else {
                            ezz.delete()
                            msgg.delete()
                            textre = msgg.content

                            salon = channelo.id

                            const counterembed = createTicketEmbed(optionss, salon, textre);

                            menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})

                        }

                    })
   
                })
                }

                if (interaction.values == "membercount") {
                    optionss = "Compteur de membre"
                    countertypedb = "membercount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "memberxbotcount") {
                    optionss = "Compteur de membre hors bot"
                    countertypedb = "memberxbotcount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "botscount") {
                    optionss = "Compteur de bots"
                    countertypedb = "botscount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "voccount") {
                    optionss = "Compteur de membres en vocal"
                    countertypedb = "voccount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "memberonlinecount") {
                    optionss = "Compteur de membres en ligne"
                    countertypedb = "memberonlinecount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "memberlignecount") {
                    optionss = "Compteur de membres en ligne hors bot"
                    countertypedb = "memberlignecount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "memberhorslignecount") {
                    optionss = "Compteur de membres hors ligne"
                    countertypedb = "memberhorslignecount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "memberrolecount") {
                    optionss = "Compteur de membres ayant un certain rôle"
                    countertypedb = "memberrolecount"

                    const ez = await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Quel est le rôle pour compter les counters ?\n**ATTENTION:** Vous devez mentionner le rôle, faîtes cela dans un salon privé.`).setColor(bot.color).setFooter(bot.footer)], ephemeral: false})
                
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
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
                        .setDescription(`<@${message.author.id}>, Il ya trop de rôle vous pouvez en mentionner uniquement 1 !`)
                        .setColor(bot.color)
                        .setFooter(bot.footer)

                        if (mentionedRoles.size === 0) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [norole]})
                        }

                        if(mentionedRoles.size > 1) {
                            msgj.delete()
                            ez.delete()
                            return message.reply({embeds: [noroles]})
                        }

                        if (mentionedRoles.size === 1) {
                        const role = mentionedRoles.first(); 
                        roledb = `${role.id}`
                        msgj.delete()
                        ez.delete()

                        const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                        } 
                    })

                    
                }
                if (interaction.values == "channelcount") {
                    optionss = "Compteur de salons"
                    countertypedb = "channelcount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "rolecount") {
                    optionss = "Compteur de rôles"
                    countertypedb = "membercount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "boostcount") {
                    optionss = "Compteur de boost"
                    countertypedb = "boostcount"

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})
                }
                if (interaction.values == "deletecount") {
                    bot.db.query(`SELECT * FROM counter WHERE guildId = "${message.guild.id}" AND channelId = "${salon}"`, async (err, req) => {
                        if(req.length < 1) return message.reply('Ce compteur n\'est pas dans la DataBase, veuillez réessayer !')

                    const counterembed = createTicketEmbed(optionss, salon, textre);

                    menumsg.edit({embeds: [counterembed], components: [buttoncounter, new ActionRowBuilder().addComponents([MenuSelectionCounter])]})

                    })
                }
            })
            
            })
}