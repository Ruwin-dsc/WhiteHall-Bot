module.exports = {
    name: 'messageDelete',
    execute(message, bot) {
        if (!message.guild) return;

        if (message.attachments.first()) {

        const snipes = bot.snipesimg.get(message.channel.id) || [];
        if (snipes.length > 5) snipes.splice(5);

        snipes.unshift({
            msg: message,
            image: message.attachments.first()?.proxyURL,
            time: Date.now(),
        });

        bot.snipesimg.set(message.channel.id, snipes);
    } else {
        const snipes = bot.snipes.get(message.channel.id) || [];
        if (snipes.length > 5) snipes.splice(5);

        snipes.unshift({
            msg: message,
            image: message.attachments.first()?.proxyURL || null,
            time: Date.now(),
        });

        bot.snipes.set(message.channel.id, snipes);
    }
    }
}
