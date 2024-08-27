const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "unowner",
  category: 'antiraid',
  description: "Permet de retirer une personne de la liste des owners",
  utilisation: "unowner [utilisateur]",
  permission: "OWNER"
};

exports.run = async (bot, message, args) => {
    const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'utilisateur que vous avez mentionnez n'a pas été trouvé !\n **Utilisation:** \`${bot.prefix}unowner [utilisateur]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

    const nondef2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'utilisateur que vous avez mentionnez n'est pas dans la owner !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if(!args[0]) return message.channel.send({embeds: [nondef]})

    if(args[0]) {
        let user;
    if (message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
        user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
        if (!user) return message.channel.send({embeds: [nondef]})
        bot.db.query(`SELECT * FROM owner WHERE guildId = "${message.guild.id}" AND memberId = "${user.id}"`, async (err, req) => {
            if (req.length < 1) {
                return message.channel.send({embeds: [nondef2]})
            } else {
                bot.db.query(`DELETE FROM owner WHERE memberId = ${user.id} AND guildId = "${message.guild.id}"`);
                const success = new EmbedBuilder()
                .setTitle(`Retirement WL`)
                .setDescription(`${user} a été retiré à la owner avec succès, il pourra maintenant plus bypass les antiraid !`)
                .setColor(bot.color)
                .setFooter(bot.footer)

                message.reply({embeds: [success]})
            }
        })

    }

}
}