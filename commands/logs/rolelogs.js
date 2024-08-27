const { EmbedBuilder } = require('discord.js');

exports.help = {
    name:"rolelogs",
    category: 'logs',
    description: "Permet de configuer les logs d'ajout/retirer de rôles, création de rôle, etc...",
    utilisation: "rolelogs [salon/off]",
    permission: "ADMINISTRATOR"
}


exports.run = async (bot, message, args) => {
   const nondef =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}rolelogs [salon/off]\``)
   .setColor(bot.color)
   .setFooter(bot.footer)
  
   const c2 =new EmbedBuilder()
   .setTitle(`${bot.emoji.deny}・Erreur`)
   .setDescription(`<@${message.author.id}>, les logs role est déjà désactivé !`)
   .setColor(bot.color)
   .setFooter(bot.footer)
  
   const c3 =new EmbedBuilder()
   .setTitle(`<:cro:1100681443497230397>・Déjà défini`)
   .setDescription(`<@${message.author.id}>, les logs role est déjà défini sur ce salon !`)
   .setColor(bot.color)
   .setFooter(bot.footer)
  
  
  
  
  
  
  
          let arg = message.content.trim().split(/ +/g)
  
          if (!arg[1]) message.channel.send({ embeds: [nondef] });
  
    if (arg[1] == "off"){
  
            bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                  if(err) throw err;
              
                  if(req.length < 1){
                      bot.db.query(`INSERT INTO logs (guildID, role) VALUES ("${message.guild.id}", "${i}")`)
                      return message.reply(`Le salon des logs role est maintenant désactivé.`);
  
                  } else {
                      let a = req[0].role 
                      if(a == 'off') return message.reply({embeds: [c2]})
    
  
  
              bot.db.query(`UPDATE logs SET role = 'off' WHERE guildID = ${message.guild.id}`.replace("<#", "").replace(">", ""))
              return message.reply(`Le salon des logs role est maintenant désactivé.`);
              
          }})
          
          } else if (arg[1] !== 'off'){
  
                  
                  let text = arg[1]
                  let i = text.replace("<#", "").split(">").join("")
                  const a = bot.channels.cache.get(i) ? bot.channels.cache.get(i).name ? "yes" : "no" : "no"
  if(a === "no") return message.channel.send({embeds: [nondef]});
  
  
  const niceou =new EmbedBuilder()
  .setTitle(`Logs role`)
  .setDescription(`<@${message.author.id}>, les logs role ont été défini sur ce salon "<#${i}>" !`)
  .setColor(bot.color)
  .setFooter(bot.footer)
  
  
  
  
                  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                      if(err) throw err;
                  
                      if(req.length < 1){
                          bot.db.query(`INSERT INTO logs (guildID, role) VALUES ("${message.guild.id}", "${i}")`)
                          return message.channel.send({ embeds: [niceou] });
                      } else {
                          let v = req[0].role
                          if(v == i) return message.channel.send({embeds: [c3]});
  
  
  
                  bot.db.query(`UPDATE logs SET role = '${i}' WHERE guildID = ${message.guild.id}`.replace("<#", "").replace(">", ""))
                  return message.channel.send({ embeds: [niceou] });
              }
          })
      }
}