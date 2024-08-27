const { EmbedBuilder } = require('discord.js')

exports.help = {
    name:"autorole",
    category: 'configuration',
    description: "Permet de définir l\'autorole",
    utilisation: "autorole [rôle/off]",
    permission: "ADMINISTRATOR"
}


exports.run = async (bot, message, args) => {
        let arg = message.content.trim().split(/ +/g)
        const gld = bot.guilds.cache.get(message.guild.id)


       

        let b = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}autorole [rôle/off]\``)
        .setColor(bot.color)
        .setFooter(bot.footer)
        if(!arg[1]) return message.reply({ embeds: [b] })

        const c2 =new EmbedBuilder()
       .setTitle(`${bot.emoji.deny}・Erreur`)
       .setDescription(`<@${message.author.id}>, l'autorole est déjà désactivé !`)
       .setColor(bot.color)
       .setFooter(bot.footer)

       const c3 =new EmbedBuilder()
       .setTitle(`${bot.emoji.deny}・Erreur`)
       .setDescription(`<@${message.author.id}>, l'autorole est déjà configuré sur ce rôle !`)
       .setColor(bot.color)
       .setFooter(bot.footer)



            
            if (arg[1] == "off"){
       
              bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                    if(err) throw err;
                
                    if(req.length < 1){
                        bot.db.query(`INSERT INTO configuration (guildID, autorole) VALUES ("${message.guild.id}", "off")`)
                        const sucess = new EmbedBuilder()
 .setTitle(`Autorole désactivé`)
 .setDescription(`<@${message.author.id}>, l'autorole a bien été désactivé !`)
 .setColor(bot.color)
 .setFooter(bot.footer)
 return message.reply({embeds: [sucess]})
                    } else {
                        let d = req[0].autorole
                        if(d == 'off') return message.channel.send({embeds: [c2]})
    
    
                bot.db.query(`UPDATE configuration SET autorole = 'off' WHERE guildID = ${message.guild.id}`)
                const sucess = new EmbedBuilder()
 .setTitle(`Autorole désactivé`)
 .setDescription(`<@${message.author.id}>, l'autorole a bien été désactivé !`)
 .setColor(bot.color)
 .setFooter(bot.footer)
 return message.reply({embeds: [sucess]})
                
            }})
            
            } else if (arg[1] !== 'off'){

                
                let text2 = arg[1]
                let i = text2.replace("<@&", "").split(">").join("")
const a = gld.roles.cache.get(i) ? gld.roles.cache.get(i).id ? "yes" : "no" : "no"
if(a === "no") return message.channel.send({embeds: [b]});

                

                bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                    if(err) throw err;
                
                    if(req.length < 1){
                        bot.db.query(`INSERT INTO configuration (guildID, autorole) VALUES ("${message.guild.id}", "${i}")`)
                        const sucess = new EmbedBuilder()
 .setTitle(`Antirole activé`)
 .setDescription(`<@${message.author.id}>, l'antirole a bien été activé sur le rôle <@&${i}> !\n*Note: Vérifier que le bot est au dessus du rôle*`)
 .setColor(bot.color)
 .setFooter(bot.footer)
 return message.reply({embeds: [sucess]})
                    } else {
                        let d = req[0].autorole
                        if(d == i) return message.channel.send({embeds: [c3]})


                bot.db.query(`UPDATE configuration SET autorole = '${i}' WHERE guildID = ${message.guild.id}`.replace("<@&", "").replace(">", ""))
                const sucess = new EmbedBuilder()
 .setTitle(`Antirole activé`)
 .setDescription(`<@${message.author.id}>, l'antirole a bien été activé sur le rôle <@&${i}> !\n*Note: Vérifier que le bot est au dessus du rôle*`)
 .setColor(bot.color)
 .setFooter(bot.footer)
 return message.reply({embeds: [sucess]})
            }
        })
    }
}