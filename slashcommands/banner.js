const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banner",
  description: "Permet de voir la bannière d'un utilisateur",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez avoir la bannière",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const member = slashCommand.getUser("utilisateur");

   const ddEmbed = new EmbedBuilder()
     .setTitle(`${bot.emoji.deny}・Erreur`)
     .setDescription(`<@${member.id}>, n'a pas de bannière`)
     .setColor(bot.color)
     .setFooter(bot.footer);

   const url = await member.fetch()
     .then((user) =>
       user.bannerURL({ format: "png", dynamic: true, size: 4096 })
     );

   if (!url) return interaction.reply({ embeds: [ddEmbed] });
   const embed = new EmbedBuilder()
     .setColor(bot.color)
     .setTitle(member.username)
     .setImage(url)
     .setTimestamp()
     .setFooter(bot.footer);

   interaction.reply({ embeds: [embed] });
  },
};
