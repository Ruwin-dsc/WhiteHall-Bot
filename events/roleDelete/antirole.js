const Discord = require('discord.js');

module.exports = {
  name: 'roleDelete',
  async execute(role, bot) {
    const guildID = role.guild.id;

    bot.db.query(`SELECT * FROM antirole WHERE guildId = "${guildID}"`, async (err, req) => {
      if (req.length < 1) return;

      const antirole = req[0]?.antirole;

      if (antirole !== 'on') return;

      const sanction = req[0].sanction
      const audit = await role.guild.fetchAuditLogs({ 
                limit: 1, 
                type: Discord.AuditLogEvent.RoleDelete
            });
      const roleDeleteEntry = audit.entries.first();
      const roleDeleteExecutor = roleDeleteEntry?.executor;

      if (!roleDeleteExecutor || roleDeleteExecutor.id === role.guild.ownerId || roleDeleteExecutor.id === bot.user.id) {
        return;
      }

      bot.db.query(`SELECT * FROM owner WHERE memberId = "${rolecreate.id}" AND guildId = "${role.guild.id}"`, async (err, req) => {
                        if(req.length > 0) {
                            return
                        } else {

      bot.db.query(`SELECT * FROM whitelist WHERE memberId = "${roleDeleteExecutor.id}" AND guildId = "${role.guild.id}"`, async (err, req) => {
        if(req.length > 0) {
            return
        } else {
          const recreatedRole = await role.guild.roles.create({
            data: {
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              position: role.position,
              mentionable: role.mentionable
            },
            reason: 'Anti-Role'
          });
    
          if (sanction == 'derank') {
            role.guild.members.resolve(roleDeleteExecutor).roles.cache.forEach(roless => {
                if (roless.name !== '@everyone') {
                    role.guild.members.resolve(roleDeleteExecutor).roles.remove(roless).catch(err => { throw err });
                }
            });
        } else if (sanction == 'kick') {
            role.guild.members.kick(roleDeleteExecutor, 'Antirole by MonaBot');
        } else if (sanction == 'ban') {
            role.guild.bans.create(roleDeleteExecutor.id);
        }
    
    
          bot.db.query(`SELECT antiraid FROM logs WHERE guildID = "${guildID}"`, async (err, req) => {
            if (req.length < 1) return;
    
            const logs = req[0]?.antiraid;
    
            if (logs !== 'off') {
              const logsChannel = bot.channels.cache.get(logs);
              if (logsChannel) {
                const embed = new Discord.EmbedBuilder()
                  .setTitle('Anti Role')
                  .setDescription(`<@${roleDeleteExecutor.id}> vient de supprimer un rôle, il a été kick et le rôle a été recréé!`)
                  .setColor(bot.color)
                  .setTimestamp()
                  .setFooter(bot.footer);
    
                logsChannel.send({ embeds: [embed] });
              }
            }
          });
        }
      })}})

    });
  }
};