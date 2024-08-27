const Discord = require("discord.js")
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "confess",
  description: "Permet d'envoyer une confession",
  permission: "Aucune",
  dm: false,
  options: [
    {
      type: "string",
      name: "confession",
      description: "T'as confession que tu souhaites partager au serveur.",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const suggestq = slashCommand.get("confession").value;


    let b = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(
        `<@${interaction.user.id}>, le serveur n'a pas renseigné le salon des confessions ou il est invalide, pour configurer ce salon faîtes cette commande \`${bot.prefix}setconfess [channel]\` `
      )
      .setColor(bot.color)
      .setFooter(bot.footer);


    bot.db.query(
      `SELECT * FROM Confession WHERE guildId = "${interaction.guild.id}"`,
      async (err, req) => {
        if (req.length < 1) return interaction.reply({ embeds: [b] });
        const channelconfess = req[0].confesschannel;
        const numberconfess = req[0].nombre;

        const a = bot.channels.cache.get(channelconfess)
          ? bot.channels.cache.get(channelconfess).name
            ? "yes"
            : "no"
          : "no";
        if (a === "no") return interaction.reply({ embeds: [b] });


        bot.db.query(
          `UPDATE Confession set nombre = ${
            Number(numberconfess) + Number(1)
          } WHERE guildId = '${interaction.guild.id}'`
        );

        const embed = new EmbedBuilder()
          .setTitle(
            `Nouvelle Confession ! (#${numberconfess}) ${bot.emoji.blackheart} `
          )
          .setDescription(`${suggestq}`)
          .setColor(bot.color)
          .setFooter(bot.footer)
          .setTimestamp();

        const conf = new EmbedBuilder()
          .setDescription(
            `Votre confession a été transféré ici <#${channelconfess}> ${bot.emoji.blackheart} `
          )
          .setColor(bot.color)
          .setFooter(bot.footer);

        interaction.reply({ embeds: [conf], ephemeral: true });

        await interaction.guild.channels.cache
          .get(channelconfess)
          .send({ embeds: [embed] });
      }
    );
  }}