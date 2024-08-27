const Discord = require("discord.js")

module.exports = {
    name: 'presenceUpdate',
   async execute(oldPresence, newPresence, bot) {
    bot.db.query(`SELECT * FROM soutien WHERE guildId = "${newPresence.guild.id}"`, async (err, req) => {   
        if(req.length < 1) return;
        const roleID = req[0].role
        const inviteLink = req[0].statut
        const status = req[0].status
        if(status == null) return
        if(roleID == null) return
        if(inviteLink == null) return
        const member = newPresence.member
        if(!member) return
        if(status === 'on') {
        if (member?.roles?.cache?.find(role => role?.id === roleID)) {
            if (member.presence.activities.some(activity => activity.type === Discord.ActivityType.Custom && activity.state && activity.state.includes(inviteLink))) return;
            if (!member.presence.activities.some(activity => activity.type === Discord.ActivityType.Custom && activity.state && activity.state.includes(inviteLink))) {
                await member.roles.remove(roleID, "Soutien");
            }
        } if (!member.roles.cache.find(role => role.id === roleID) && member.presence.activities.some(activity => activity.type === Discord.ActivityType.Custom && activity.state && activity.state.includes(inviteLink.toLowerCase()))) {
            await member.roles.add(roleID, "Soutien");
        } 
    }
    })
}} 