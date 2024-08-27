const {
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "firstmsg",
  description: "Permet d'avoir le premier message du salon",
  permission: "Aucune",
  dm: false,

  async run(bot, interaction, slashCommand) {
    const { channel } = interaction;
    const fetchMessages = await channel.messages.fetch({ after: 1, limit: 1 });
    const msg = fetchMessages.first();
    const embed = new EmbedBuilder()
      .setTitle(`Premier messages du salon <#${channel.id}>`)
      .setURL(msg.url)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `Auteur: ${msg.author} \nID du message: ${msg.id}\nContenu: ${msg.content}`
      )
      .setColor(bot.color)
      .setFooter(bot.footer);
    await interaction.reply({ embeds: [embed] });

  }}