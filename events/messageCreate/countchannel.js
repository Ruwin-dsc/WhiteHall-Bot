const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'messageCreate',
    async execute(message, bot) {
        if(!message.guild) return
        if(!message.channel.id) return

        
        bot.db.query(`SELECT * FROM countchannel WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(req.length < 1) return;


        const salon = req[0].channel;
        const utilisateur = req[0].user_id;
        const nombre = req[0].nombre;


        const a = bot.channels.cache.get(salon) ? bot.channels.cache.get(salon).name ? "yes" : "no" : "no"
if(a === "no") return;
        
        if(salon === 'off') return;
     
            
            if(salon.includes(message.channel.id)) {
                if(message.author.id === utilisateur){
                    message.reply({ content: `${message.author}, Ce n'est pas votre tour, attendez qu'une autre personne envoie un nombre !`})
            .then((m) => {
                message.delete()
                return setTimeout(() => { m.delete() }, 3000)
            })
                    
                    return message.delete()
                }
                if(message.author.bot) return 
                if(message.content.startsWith(`${Number(nombre) + Number(1)}`)) { 
                    
message.delete()
                const exampleEmbed = new EmbedBuilder()
            .setColor('RANDOM')
            .setDescription(`<@${message.author.id}>: \`${message.content}\` `)
            .setTimestamp()
            .setFooter(bot.footer)
            bot.db.query(`UPDATE countchannel set nombre = ${Number(nombre) + Number(1)} WHERE guildId = '${message.guild.id}'`)
            bot.db.query(`UPDATE countchannel set user_id = ${message.author.id} WHERE guildId = '${message.guild.id}'`)
            
        message.channel.send({ embeds: [exampleEmbed] });
                } else {
                    message.reply({ content: `${message.author} Le nombre que vous avez envoyer est incorrect, le prochain nombre est **${Number(nombre) + Number(1)}** !`})
            .then((m) => {
                message.delete()
                setTimeout(() => { m.delete() }, 3000)
            })
               
                }
 
        
    
        }})
    }}