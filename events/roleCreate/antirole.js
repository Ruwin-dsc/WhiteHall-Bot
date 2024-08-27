const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'roleCreate',
  once: false,

  execute(role, bot) {
    bot.db.query(`SELECT * FROM antirole WHERE guildId = "${role.guild.id}"`, (err, req) => {
      if (req.length < 1) return;

      const antirole = req[0].antirole;
      if (antirole === 'off') return;
      if (antirole === "on") {
        const sanction = req[0].sanction;

        role.guild.fetchAuditLogs({ 
                limit: 1, 
                type: Discord.AuditLogEvent.RoleCreate
             }).then(audit => {
          const rolecreate = audit.entries.first().executor;
          if (rolecreate === bot.user.id) return;
          if (rolecreate.id === role.guild.ownerId) return;

           bot.db.query(`SELECT * FROM owner WHERE memberId = "${rolecreate.id}" AND guildId = "${role.guild.id}"`, async (err, req) => {
                        if(req.length > 0) {
                            return
                        } else {

          bot.db.query(`SELECT * FROM whitelist WHERE memberId = "${rolecreate.id}" AND guildId = "${role.guild.id}"`, async (err, req) => {
            if(req.length > 0) {
                return
            } else {
              role.delete();

              if (sanction == 'derank') {
                role.guild.members.resolve(rolecreate).roles.cache.forEach(roless => {
                    if (roless.name !== '@everyone') {
                        role.guild.members.resolve(rolecreate).roles.remove(roless).catch(err => { throw err });
                    }
                });
            } else if (sanction == 'kick') {
                role.guild.members.kick(rolecreate, 'Antirole by MonaBot');
            } else if (sanction == 'ban') {
                role.guild.bans.create(rolecreate.id);
            }
              
    
    
              bot.db.query(`SELECT * FROM logs WHERE guildID = "${role.guild.id}"`, (err, req) => {
                if (req.length < 1) return;
    
                const logs = req[0].antiraid;
                if (logs == "off") return;
    
                const a = bot.channels.cache.get(logs) ? bot.channels.cache.get(logs).name ? "yes" : "no" : "no";
                if (a === "no") return;
    
                const embed = new EmbedBuilder()
                  .setTitle(`Anti Role`)
                  .setDescription(`<@${rolecreate.id}> vient de créer un rôle, il a été kick et le rôle a été supprimé!`)
                  .setColor(bot.color)
                  .setTimestamp()
                  .setFooter(bot.footer);
    
                bot.channels.cache.get(logs).send({ embeds: [embed] });
              });

            }
          })}})


        });
      }
    });
  }
};