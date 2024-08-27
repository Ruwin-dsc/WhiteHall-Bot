module.exports = {
  name: "guildCreate",
  async execute(guild, bot) {
 
    bot.db.query(`SELECT * FROM serveurs WHERE guildId = ${guild.id}`, async (err, req) => {


        if(req.length < 1) {
        
        let sql = `INSERT INTO serveurs (guildId) VALUES (${guild.id})`
        bot.db.query(sql, function(err) {
        if(err) throw err;
        })

       }})

  }
};
