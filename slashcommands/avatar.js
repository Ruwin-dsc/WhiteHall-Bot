const Discord = require("discord.js")
const {
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Permet de voir l'avatar d'un utilisateur",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez avoir l'avatar",
      required: true,
      autocomplete: true
    },
  ],

  async run(bot, interaction, slashCommand) {
    const user = slashCommand.getUser("utilisateur");

    const avatar = user.displayAvatarURL({ size: 4096, dynamic: true });

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.username}`)
      .setImage(avatar)
      .setColor(bot.color)
      .addFields(
        {
          name: "PNG",
          value: `[LIEN](${user.displayAvatarURL({ format: "png" })})`,
          inline: true,
        },
        {
          name: "JPEG",
          value: `[LIEN](${user.displayAvatarURL({ format: "jpg" })})`,
          inline: true,
        },
        {
          name: "WEBP",
          value: `[LIEN](${user.displayAvatarURL({ format: "webp" })})`,
          inline: true,
        },
        {
          name: "GIF",
          value: `[LIEN](${user.displayAvatarURL({ format: "gif" })})`,
          inline: true,
        }
      )
      .setFooter(bot.footer)
      .setTimestamp()
      .setURL(user.displayAvatarURL({ dynamic: true }));

    interaction.reply({ embeds: [embed] });

  }}