const { EmbedBuilder } = require('discord.js')


module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user, bot) {
        if(!reaction.message.guild.id) return

        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${reaction.message.guild.id}"`, async (err, req) => {
            if(req.length < 1) return
            let starchannel = req[0].starchannel
            const a = bot.channels.cache.get(starchannel) ? bot.channels.cache.get(starchannel).name ? "yes" : "no" : "no"
if(a === "no") return;
            
        const handleStarboard = async () => {
            const starboard = bot.channels.cache.get(starchannel);
            const msgs = await starboard.messages.fetch({ limit: 100 });
            const existingMsg = msgs.find(msg => 
                msg.embeds.length === 1 ?
                (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
            if(existingMsg) existingMsg.edit(`Il ya ${reaction.count} - 🌟 sur ce message !`);
            else {
                const embed = new EmbedBuilder()
                    .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                    .setDescription(`**Url:** ${reaction.message.url}\n**Message:** ${reaction.message.content}`)
                    .setFooter({text: `${reaction.message.id}`})
                    .setColor(bot.color)
                if(starboard)
                    starboard.send({content: 'Il ya 1 - 🌟 sur ce message !', embeds: [embed]});
            }
        }
        if(reaction.emoji.name === '🌟') {
            if(reaction.message.channel.name.toLowerCase() === 'starboard') return;
            if(reaction.message.partial) {
                await reaction.fetch();
                await reaction.message.fetch();
                handleStarboard();
            }
            else
                handleStarboard();
        }
    })
    }}