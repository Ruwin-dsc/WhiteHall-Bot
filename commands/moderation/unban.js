const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: 'unban',
  category: 'moderation',
  description: 'Permet de débannir un utilisateur',
  utilisation: 'unban [utilisateur]',
  permission: 'BAN_MEMBERS'
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}unban [utilisateur]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const userId = args[0];
  if (!userId) {
    return message.reply({ embeds: [nondef] });
  }

  try {
    const user = await bot.users.fetch(userId);
    if (!user) {
      const a = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`Je n'ai pas réussi à trouver cet utilisateur !`)
        .setColor(bot.color)
        .setFooter(bot.footer);

      return message.reply({ embeds: [a], ephemeral: true });
    }

    await message.guild.members.unban(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`Utilisateur débanni`)
      .setDescription(`${user} a été débanni avec succès !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    message.reply({ embeds: [embed] });

    bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
      if (req.length > 0) {
        const channellogs = req[0].mods;

        const log = new EmbedBuilder()
          .setColor(bot.color)
          .setTitle('Débannissement')
          .setTimestamp()
          .setDescription(`${message.author} (\`${message.author.id}\`) a débanni ${user} (\`${user.id}\`) !`)
          .setFooter(bot.footer);

        bot.channels.cache.get(channellogs)?.send({ embeds: [log] }).catch(console.error);
      }
    });
  } catch (error) {
    const embed = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`Une erreur s'est produite lors du débannissement. Assurez-vous que l'utilisateur est correct et que j'ai les permissions nécessaires.`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    message.reply({ embeds: [embed] });
  }
};
