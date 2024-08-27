const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "unbl",
  category: 'antiraid',
  description: "Permet de unblackister un utilisateur.",
  utilisation: "unbl [utilisateur]",
  permission: "OWNER"
};

exports.run = async (bot, message, args) => {
  

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'utilisateur que vous avez mentionnez n'a pas été trouvé !\n **Utilisation:** \`${bot.prefix}unbl [utilisateur]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

    const nondef2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'utilisateur que vous avez mentionnez n'est pas dans la blacklist !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if(!args[0]) return message.channel.send({embeds: [nondef]})

    if(args[0]) {
        let user;
    if (message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
        user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
        if (!user) return message.channel.send({embeds: [nondef]})
        bot.db.query(`SELECT * FROM blacklist WHERE guildId = "${message.guild.id}" AND memberId = "${user.id}"`, async (err, req) => {
            if (req.length < 1) {
                return message.channel.send({embeds: [nondef2]})
            } else {
                bot.db.query(`DELETE FROM blacklist WHERE memberId = ${user.id} AND guildId = "${message.guild.id}"`);
                const success = new EmbedBuilder()
                .setTitle(`Retirement BL`)
                .setDescription(`${user} a été retiré à la blacklist avec succès !`)
                .setColor(bot.color)
                .setFooter(bot.footer)

                message.guild.members.unban(user);

                message.reply({embeds: [success]})
            }
        })

    }

}}