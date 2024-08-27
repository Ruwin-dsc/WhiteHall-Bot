const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, bot, args) {
    try {
      bot.db.query(`SELECT * FROM antialt WHERE guildId = "${member.guild.id}"`, async (err, req) => {
        if (req.length < 1) return;

        const antialt = req[0]?.antialt;
        if (antialt !== 'on') return;

        const timeSpan = ms('3 days');
        const k = new EmbedBuilder()
          .setTitle('__Tu as été kick__')
          .setDescription("L'antialt est activé ! Tu as été expulsé car ton compte a été créé il y a moins de 3 jours.")
          .setColor(bot.color)
          .setFooter(bot.footer)
          .setThumbnail(member.displayAvatarURL({ dynamic: true }));

        const createdAt = new Date(member.user.createdAt).getTime();
        const difference = Date.now() - createdAt;

        if (difference < timeSpan) {
          member.send(k).catch(() => {});

          member.kick('Antialt by Shinetsus');

          bot.db.query(`SELECT antiraid FROM logs WHERE guildID = "${member.guild.id}"`, async (err, req) => {
            if (req.length < 1) return;

            const logs = req[0]?.antiraid;

            if (logs !== 'off') {
              const logsChannel = bot.channels.cache.get(logs);

              if (logsChannel) {
                const embed = new Discord.EmbedBuilder()
                  .setTitle('Anti Alt')
                  .setDescription(`${member} a rejoint le serveur, mais son compte a été créé il y a moins de 3 jours !`)
                  .setColor(bot.color)
                  .setTimestamp()
                  .setFooter(bot.footer);

                logsChannel.send({ embeds: [embed] });
              }
            }
          });
        }
      });
    } catch (e) {
      return;
    }
  }
};