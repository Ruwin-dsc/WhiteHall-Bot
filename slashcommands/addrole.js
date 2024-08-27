const {
  EmbedBuilder
} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "addrole",
  description: "Permet d'ajouté un rôle à un membre",
  permission: Discord.PermissionFlagsBits.ManageRoles,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur du rôle a ajouté !",
      required: true,
      autocomplete: true,
    },
    {
      type: "role",
      name: "role",
      description: "Le rôle a ajouté !",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {

    const d = slashCommand.getUser("utilisateur");
    const role = slashCommand.getRole("role");

    const user = interaction.guild.members.cache.get(d.id);

    const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${interaction.user.id}>, l'utilisateur que vous avez spécifier n'est pas sur le serveur !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

    if(!user) return interaction.reply({ embeds: [nondef], ephemeral: true})

  if (role.position >= interaction.member.roles.highest.position){
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas ajouter ce rôle car il est au dessus de toi !`)
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
    await user.roles.add(role.id);
  } catch (error) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`Une erreur s'est produite lors de l'ajout du rôle. Assurez-vous que le rôle existe et que je dispose des permissions nécessaires.`)
      .setColor(bot.color)
      .setFooter(bot.footer);
      console.log(error)
    return interaction.reply({ embeds: [a] });
  }

  const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Ajout d'un rôle`)
    .setTimestamp()
    .setDescription(`${interaction.user} a ajouté le rôle ${role} (\`${role.id}\`) à ${user} (\`${user.id}\`).`)
    .setFooter(bot.footer);

  interaction.reply({ content: `${user}`, embeds: [log] });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch({});
  });


  }
}