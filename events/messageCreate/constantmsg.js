module.exports = {
    name: 'messageCreate',
    async execute(message, bot) {
        if(!message.guild) return
        if(message.author.id === bot.user.id) return

        bot.db.query(`SELECT * FROM constantmsg WHERE channel = "${message.channel.id}"`, async (err, req) => {
            if (req.length < 1) return;
            
            const stickyChannels = req[0].channel;
            const stickyMessages = req[0].messages_complet;

            if (!bot.channels.cache.has(stickyChannels)) return;
            
            const channel = bot.channels.cache.get(stickyChannels);
            if (!channel) return;

            if (stickyMessages === 'off') return;

            if (message.author.id === bot.userId) return;

            const fetchedMessages = await message.channel.messages.fetch();
            const stickyMessage = fetchedMessages.find(m => m.author.id === bot.user.id && m.channel.id === stickyChannels && m.content === stickyMessages);

            if (stickyMessage) {
                stickyMessage.delete().then(() => {
                    channel.send(stickyMessages);
                }).catch(() => {});
            } else {
                channel.send(stickyMessages);
            }
        });
    }
};