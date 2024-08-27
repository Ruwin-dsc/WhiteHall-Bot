const Discord = require("discord.js")
module.exports = {
  name: 'messageCreate',
  async execute(message, bot) {
      if(!message.guild) return
      if (message.channel.type !== Discord.ChannelType.GuildAnnouncement) return;

      bot.db.query(`SELECT * FROM configuration WHERE guildID = "${message.guild.id}"`, async (err, req) => {
        if (err) throw err;

        if (req.length < 1) return;

        const publish = req[0].autopublish;
        if (publish === 'off') return;
        if (publish === 'on') {
          await message.crosspost();
        }
      });
  },
};
