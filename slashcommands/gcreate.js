const { EmbedBuilder } = require('discord.js');
const ms = require('ms');
const Discord = require("discord.js")

module.exports = {
  name: "gcreate",
  description: "Permet de créer un giveaway",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  options: [
    {
      type: "string",
      name: "temps",
      description: "Le temps du giveaway. (s = secondes, m = minutes, h = heures, d = jours)",
      required: true,
      autocomplete: false,
    },
    {
      type: "number",
      name: "gagnants", 
      description: "Le nombre de gagnants",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "prix", 
      description: "Le prix du giveaway",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    let duration = slashCommand.getString("temps")
    let winnerCount = slashCommand.getNumber("gagnants");
    let prize = slashCommand.getString("prix")

     let embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${interaction.user.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`/gcreate (s = secondes, m = minutes, h = heures, d = jours) [Nb GAGNANTS] [PRIX]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!duration || isNaN(ms(duration))) {
    return interaction.reply({ embeds: [embed] });
  }

  if (isNaN(winnerCount) || parseInt(winnerCount) <= 0) {
    return interaction.reply({ embeds: [embed] });
  }
  if (!prize) {
    return interaction.reply({ embeds: [embed] });
  }

  interaction.reply({ content: `Le giveaway a été lancé avec succès !`, ephemeral: true})

  return bot.giveawaysManager.start(interaction.channel, {
    prize: prize,
    duration: ms(duration),
    winnerCount: parseInt(winnerCount),
    hostedBy: interaction.user,
    messages: {
      giveaway: `${bot.emoji.tada} **GIVEAWAY** ${bot.emoji.tada}`,
      giveawayEnded: `${bot.emoji.tada} **GIVEAWAY TERMINÉ** ${bot.emoji.tada}`,
      timeRemaining: 'Temps restant: **{duration}**',
      inviteToParticipate: `Réagis avec ${bot.emoji.tada} pour participer au giveaway!`,
      winMessage: `Félicitations, {winners}! Tu as gagné **${prize}**!`,
      embedFooter: bot.footer,
      noWinner: 'Giveaway annulé, aucun participant valide.',
      hostedBy: `Organisé par: ${interaction.user}`,
      winners: 'Gagnant(s)',
      endedAt: 'Terminé le'
    }
  });

  }}

