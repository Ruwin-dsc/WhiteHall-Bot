const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildMemberAdd",
  execute(member, bot) {

      bot.db.query(`SELECT * FROM configuration WHERE guildID = "${member.guild.id}"`, async (err, req) => {
        if (req.length < 1 || req[0].joinsettings === 'off') return;

        const channel = req[0].joinsettings;
        const channelObj = bot.channels.cache.get(channel);
        if (!channelObj) return;

        const newMemberEmbed = new EmbedBuilder()
          .setColor("Purple")
          .setTitle("Bienvenue ! <a:bvn:1199408682740494407>")
          .setDescription(`<a:CFlecheBlue:1199408837283827843> ${member.user} vient de rejoindre le serveur ! <a:p_pokesparkles:1199409011435511889>\n <a:CFlecheBlue:1199408837283827843> On te souhaite la bienvenue ^^. \n <a:CFlecheBlue:1199408837283827843> N'hésite pas à inviter tes potes ! \n <a:CFlecheBlue:1199408837283827843> Nous sommes maintenant **${member.guild.memberCount}** membres <a:IHaveNoHands:1199409072374558780> !`)
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .setFooter(bot.footer);

        channelObj.send({ embeds: [newMemberEmbed] });
      });

  }
};