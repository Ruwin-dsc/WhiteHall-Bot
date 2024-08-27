const { EmbedBuilder } = require('discord.js');

exports.help = {
    name:"boostlogs",
    category: 'logs',
    description: "Permet de configuer les logs de boosts",
    utilisation: "boostlogs [salon/off]",
    permission: "ADMINISTRATOR"
}


exports.run = async (bot, message, args) => {

  
   const nondef =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}boostlogs [salon/off]\``)
   .setColor(bot.color)
   .setFooter(bot.footer)
  
   const c2 =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, les logs boosts est déjà désactivé !`)
   .setColor(bot.color)
   .setFooter(bot.footer)
  
   const c3 =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, les logs boosts est déjà défini sur ce salon !`)
   .setColor(bot.color)
   .setFooter(bot.footer)
  
  
  
  
  
  
  
          let arg = message.content.trim().split(/ +/g)
  
          if (!arg[1]) message.channel.send({ embeds: [nondef] });
  
    if (arg[1] == "off"){
  
            bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                  if(err) throw err;
              
                  if(req.length < 1){
                      bot.db.query(`INSERT INTO logs (guildID, boostlogs) VALUES ("${message.guild.id}", "${i}")`)
                      return message.reply(`Le salon des logs boosts est maintenant désactivé.`);
  
                  } else {
                      let a = req[0].boostlogs 
                      if(a == 'off') return message.reply({embeds: [c2]})
    
  
  
              bot.db.query(`UPDATE logs SET boostlogs = 'off' WHERE guildID = ${message.guild.id}`.replace("<#", "").replace(">", ""))
              return message.reply(`Le salon des logs boostlogs est maintenant désactivé.`);
              
          }})
          
          } else if (arg[1] !== 'off'){
  
                  
                  let text = arg[1]
                  let i = text.replace("<#", "").split(">").join("")
                  const a = bot.channels.cache.get(i) ? bot.channels.cache.get(i).name ? "yes" : "no" : "no"
  if(a === "no") return message.channel.send({embeds: [nondef]});
  
  
  const niceou =new EmbedBuilder()
  .setTitle(`Logs boost`)
  .setDescription(`<@${message.author.id}>, les logs boost ont été défini sur ce salon "<#${i}>" !`)
  .setColor(bot.color)
  .setFooter(bot.footer)
  
  
  
  
                  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                      if(err) throw err;
                  
                      if(req.length < 1){
                          bot.db.query(`INSERT INTO logs (guildID, boostlogs) VALUES ("${message.guild.id}", "${i}")`)
                          return message.channel.send({ embeds: [niceou] });
                      } else {
                          let g = req[0].boostlogs
                          if(g == i) return message.channel.send({embeds: [c3]});
  
  
  
                  bot.db.query(`UPDATE logs SET boostlogs = '${i}' WHERE guildID = ${message.guild.id}`.replace("<#", "").replace(">", ""))
                  return message.channel.send({ embeds: [niceou] });
              }
          })
      }    
}
    