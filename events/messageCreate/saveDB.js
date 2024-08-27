module.exports = {
    name: 'messageCreate',
    execute(message, bot, member) {
        if(!message.guild) return
        
        
        bot.db.query(`SELECT * FROM serveurs WHERE guildId = ${message.guild.id}`, async (err, req) => {


            if(req.length < 1) {
            
            let sql = `INSERT INTO serveurs (guildId)VALUES (${message.guild.id})`
            bot.db.query(sql, function(err) {
            if(err) throw err;
            })
            
            }})       

        
    
             
       }
}