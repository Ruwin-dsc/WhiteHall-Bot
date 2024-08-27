const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

exports.help = {
  name: "wl",
  category: 'antiraid',
  description: "Permet de whiteliser une personne pour bypass les antiraid ",
  utilisation: "wl (utilisateur)",
  permission: "OWNER",
  aliases: ["whitelist"]
};

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'utilisateur que vous avez mentionnez n'a pas été trouvé !\n **Utilisation:** \`${bot.prefix}wl (utilisateur)\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

    const nondef2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'utilisateur que vous avez mentionnez est déjà dans la whitelist !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

    if (!args[0]) {
        bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}"`, async (err, whitelist) => {
          if (err) throw err;
      
          if (whitelist.length === 0) {
            const embed = new EmbedBuilder()
              .setTitle('Liste des utilisateurs whiteliste')
              .setDescription('Aucun utilisateur whiteliste.')
              .setColor(bot.color)
              .setFooter(bot.footer);
      
            return message.channel.send({ embeds: [embed] });
          }
      
          const usersPerPage = 10;
          const totalPages = Math.ceil(whitelist.length / usersPerPage); 
      
          let page = 1;
          let startIndex = (page - 1) * usersPerPage;
          let endIndex = startIndex + usersPerPage;
          let usersToShow = whitelist.slice(startIndex, endIndex);
      
          const previousButton = new ButtonBuilder()
            .setCustomId('previous')
            .setLabel('Précédent')
            .setStyle(ButtonStyle.Primary);
      
          const nextButton = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Suivant')
            .setStyle(ButtonStyle.Primary);
      
          const buttonRow = new ActionRowBuilder().addComponents(previousButton, nextButton);
      
          const embed = new EmbedBuilder()
            .setTitle('Liste des utilisateurs whiteliste')
            .setDescription(usersToShow.map(user => `<@${user.memberId}>: \`${user.memberId}\``).join('\n'))
            .setColor(bot.color)
            .setFooter(bot.footer)
            .setTimestamp();
      
          const messageSent = await message.channel.send({ embeds: [embed], components: [buttonRow] });
      
          const filter = i => (i.customId === 'previous' || i.customId === 'next') && i.user.id === message.author.id;
          const collector = messageSent.createMessageComponentCollector({ filter });
      
          collector.on('collect', async interaction => {
            if (interaction.customId === 'previous') {
              page--;
            } else if (interaction.customId === 'next') {
              page++;
            }
      
            startIndex = (page - 1) * usersPerPage;
            endIndex = startIndex + usersPerPage;
            usersToShow = whitelist.slice(startIndex, endIndex);
      
            embed.setDescription(usersToShow.map(user => `<@${user.memberId}>`).join('\n'));
            embed.setFooter(`Page ${page}/${totalPages}`);
      
            await interaction.update({ embeds: [embed] });
          });
      
          collector.on('end', () => {
            buttonRow.components.forEach(component => component.setDisabled(true));
            messageSent.edit({ components: [buttonRow] });
          });
        });
      
        return;
      }

    if(args[0]) {
        let user;
    if (message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
        user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
        if (!user) return message.channel.send({embeds: [nondef]})
        bot.db.query(`SELECT * FROM whitelist WHERE guildId = "${message.guild.id}" AND memberId = "${user.id}"`, async (err, req) => {
            if (req.length < 1) {
                bot.db.query(`INSERT INTO whitelist (guildId, memberId) VALUES ("${message.guild.id}", "${user.id}")`);
                const success = new EmbedBuilder()
                .setTitle(`Ajout WL`)
                .setDescription(`${user} a été ajouté à la whitelist avec succès, il pourra maintenant bypass les antiraid !`)
                .setColor(bot.color)
                .setFooter(bot.footer)

                message.reply({embeds: [success]})
            } else {
                return message.channel.send({embeds: [nondef2]})
            }
        })

    }

}

    
  

}