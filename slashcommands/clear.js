const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
  name: "clear",
  description: "Permet de supprimer un nombre de message",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  options: [
    {
      type: "number",
      name: "nombre", 
      description: "Le nombre de message à supprimer",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const count = slashCommand.getNumber("nombre");


    let amount = parseInt(count, 10);

    if (amount > 100) {
      amount = 100;
    }

    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      return interaction.reply({ content: "Je ne peux pas supprimer les messages qui datent de plus de 14 jours", ephemeral: true});
    });

    interaction.reply({ content: `J'ai supprimé \`${amount} messages avec succès !\``, ephemeral: true})
    const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Supression de message`)
    .setTimestamp()
    .setDescription(`${interaction.user} a supprimé ${amount} messages dans le salon <#${interaction.channel.id}>.`)
    .setFooter(bot.footer);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch({});
  });



  }
}