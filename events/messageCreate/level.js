module.exports = {
    name: 'messageCreate',
    async execute(message, bot) {
        if(!message.guild) return
        
        if (message.author.bot) return;
        
        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
            if (req.length < 1) return;
            const channellevel = req[0].levels;
            
            if (channellevel === 'off') return;

            const a = bot.channels.cache.get(channellevel) ? bot.channels.cache.get(channellevel).name ? "yes" : "no" : "no";
            if (a === "no") return;

            bot.db.query(`SELECT * FROM xp WHERE guildId = "${message.guild.id}" AND id_user = "${message.author.id}"`, async (err, req) => {
                if (err) throw err;

                if (req.length < 1) {
                    bot.db.query(`INSERT INTO xp (guildId, id_user, xp) VALUES ("${message.guild.id}", "${message.author.id}", "${generateXp()}")`);
                } else {
                    const xp = req[0].xp;
                    var xpavant = Number(xp), ge = Number(generateXp()), result;
                    result = xpavant + ge;

                    const level = req[0].level;
                    const xplevel = level * level * 100;

                    bot.db.query(`UPDATE xp SET xp = ${result} WHERE guildId = '${message.guild.id}' AND id_user = '${message.author.id}'`);

                    if (xp >= xplevel) {
                        bot.db.query(`UPDATE xp SET level = ${Number(level) + Number(1)} WHERE guildId = '${message.guild.id}' AND id_user = '${message.author.id}'`);
                        await message.guild.channels.cache.get(channellevel).send(`<a:CFlecheBlue:1199408837283827843> Félicitation ${message.author} vient de passer level **${Number(level) + Number(1)}** !`);
                    }
                }
            });
        });
    }
};

function generateXp() {
    let min = 10;
    let max = 20;

    return Math.floor(Math.random() * (max - min)) + min;
}