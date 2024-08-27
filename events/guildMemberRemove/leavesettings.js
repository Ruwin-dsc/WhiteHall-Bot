const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildMemberRemove",
  async execute(member, bot) {
      bot.db.query(`SELECT * FROM configuration WHERE guildId = "${member.guild.id}"`, async (err, req) => {
        if (req.length < 1 || req[0].leavesettings === 'off') return;

        const channel = req[0].leavesettings;
        const channelObj = bot.channels.cache.get(channel);
        if (!channelObj) return;

        const newMemberEmbed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Au revoir ! <a:Leave_1:1178415999003934761>")
          .setDescription(`<a:FlechePink:1178416136396738743>${member.user} vient de quitter le serveur ! \n <a:FlechePink:1178416136396738743> J'espère qu'il reviendra ; ; ! \n <a:CFlecheBlue:1178389219287257169> Nous sommes maintenant **${member.guild.memberCount}** membres !`)
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .setFooter(bot.footer);

        channelObj.send({ embeds: [newMemberEmbed] });
      });
  }
};