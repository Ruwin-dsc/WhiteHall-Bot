const Discord = require('discord.js');

module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
    const guildID = member.guild.id;
    bot.db.query(`SELECT * FROM logs WHERE guildID = "${guildID}"`, async (err, req) => {
      if (req.length < 1) return;

      const channel = req[0].joinleave;
      if (!channel || channel === 'off') return;

      const channelObj = bot.channels.cache.get(channel);
      if (!channelObj) return;

      const newMemberEmbed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Membre rejoint !")
        .setDescription(`${member.user} (\`${member.id}\`) vient de rejoindre le serveur !\nNous sommes maintenant **${member.guild.memberCount}** membres !`)
        .setTimestamp()
        .setFooter(bot.footer);

      channelObj.send({ embeds: [newMemberEmbed] });
    });
  }
};
