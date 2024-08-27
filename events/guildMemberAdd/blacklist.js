module.exports = {
    name: "guildMemberAdd",
    execute(member, bot) {
        bot.db.query(`SELECT * FROM blacklist WHERE memberId = "${member.id}" AND guildId = "${member.guild.id}"`, async (err, req) => {
            if(req.length < 1) {
                return
            } else {
                message.guild.bans.create(member.id)
            }
        })

    }}