const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');





exports.help = {
    name:"setcolor",
    category: 'configuration',
    description: "Permet de configurer les couleurs de l'embed du bot",
    utilisation: "setcolor",
    permission: "OWNER"
} 


exports.run = async (bot, message, args) => {

   const embed = new EmbedBuilder()
   .setTitle(`Système de Couleurs`)
   .setColor(bot.color)
   .setFooter(bot.footer)
   .setImage('https://cdn.discordapp.com/attachments/1087069406456193156/1180978118798884974/standard_2.gif?ex=657f6295&is=656ced95&hm=dfa6512c73cd4f53eb4c40d113bad3da364c075366fe6e4c0006061ede7417b9&')

   let menuoptions = new StringSelectMenuBuilder()
        .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Choisis une option")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("Noir")
                .setValue("noir_color")
                .setEmoji("<:blackcircle_26ab1:1112032735192686632>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Bleu")
                .setValue("bleu_color")
                .setEmoji("<:largebluecircle_1f535:1112032737382113361>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Marron")
                .setValue("marron_color")
                .setEmoji("<:largebrowncircle_1f7e4:1112032740502679584>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Vert")
                .setValue("vert_color")
                .setEmoji("<:largegreencircle_1f7e21:1112032746471174154>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Orange")
                .setValue("orange_color")
                .setEmoji("<:largeorangecircle_1f7e01:1112032748723523594>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Violet")
                .setValue("violet_color")
                .setEmoji("<:largepurplecircle_1f7e3:1112032750589968496>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Rouge")
                .setValue("rouge_color")
                .setEmoji("<:largeredcircle_1f5341:1112032752766832671>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Jaune")
                .setValue("jaune_color")
                .setEmoji("<:largeyellowcircle_1f7e1:1112032754641678487>"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Blanc")
                .setValue("blanc_color")
                .setEmoji("<:whitecircle_26aa:1112032756470403193>"),
                 
          
           
        )

        const menumsg = await message.channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents([menuoptions])] })

        let msg = menumsg


        let filter2 = (m) => m.author.id === message.author.id

        let filter1 = (i) => i.user.id === message.author.id;
        
        const col = await msg.createMessageComponentCollector({
            filter: filter1,
            componentType: "SELECT_MENU"
        })

        const notfound = new EmbedBuilder()
        .setTitle(`<:cro:1100681443497230397>・Déjà défini`)
    .setDescription(`<@${message.author.id}>, la couleur que vous avez choisi est déjà la couleur du bot merci de choisir une autre couleur.`)
    .setColor(bot.color)
    .setFooter(bot.footer)
        

        col.on("collect", async (i) => {
            await i.deferUpdate()
            if (interaction.customId === "MenuSelection") {
             
            if (i.values[0] == "noir_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const black = req[0].color
                    if(black == '#000000') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#000000' WHERE guildId = ${message.guild.id}`)
                    const blackcolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur noir <:blackcircle_26ab1:1112032735192686632> ! Merci de patienter...`)
                    .setColor(`#000000`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [blackcolor]})
                    })
            }
            if (i.values[0] == "bleu_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const blue = req[0].color
                    if(blue == '#00BFFF') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#00BFFF' WHERE guildId = ${message.guild.id}`)
                    const bluecolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur bleue <:largebluecircle_1f535:1112032737382113361> ! Merci de patienter...`)
                    .setColor(`#00BFFF`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [bluecolor]})
                    })
            }
            if (i.values[0] == "marron_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const brown = req[0].color
                    if(brown == '#A52A2A') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#A52A2A' WHERE guildId = ${message.guild.id}`)
                    const browncolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur marron <:largebrowncircle_1f7e4:1112032740502679584> ! Merci de patienter...`)
                    .setColor(`#A52A2A`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [browncolor]})
                    })
            }
            if (i.values[0] == "vert_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const green = req[0].color
                    if(green == '#32CD32') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#32CD32' WHERE guildId = ${message.guild.id}`)
                    const greencolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur vert <:largegreencircle_1f7e21:1112032746471174154> ! Merci de patienter...`)
                    .setColor(`#32CD32`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [greencolor]})
                    })
            }
            if (i.values[0] == "orange_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const orange = req[0].color
                    if(orange == '#FFA500') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#FFA500' WHERE guildId = ${message.guild.id}`)
                    const orangecolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur orange <:largeorangecircle_1f7e01:1112032748723523594> ! Merci de patienter...`)
                    .setColor(`#FFA500`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [orangecolor]})
                    })
            }
            if (i.values[0] == "violet_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const purple = req[0].color
                    if(purple == '#BA55D3') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#BA55D3' WHERE guildId = ${message.guild.id}`)
                    const purplecolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur violet <:largepurplecircle_1f7e3:1112032750589968496> ! Merci de patienter...`)
                    .setColor(`#BA55D3`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [purplecolor]})
                    })
            }
            if (i.values[0] == "rouge_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const red = req[0].color
                    if(red == '#FF0000') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#FF0000' WHERE guildId = ${message.guild.id}`)
                    const redcolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur rouge <:largeredcircle_1f5341:1112032752766832671> ! Merci de patienter...`)
                    .setColor(`#FF0000`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [redcolor]})
                    })
            }
            if (i.values[0] == "jaune_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const yellow = req[0].color
                    if(yellow == '#FFFF00') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#FFFF00' WHERE guildId = ${message.guild.id}`)
                    const yellowcolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur jaune <:largeyellowcircle_1f7e1:1112032754641678487> ! Merci de patienter...`)
                    .setColor(`#FFFF00`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [yellowcolor]})
                    })
            }
            if (i.values[0] == "blanc_color") {
                bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return
                    const white = req[0].color
                    if(white == '#FFFFFF') return i.channel.send({embeds: [notfound]})
                    

                bot.db.query(`UPDATE serveurs SET color = '#FFFFFF' WHERE guildId = ${message.guild.id}`)
                    const whitecolor = new EmbedBuilder()
                    .setTitle(`Couleur changé !`)
                    .setDescription(`La couleur de l'embed est maintenant la couleur blanche <:whitecircle_26aa:1112032756470403193> ! Merci de patienter...`)
                    .setColor(`#FFFFFF`)
                    .setFooter(bot.footer)
                    i.channel.send({embeds: [whitecolor]})
                    })
            }
   
        }


        })




}