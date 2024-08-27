const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

exports.help = {
  name: 'massiverole',
  category: 'outils',
  permission: 'MANAGE_ROLES',
  description: 'Ajoute/retire un rôle aux membres du serveur',
  utilisation: 'massiverole add/remove [role]',
};

exports.run = async (bot, message, args) => {
  let roleName = args[2];
  if (!roleName) return message.reply(`Veuillez spécifier un rôle valide.`);

  let role = message.guild.roles.cache.get(roleName) ||
    message.mentions.roles.first() ||
    message.guild.roles.cache.find((r) => r.name === roleName) ||
    message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === roleName.toLowerCase()
    );

  if (!role) return message.reply(`Veuillez spécifier un rôle valide.`);

  let users = message.guild.members.cache.filter(
    (m) => !m.roles.cache.has(role.id)
  );

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('add')
        .setLabel('Ajouter')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('remove')
        .setLabel('Retirer')
        .setStyle('DANGER')
    );

  const embed = new MessageEmbed()
    .setTitle(`Gestion de rôles massifs`)
    .setDescription(`Voulez-vous ajouter ou retirer le rôle ${role}?`)
    .setColor('BLUE');

  const reply = await message.reply({
    content: 'Sélectionnez une action :',
    embeds: [embed],
    components: [row]
  });

  const filter = (interaction) => interaction.user.id === message.author.id;
  const collector = reply.createMessageComponentCollector({ filter, time: 30000 });

  collector.on('collect', async (interaction) => {
    if (interaction.customId === 'add') {
      await addRoles(users, role);
    } else if (interaction.customId === 'remove') {
      await removeRoles(users, role);
    }

    reply.edit({ content: 'Action terminée.', components: [] });
    collector.stop();
  });

  collector.on('end', () => {
    if (reply.components && reply.components.length > 0) {
      reply.edit({ content: 'Interaction expirée.', components: [] });
    }
  });
};

async function addRoles(users, role) {
  for (const user of users.values()) {
    try {
      await user.roles.add(role);
    } catch (error) {
      console.error(`Erreur lors de l'ajout du rôle à l'utilisateur ${user.user.tag}:`, error);
    }
  }
}

async function removeRoles(users, role) {
  for (const user of users.values()) {
    try {
      await user.roles.remove(role);
    } catch (error) {
      console.error(`Erreur lors de la suppression du rôle de l'utilisateur ${user.user.tag}:`, error);
    }
  }
}
