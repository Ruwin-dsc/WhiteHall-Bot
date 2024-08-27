const {
  EmbedBuilder
} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "removerole",
  description: "Permet de retirer un rôle à un membre",
  permission: Discord.PermissionFlagsBits.ManageRoles,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur du rôle a retiré !",
      required: true,
      autocomplete: true,
    },
    {
      type: "role",
      name: "role",
      description: "Le rôle a retiré !",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {

    const d = slashCommand.getUser("utilisateur");
    const role = slashCommand.getRole("role");

    const user = interaction.guild.members.cache.get(d.id);


 if (role.position >= interaction.member.roles.highest.position){
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas retirer ce rôle car il est au dessus de toi !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return interaction.reply({ embeds: [a] });
  }
            
  if(user.member && interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }
            

  try {
    await user.roles.remove(role.id);
    const successEmbed = new EmbedBuilder()
      .setDescription(`${user} a été retiré de ce rôle : ${role}.`)
      .setColor(bot.color)
      .setFooter(bot.footer);
    interaction.reply({ embeds: [successEmbed] });
  } catch (error) {
    const errorEmbed = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription("Impossible de retirer ce rôle à ce membre")
      .setColor(bot.color)
      .setFooter(bot.footer);
    interaction.reply({ embeds: [errorEmbed] });
  }

  }
}