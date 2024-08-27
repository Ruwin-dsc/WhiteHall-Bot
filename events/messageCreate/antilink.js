module.exports = {
  name: 'messageCreate',
  execute(message, bot) {
    if(!message.guild) return

      if (message.author.id == bot.user.id) return
      if(message.author.id == message.guild.ownerId) return

      bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND memberId = "${message.author.id}"`, async (err, req) => {
        if(req.length >= 1) {
          return
        } else {
          bot.db.query(`SELECT * FROM antilink WHERE guildId = "${message.guild.id}"`, (err, req) => {
            if (req.length < 1) return;
            const activ = req[0].antilink;
    
            if (activ === 'off') return;
    
            if (req[0].antilink === 'on') {
                bot.function.antilink(message, bot);
            }
          });
        }
      })

  },
};
