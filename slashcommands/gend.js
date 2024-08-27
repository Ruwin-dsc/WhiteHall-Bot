const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
  name: "gend",
  description: "Permet de finir un giveaway",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  options: [
    {
      type: "string",
      name: "messageid",
      description: "L'identifiant du interaction du giveaway à terminer'",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {

    let gwID = slashCommand.getString("messageid")



  let notfound = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${interaction.user.id}>, Je n'ai pas trouvé le giveaway !`)
    .setColor(bot.color)
    .setFooter(bot.footer);


  bot.giveawaysManager
    .end(gwID, 'Il n\'y a pas assez de participants pour terminer un giveaway', {
      winMessage: 'Félicitation, {winners}! Tu as gagné **{this.prize}**!',
      messages: {
        congrat: `${bot.emoji.tada} Bien joué {winners}, le giveaway est terminé, tu as gagné **{this.prize}**!`,
        error: 'Il n\'y a pas assez de participants pour terminer un giveaway'
      }
    })
    .catch(() => interaction.reply({ embeds: [notfound] }))
    .then(() => {
      interaction.reply('Le giveaway a été terminé avec succès !');
    });

  }
}