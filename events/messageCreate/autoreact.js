module.exports = {
  name: 'messageCreate',
  async execute(message, bot, member) {

    if(!message.guild) return

      if (message.channel.type === 'dm') return;

      bot.db.query(`SELECT * FROM autoreact WHERE channelId = "${message.channel.id}"`, (err, req) => {
        if (req.length < 1) return;

        const reactChannel = req[0].channelId;
        const channel = bot.channels.cache.get(reactChannel);
        if (!channel) return;

        const reactions = req.map((entry) => entry.emoji);
        for (const reaction of reactions) {
          message.react(reaction)
            .catch((err) => {
              return;
            });
        }
      });

  },
};