const ms = require('ms');

module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        setInterval(() => {
            bot.guilds.cache.forEach(async (guild) => {

        bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "membercount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const memberCount = guild.memberCount;
              const newtext = textre.replace('<count>', memberCount);
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "memberxbotcount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
            const memberallnobot = guild.members.cache.filter(member => !member.user.bot).size;
            newtext = textre.replace('<count>', memberallnobot)
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "botscount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const botCount = guild.members.cache.filter(member => member.user.bot).size;
              newtext = textre.replace('<count>', botCount)
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "voccount"`, async (err, req) => {
            if (req.length < 1) return;
              let totalMemberCount;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              guild.channels.cache.forEach(channel => {
                if (channel.type === 'GUILD_VOICE') {
                    totalMemberCount += channel.members.size;
                }
                });
                newtext = textre.replace('<count>', totalMemberCount)
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "memberonlinecount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const membresEnLigne = guild.members.cache.filter(member => member.presence && member.presence.status !== 'offline').size;
              newtext = textre.replace('<count>', membresEnLigne)
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "memberhorslignecount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const membresHorsLigne = guild.members.cache.filter(member => (!member.presence || member.presence.status === 'offline')).size;
              newtext = textre.replace('<count>', membresHorsLigne);
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "memberrolecount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
                const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const roleId = row.roleId;
                                const role = guild.roles.cache.get(roleId);
                                if (role) {
                                    const membresAvecRole = guild.members.cache.filter(member => member.roles.cache.has(role.id));
                                    const count = membresAvecRole.size;
                                newtext = textre.replace('<count>', count);
                                } 
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "channelcount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
              const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const channelCount = guild.channels.cache.size;
              newtext = textre.replace('<count>', channelCount);
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "rolecount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
              const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const roleCount = guild.roles.cache.size;
              newtext = textre.replace('<count>', roleCount);
          
              await channel.edit({ name: newtext });
            }
          })

          bot.db.query(`SELECT * FROM counter WHERE guildId = "${guild.id}" AND options = "boostcount"`, async (err, req) => {
            if (req.length < 1) return;
          
            for (const row of req) {
              const textre = row.text
              const channelId = row.channelId;
              const channel = await guild.channels.fetch(channelId);
              if (!channel) return;
          
              const boostCount = guild.premiumSubscriptionCount;
              newtext = textre.replace('<count>', boostCount);
          
              await channel.edit({ name: newtext });
            }
          })
          

        })
    }, ms('2m'))
    }}