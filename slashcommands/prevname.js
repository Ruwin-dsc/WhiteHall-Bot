const Discord = require("discord.js")
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "prevname",
  description: "Permet de voir les anciens pseudos d'un utilisateur",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "Les anciens noms de l'utilisateur",
      required: true,
      autocomplete: true
    },
  ],

  async run(bot, interaction, slashCommand) {
    const user = slashCommand.getUser("utilisateur");

     if (!user) {
      return interaction.reply(
        `Impossible de trouver l'utilisateur spécifié.\n**Utilisation:** </prevname:1122150712747491369>`
      );
    }
    const anyprevname = new EmbedBuilder()
      .setTitle(`Liste des anciens pseudos de ${user.username}`)
      .setDescription(`*Aucun prevname*`)
      .setFooter(bot.footer)
      .setColor(bot.color);

    bot.db.query(
      `SELECT * FROM prevname WHERE userID = '${user.id}'`,
      async (err, req) => {
        if (req.length < 1) {
          return interaction.reply({ embeds: [anyprevname] });
        }

        await req.sort((a, b) => parseInt(b.date) - parseInt(a.date));

        const embeds = [];
        let currentPage = 0;
        const itemsPerPage = 10;
        const totalPages = Math.ceil(req.length / itemsPerPage);

        for (let i = 0; i < req.length; i += itemsPerPage) {
          const embed = new EmbedBuilder()
            .setTitle(`Liste des anciens pseudos de ${user.username}`)
            .setColor(bot.color)
            .setTimestamp()
            .setFooter(bot.footer);

          let description = "";
          for (let j = i; j < i + itemsPerPage && j < req.length; j++) {
            description += `<t:${Math.floor(
              parseInt(req[j].Date / 1000)
            )}> - **${req[j].pseudo}**\n`;
          }

          embed.setDescription(description);
          embeds.push(embed);
        }

        const initialinteraction = await interaction.reply({
          embeds: [embeds[currentPage]],
        });
      })
    
    },
};