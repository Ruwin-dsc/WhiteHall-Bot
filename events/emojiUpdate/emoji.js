const Discord = require('discord.js');

module.exports = {
  name: "emojiUpdate",
  execute(oldEmoji, newEmoji, bot, args) {
    bot.db.query(`SELECT emojis FROM logs WHERE guildID = "${oldEmoji.guild.id}"`, async (err, req) => {
      if (req.length < 1) return;
      const lol = req[0].emojis;
      if (lol === 'off') return;
      if (lol == null) return;
      
      const a = bot.channels.cache.get(lol) ? bot.channels.cache.get(lol).name ? "yes" : "no" : "no";
      if (a === "no") return;

      const audit = await oldEmoji.guild.fetchAuditLogs({ 
        type: Discord.AuditLogEvent.EmojiUpdate,
        limit: 1
       });
      const executor = audit.entries.first().executor;

      const embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setThumbnail(bot.user.displayAvatarURL({ size: 2048 }))
        .setTitle("Emojis Modifié <:emoji_7:1193570478984544356>")
        .setDescription(`> Emoji : ${oldEmoji}\n> Ancien: ${oldEmoji.name}\n> Nouveau: ${newEmoji.name}\n> Auteur: ${executor}`)
        .setFooter(bot.footer)
        .setTimestamp();

      bot.channels.cache.get(lol).send({ embeds: [embed] });
    });
  }
};
