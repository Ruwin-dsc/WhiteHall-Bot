module.exports = {
    name: 'messageUpdate',
    execute(message, oldMessage, bot) {
        if (!message.guild) return;

        const snipesedit = bot.snipesedit.get(message.channel.id) || [];
        if (snipesedit.length > 5) snipesedit.splice(5);

        snipesedit.unshift({
            msg: message,
            msg2: oldMessage,
            time: Date.now(),
        });

        bot.snipesedit.set(message.channel.id, snipesedit);
    }
};
