const Discord = require("discord.js");

module.exports = {
  name: "messageCreate",
  execute(message, bot) {
     if (message.author.bot) return;
     if(!message.guild) return
       

               if (message.mentions.members.first()) {
                 bot.db.query(
                   `SELECT * FROM afk WHERE userId = "${
                     message.mentions.members.first().user.id
                   }"`,
                   async (err, req) => {
                     if (req.length < 1) return;
                     const afk = req[0].afk;

                     if (afk !== "on") return;

                     const noresponse = new MessageEmbed()
                       .setDescription(
                         `${
                           message.mentions.members.first().user.tag
                         } est actuellement en mode AFK pour la raison ${
                           req[0].raison
                         } ! Veuillez ne pas le déranger.`
                       )
                       .setCOlor(bot.color)
                       .setFooter(bot.footer);

                     message.reply({ embeds: [noresponse] });
                   }
                 );
               }
               bot.db.query(
                 `SELECT * FROM afk WHERE userId = "${message.author.id}"`,
                 async (err, req) => {
                   if (req.length < 1) return;
                   const afk = req[0].afk;

                   if (afk !== "on") return;
                   bot.db.query(
                     `DELETE FROM afk WHERE userId = ${message.author.id}`
                   );
                   message.reply(`Le statut d'AFK a été désactivé !`);
                 }
               );


  }}