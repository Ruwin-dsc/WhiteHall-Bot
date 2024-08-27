const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "afk",
  ustilisation: "afk (raison)",
  description: "Permet de te mettre en AFK",
  category: "géneral",
  permission: "EVERYONE",
};
exports.run = async (bot, message, args) => {
  const content = args.join(" ") || "Aucune Raison";
  bot.db.query(
    `SELECT * FROM afk WHERE userId = "${message.author.id}"`,
    async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        let sql = `INSERT INTO afk (userId, afk, raison) VALUES ('${message.author.id}', 'on', '${content}')`;
        bot.db.query(sql);
      }
    }
  );
  const embed = new EmbedBuilder()
    .setDescription(`Tu as activé le mode AFK\n**Raison :** ${content}`)
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setTitle("afk");
  message.channel.send({ embeds: [embed] });
};
