module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
      bot.db.query(`SELECT * FROM configuration WHERE guildID = "${member.guild.id}"`, async (err, req) => {
        if (req.length < 1 || !req[0].greet) return;

        const channel_greets = req[0].greet;
        const channel = bot.channels.cache.get(channel_greets);
        if (!channel) return;

        channel.send(`<@${member.id}>`).then(msg => {
          setTimeout(async () => {
            await msg.delete();
          }, 4000);
        });
      });

  }
};