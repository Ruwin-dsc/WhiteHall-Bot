const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildMemberAdd",
  execute(member, bot) {
    bot.db.query(`SELECT * FROM antijoin WHERE guildId = "${member.guild.id}"`, async (err, req) => {
      if (req.length < 1) return;
      if (req[0].antijoin === "off") return;
      if (req[0].antijoin === "on") {
        await member.send('Vous avez rejoint un serveur où l\'antijoin est activé !');
        await member.kick("Mode antijoin activé");

        bot.db.query(`SELECT * FROM logs WHERE guildID = "${member.guild.id}"`, async (err, req) => {
          if (req.length < 1) return;
          const logs = req[0].antijoin;
          if (logs == "off") return;
          const a = bot.channels.cache.get(logs) ? bot.channels.cache.get(logs).name ? "yes" : "no" : "no";
          if (a === "no") return;

          const embed = new EmbedBuilder()
            .setTitle(`Anti Raid`)
            .setDescription(`${member} vient de rejoindre, il a été exclu car l'antijoin est activé !`)
            .setColor(bot.color)
            .setTimestamp()
            .setFooter(bot.footer);

          bot.channels.cache.get(logs).send({ embeds: [embed] });
        });
      }
    });
  }
};