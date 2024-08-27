module.exports = {
  name: 'messageCreate',
  async execute(message, bot) {
      if(!message.guild) return

      bot.db.query(`SELECT * FROM configuration WHERE piconly = "${message.channel.id}"`, async (err, req) => {
        if (req.length < 1 || req[0].piconly === 'off') return;

        const pic = req[0].piconly;
        const channelObj = bot.channels.cache.get(pic);
        if (!channelObj) return;

        if (message.attachments.size <= 0) {
          message.delete().catch(() => {});
          return;
        }
      });
  }
};