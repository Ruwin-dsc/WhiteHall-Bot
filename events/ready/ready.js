const loadSlashCommands = require("../../handlers/slashcommand");
const { ActivityType, Events } = require("discord.js");

module.exports = {
  name: "ready",
  async execute(bot) {
    await loadSlashCommands(bot);
    console.log(`Connectés à ${bot.user.username}`);
    console.log(`Le bot est utilisé sur ${bot.guilds.cache.size} serveur(s) !`);

    let ourstatusarray = `Shinetsus V 0.1`;
    bot.user.setPresence({
      activities: [
        {
          name: ourstatusarray,
          type: ActivityType.Streaming,
          url: "https://www.twitch.tv/",
        },
      ],
      status: "online",
    });
  },
};
