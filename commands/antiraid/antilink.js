const { EmbedBuilder } = require('discord.js');
 //antilink, antispam

exports.help = {
  name: "antilink",
  category: 'antiraid',
  description: "Permet d'activer/désactiver le mode antilink",
  utilisation: "antilink [on/off]  [allow/deny] [salon/list]",
  permission: "OWNER"
}

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}antilink [on/off/allow [salon]/deny [salon]/list]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antilink est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antilink est déjà activé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

    const c4 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, ce salon est déjà sur cette autorisation !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.channel.send({ embeds: [nondef] });

  if(args[0] !== 'on' && args[0] !== 'off' && args[0] !== 'allow' && args[0] !== 'deny' && args[0] !== 'list') return message.channel.send({ embeds: [nondef] });

  if (args[0] == 'on') {

    bot.db.query(`SELECT * FROM antilink WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antilink (guildId, antilink) VALUES ("${message.guild.id}", "on")`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink activé`)
          .setDescription(`<@${message.author.id}>, l'antilink a bien été activé !\n*Note: Seul les whitelisters et owners du serveur pourront envoyer des liens*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antilink;
        if (c == 'on') return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE antilink SET antilink = 'on' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink activé`)
          .setDescription(`<@${message.author.id}>, l'antilink a bien été activé !\n*Note: Seul les whitelisters et owners du serveur pourront envoyer des liens*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }

  if (args[0] == 'off') {
    bot.db.query(`SELECT * FROM antilink WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antilink (guildId, antilink) VALUES ("${message.guild.id}", "off")`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink désactivé`)
          .setDescription(`<@${message.author.id}>, l'antilink a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antilink;
        if (c == 'off') return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE antilink SET antilink = 'off' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink désactivé`)
          .setDescription(`<@${message.author.id}>, l'antilink a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }

  if(args[0] == 'allow') {
    if(!args[1]) return message.reply({embeds: [nondef]})
    let text = args[1]
            let i = text.replace("<#", "").split(">").join("")
            const a = bot.channels.cache.get(i) ? bot.channels.cache.get(i).name ? "yes" : "no" : "no"
            if(a === "no") return message.channel.send({embeds: [b]});

            bot.db.query(`SELECT * FROM antilinksalon WHERE channelId = "${i}"`, async (err, req) => {
              if(err) throw err;
          
              if(req.length < 1){

            bot.db.query(`INSERT INTO antilinksalon (guildId, channelId, autorisation) VALUES ("${message.guild.id}", "${i}", "allow")`)

            const success = new EmbedBuilder()
          .setTitle(`Antilink`)
          .setDescription(`<@${message.author.id}>, l'antilink sera ignorer pour le salon <#${i}> !`)
          .setColor(bot.color)
          .setFooter(bot.footer);

          message.channel.send({embeds: [success]})
              } else {
                let autorisation = req[0].autorisation
                if(autorisation == 'allow') return message.reply({embeds: [c4]})
                bot.db.query(`UPDATE antilinksalon SET autorisation = 'allow' WHERE channelId = ${i}`)

                const success = new EmbedBuilder()
          .setTitle(`Antilink`)
          .setDescription(`<@${message.author.id}>, l'antilink sera ignorer pour le salon <#${i}> !`)
          .setColor(bot.color)
          .setFooter(bot.footer);

          message.channel.send({embeds: [success]})
              }})
            
          
          
          }

  if(args[0] == 'deny') {
    if(!args[1]) return message.reply({embeds: [nondef]})
    let text = args[1]
            let i = text.replace("<#", "").split(">").join("")
            const a = bot.channels.cache.get(i) ? bot.channels.cache.get(i).name ? "yes" : "no" : "no"
            if(a === "no") return message.channel.send({embeds: [b]});

            bot.db.query(`SELECT * FROM antilinksalon WHERE channelId = "${i}"`, async (err, req) => {
              if(err) throw err;
          
              if(req.length < 1){

            bot.db.query(`INSERT INTO antilinksalon (guildId, channelId, autorisation) VALUES ("${message.guild.id}", "${i}", "deny")`)

            const success = new EmbedBuilder()
          .setTitle(`Antilink`)
          .setDescription(`<@${message.author.id}>, l'antilink ne sera pas ignorer pour le salon <#${i}> !`)
          .setColor(bot.color)
          .setFooter(bot.footer);

          message.channel.send({embeds: [success]})
              } else {
                let autorisation = req[0].autorisation
                if(autorisation == 'deny') return message.reply({embeds: [c4]})
                bot.db.query(`UPDATE antilinksalon SET autorisation = 'deny' WHERE channelId = ${i}`)

                const success = new EmbedBuilder()
          .setTitle(`Antilink`)
          .setDescription(`<@${message.author.id}>, l'antilink ne sera pas ignorer pour le salon <#${i}> !`)
          .setColor(bot.color)
          .setFooter(bot.footer);

          message.channel.send({embeds: [success]})
              }})
            
    
  }

  if(args[0] == 'list') {
    bot.db.query(`SELECT * FROM antilinksalon WHERE guildId = "${message.guild.id}"`, (err, results) => {
      if (err) throw err;

      const allowedChannels = results.filter((result) => result.autorisation === 'allow');
      const deniedChannels = results.filter((result) => result.autorisation === 'deny');

      const allowedList = allowedChannels.map((channel) => {
        return `<#${channel.channelId}> \`${channel.channelId}\``;
      });

      const deniedList = deniedChannels.map((channel) => {
        const channelObj = message.guild.channels.cache.get(channel.channelId);
        return `<#${channel.channelId}> \`${channel.channelId}\``;
      });

      const listEmbed = new EmbedBuilder()
        .setTitle(`Salons autorisés et refusés`)
        .addFields({ name:'Salons autorisés', value: allowedList.length > 0 ? allowedList.join('\n') : 'Aucun'})
        .addFields({ name:'Salons refusés', value: deniedList.length > 0 ? deniedList.join('\n') : 'Aucun'})
        .setColor(bot.color)
        .setFooter(bot.footer);
      message.channel.send({ embeds: [listEmbed] });
    });
  }
}
