const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "prune",
  category: 'outils',
  description: "Permet de supprimer les messages d'un membre",
  utilisation: "prune [membre] [nombre]",
  permission: 'MANAGE_MESSAGES'
}

exports.run = async (bot, message, args, db) => {
   const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}prune [membre] [nombre]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);
  const nondef1 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, veuillez indiquer un nombre entre 1 et 100 !\n **Utilisation:** \`${bot.prefix}prune [membre] [nombre]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
  if (!user) return message.reply({ embeds: [nondef] });

  const number = message.user ? args._hoistedOptions[1].value : args[1];
  if (!number || isNaN(number) || parseInt(number) < 1 || parseInt(number) > 100) {
    return message.reply({ embeds: [nondef1] });
  }

  await message.delete();

  const messages = [...(await message.channel.messages.fetch()).values()].filter(m => m.author.id === user.id && m.createdAt > (Date.now() - 1209600000)).slice(0, parseInt(number));
  if (messages.length <= 0) {
    return message.channel.send(`${user} n'a envoyé aucun message dans ce salon les 14 derniers jours...`).then(async mess => setTimeout(async () => { mess.delete() }, 5000));
  }

  const deletedMessages = await message.channel.bulkDelete(messages);

  const log = new EmbedBuilder()
  .setColor(bot.color)
  .setTitle(`Supression de message`)
  .setTimestamp()
  .setDescription(`${message.author} a supprimé ${number} messages de ${user} dans le salon <#${message.channel.id}>.`)
  .setFooter(bot.footer);

bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
  if (req.length < 1) return;
  const channellogs = req[0].mods;

  bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; });
});

  await message.channel.send(`J'ai supprimé \`${deletedMessages.size}\` message(s) de \`${user.tag}\``).then(async mess => setTimeout(async () => { mess.delete() }, 5000));
}
