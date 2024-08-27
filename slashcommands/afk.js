const {
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "afk",
  description: "Permet de vous mettre en mode AFK",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "string",
      name: "raison",
      description: "Raison de l'AFK",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    let content
     content = slashCommand.getString("raison");
     if(!content) content = "Aucune Raison"
     bot.db.query(
       `SELECT * FROM afk WHERE userId = "${interaction.user.id}"`,
       async (err, req) => {
         if (err) throw err;

         if (req.length < 1) {
           let sql = `INSERT INTO afk (userId, afk, raison) VALUES ('${interaction.user.id}', 'on', '${content}')`;
           bot.db.query(sql);
         }
       }
     );
     const embed = new EmbedBuilder()
       .setDescription(`Tu as activé le mode AFK\n**Raison :** ${content}`)
       .setColor(bot.color)
       .setFooter(bot.footer)
     interaction.reply({ embeds: [embed], ephemeral: true });

  }}