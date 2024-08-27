const {
    EmbedBuilder,
} = require(`discord.js`);


exports.help = {
    name: "tempvoc",
    category: 'configuration',
    description: "Permet de configurer les vocaux temporaire",
    utilisation: "tempvoc salon catégorie",
    permission: "ADMINISTRATOR"
}
    exports.run = async (bot, message, args, prefix) => {
        let arg = message.content.trim().split(/ +/g)
//embed
        let b = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}tempvoc [SALON] [ID DE LA CATEGORIE]\``)
        .setColor(bot.color)
        .setFooter(bot.footer)
        if(!arg[1]) return message.reply({ embeds: [b] })

    

    
            
              if(!args) return message.reply({embeds: [b]})
    

             
                let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
                if(!channel) return message.reply({ embeds: [b] })

                let i2 = args[1]
                if(!i2) return message.reply({ embeds: [b] })


      
    
    
              bot.db.query(`SELECT * FROM tempvoc WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(err) throw err;
            
                if(req.length < 1){
                    let sql = `INSERT INTO tempvoc (guildId, channel, category) VALUES ('${message.guild.id}', '${channel.id}', '${i2}')`
                    bot.db.query(sql)
                   
                } else {
    
    
    
                    bot.db.query(`UPDATE tempvoc SET channel = '${channel.id}' WHERE guildId = ${message.guild.id}`)
                    bot.db.query(`UPDATE tempvoc SET category = '${i2}' WHERE guildId = ${message.guild.id}`)

        }
    })

    const Botembed = new EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Salon vocaux personnalisé ${bot.emoji.speakerhighvolume}`)
            .setDescription(`Le salon temporaire est maintent défini ! \n> Catégorie : <#${i2}> \n> Salon : <#${channel.id}>`)
            .setTimestamp()
            .setFooter(bot.footer);
    
        message.channel.send({ embeds: [Botembed] });
}