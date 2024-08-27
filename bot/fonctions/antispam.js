const UserMap = new Map();
const Discord = require("discord.js");

module.exports = async (message, bot) => {
  bot.db.query(
    `SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND memberId = "${message.author.id}"`,
    async (err, req) => {
      if (req.length > 0) {
        return;
      } else {
        bot.db.query(
          `SELECT * FROM antispamsalon WHERE channelId = "${message.channel.id}"`,
          async (err, req) => {
            if (req.length < 1) {
              if (UserMap.get(message.author.id)) {
                const UserData = UserMap.get(message.author.id);
                const { lastMessage, timer } = UserData;
                const difference = message.createdTimestamp - lastMessage.createdTimestamp;
                let msgCount = UserData.msgCount;

                if (difference > 5000) {
                  clearTimeout(timer);
                  UserData.msgCount = 1;
                  UserData.lastMessage = message;
                  UserData.timer = setTimeout(() => {
                    UserMap.delete(message.author.id);
                  }, 60000);

                  UserMap.set(message.author.id, UserData);
                } else {
                  msgCount++;

                  if (msgCount >= 15) {

                    const messages = [
                      ...(await message.channel.messages.fetch({
                        limit: 100,
                        before: message.id,
                      }))
                        .filter((msg) => msg.author.id === message.author.id)
                        .map((msg) => msg.id),
                    ];

                    if (messages.length > 1) {
                      await message.channel.bulkDelete(messages);
                      await message.channel
                        .send(`Attention ${message.author}, vous envoyez trop de messages en peu de temps !`)
                        .then(async (mess) => setTimeout(async () => mess.delete(), 2000));
                      await message.guild.members.cache.get(message.author.id).timeout(60000, 'antispam');

                      bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
                        if (req.length < 1) return;

                        const logs = req[0].antiraid;
                        if (logs == 'off') return;

                        const a = bot.channels.cache.get(logs) ? (bot.channels.cache.get(logs).name ? 'yes' : 'no') : 'no';
                        if (a === 'no') return;

                        const embed = new Discord.EmbedBuilder()
                          .setTitle('Anti Spam')
                          .setDescription(`<@${message.author.id}> vient de spam, les messages ont été supprimés !`)
                          .setColor(bot.color)
                          .setTimestamp()
                          .setFooter(bot.footer);
                        bot.channels.cache.get(logs).send({ embeds: [embed] });
                      });
                    } else {
                      msgCount = 1;
                    }
                  }

                  UserData.msgCount = msgCount;
                  UserData.lastMessage = message;
                  UserMap.set(message.author.id, UserData);
                }
              } else {
                const user = message.author;
                const fn = setTimeout(async () => {
                  UserMap.delete(user.id);
                }, 60000);

                UserMap.set(message.author.id, {
                  msgCount: 1,
                  lastMessage: message,
                  timer: fn,
                });
              }
            }
          }
        );
      }
    }
  );
};
