const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "secur",
  category: 'antiraid',
  description: "Permet de voir les configurations pour les antiraid",
  utilisation: "secur",
  permission: "ADMINISTRATOR",
  aliases: ["sécurité"]
};

exports.run = async (bot, message, args) => {

  const getConfig = async (table, field) => {
    return new Promise((resolve, reject) => {
      bot.db.query(`SELECT ${field} FROM ${table} WHERE guildId = "${message.guild.id}"`, (err, req) => {
        if (err) {
          return
        } else {
          resolve(req[0]?.[field] || "off");
        }
      });
    });
  };

  const antialt = await getConfig("antialt", "antialt");
  const antibot = await getConfig("antibot", "antibot");
  const antichannel = await getConfig("antichannel", "antichannel");
  const antijoin = await getConfig("antijoin", "antijoin");
  const antilink = await getConfig("antilink", "antilink");
  const antirole = await getConfig("antirole", "antirole");
  const antispam = await getConfig("antispam", "antispam");

  const ARG1 = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle('<:shield_1f6e1fe0f:1199434664029474856>・Antiraid')
    .setDescription(`
      **Anti-channel** : \`${antichannel}\` 
      **Anti-role** : \`${antirole}\` 
      **Anti-bot** : \`${antibot}\` 
      **Anti-link** : \`${antilink}\` 
      **Anti-spam** : \`${antispam}\` 
      **Anti-join** : \`${antijoin}\` 
      **Anti-alt** : \`${antialt}\` 
    `)
    .setTimestamp()
    .setFooter(bot.footer);

  message.reply({ embeds: [ARG1] });
};
