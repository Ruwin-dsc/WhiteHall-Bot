module.exports = {
    name: 'messageCreate',
    execute(message, bot) {
        if(!message.guild) return

      if (message.author.id == bot.user.id) return

         bot.db.query(`SELECT * FROM antispam WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            if(req.length < 1) return;
            if(req[0].antispam === 'off') return;
            if(req[0].antispam === "on") {
              if(message.author.id == message.guild.ownerId) return

        bot.function.antiSpam(message, bot)
}})
    }
}