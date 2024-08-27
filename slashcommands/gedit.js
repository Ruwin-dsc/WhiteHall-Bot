const { EmbedBuilder } = require('discord.js');
const ms = require('ms');
const Discord = require("discord.js")

module.exports = {
  name: "gedit",
  description: "Permet de modifier un giveaway",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  options: [
    {
      type: "string",
      name: "messageid",
      description: "L'identifiant du interaction du giveaway à modifier'",
      required: true,
      autocomplete: false,
    },
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

    let gwID = slashCommand.getString("messageid")
    let duratione = slashCommand.getString("temps")
    let winnerCounte = slashCommand.getNumber("gagnants");
    let price = slashCommand.getString("prix")

    let embed = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${interaction.user.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}gedit [ID MSG] [TEMPS A ADD (s = secondes, m = minutes, h = heures, d = jours)] [Nb GAGNANT] [PRIX]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  let notfound = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${interaction.user.id}>, Je n'ai pas trouvé le giveaway !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  

  if (!duratione || isNaN(ms(duratione))) {
    return interaction.reply({ embeds: [embed] });
  }

  if (isNaN(winnerCounte) || parseInt(winnerCounte) <= 0) {
    return interaction.reply({ embeds: [embed] });
  }


  bot.giveawaysManager
    .edit(gwID, {
      newWinnersCount: parseInt(winnerCounte),
      newPrize: price,
      addTime: ms(duratione)
    })
    .catch(() => interaction.reply({ embeds: [notfound] }));

      interaction.reply({content: "Good !", ephemeral: true})
  }}