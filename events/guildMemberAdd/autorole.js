module.exports = {
  name: "guildMemberAdd",
  execute(member, bot) {
      
      bot.db.query(`SELECT * FROM configuration WHERE guildId = "${member.guild.id}"`, async (err, req) => {
          if(req.length < 1) return;
              const role_auto = req[0].autorole;
           
              if(role_auto == null) return;
          
     
  const gld = bot.guilds.cache.get(member.guild.id)
  const a = gld.roles.cache.get(role_auto) ? gld.roles.cache.get(role_auto).id ? "yes" : "no" : "no"
  if(a === "no") return;
          
              member.roles.add(role_auto)
              
    })
  }} 