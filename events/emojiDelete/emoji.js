const Discord = require('discord.js');

module.exports = {
  name: "emojiDelete",
  execute(emoji, bot, args) {
    bot.db.query(`SELECT emojis FROM logs WHERE guildID = "${emoji.guild.id}"`, async (err, req) => {
      if (req.length < 1) return;
      const lol = req[0].emojis;
      if (lol === 'off') return;
      if (lol == null) return;
      
      const a = bot.channels.cache.get(lol) ? bot.channels.cache.get(lol).name ? "yes" : "no" : "no";
      if (a === "no") return;

      const audit = await emoji.guild.fetchAuditLogs({ 
        type: Discord.AuditLogEvent.EmojiDelete,
        limit: 1
     });
      const executor = audit.entries.first().executor;

      const embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setThumbnail(bot.user.displayAvatarURL({ size: 2048 }))
        .setTitle("Emojis Supprimé <:emoji_7:1193570478984544356>")
        .setDescription(`> Emoji : ${emoji}\n> Nom de l'emoji : ${emoji.name}\n> Id de l'emoji : ${emoji.id}\n> Url de l'emoji : ${emoji.url}\n> Auteur : ${executor}`)
        .setFooter(bot.footer)
        .setTimestamp();

      bot.channels.cache.get(lol).send({ embeds: [embed] });
    });
  }
};
