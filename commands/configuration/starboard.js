const { EmbedBuilder } = require('discord.js')


exports.help = { 
    name:"starboard",
    category: 'configuration',
    description: "Permet de configurer le système de starboard",
    utilisation: "starboard [salon/off]",
    permission: "ADMINISTRATOR"
} 


exports.run = async (bot, message, args) => {
    let arg = message.content.trim().split(/ +/g)
    let b = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}starboard [salon/off]\``)
    .setColor(bot.color)
    .setFooter(bot.footer)
    if(!arg[1]) return message.reply({ embeds: [b] })

   const c2 =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, le salon de starboard est déjà désactivé !`)
   .setColor(bot.color)
   .setFooter(bot.footer)

   const c3 =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, le salon de starboard est déjà configuré sur ce salon !`)
   .setColor(bot.color)
   .setFooter(bot.footer)

   const c4 = new EmbedBuilder()
    .setTitle(`Starboard désactivé`)
    .setDescription(`<@${message.author.id}>, le salon de starboard a bien été désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer)

    const c5 = new EmbedBuilder()
    .setTitle(`Starboard activé`)
    .setDescription(`<@${message.author.id}>, le salon de starboard a bien été activé ! Tous les messages où il yaura la réaction 🌟 apparaitront dans ce salon !`)
    .setColor(bot.color)
    .setFooter(bot.footer)
//embed




    if (arg[1] == "off"){
      bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
            if(err) throw err;
        
            if(req.length < 1){
                bot.db.query(`INSERT INTO configuration (guildID, starchannel) VALUES ("${message.guild.id}", "${off}")`)
                return message.channel.send({embeds: [c4]})
            } else {
                let d = req[0].starboard
                if(d == 'off') return message.channel.send({embeds: [c2]})


        bot.db.query(`UPDATE configuration SET starchannel = 'off' WHERE guildID = ${message.guild.id}`)
        return message.channel.send({embeds: [c4]})
        
    }})
    
    } else if (arg[1] !== 'off'){

            
            let text = arg[1]
            let i = text.replace("<#", "").split(">").join("")
            const a = bot.channels.cache.get(i) ? bot.channels.cache.get(i).name ? "yes" : "no" : "no"
if(a === "no") return message.channel.send({embeds: [b]});


            bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                if(err) throw err;
            
                if(req.length < 1){
                    bot.db.query(`INSERT INTO configuration (guildID, starchannel) VALUES ("${message.guild.id}", "${i}")`)
                    return message.channel.send({embeds: [c5]})
                } else {
                    let d = req[0].starboard
                    if(d == i) return message.channel.send({embeds: [c3]})



            bot.db.query(`UPDATE configuration SET starchannel = '${i}' WHERE guildID = ${message.guild.id}`.replace("<#", "").replace(">", ""))
            return message.channel.send({embeds: [c5]})
        }
    })
}
   
}