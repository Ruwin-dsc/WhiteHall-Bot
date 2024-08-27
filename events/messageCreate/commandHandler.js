const Discord = require("discord.js");

module.exports = {
  name: "messageCreate",
  execute(message, bot) {
    if(!message.guild) return
    bot.db.query(`SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(err) throw err
      let prefix;
        if(req.length < 1) {
            prefix = "<"
        } else {
            prefix = req[0].prefix
        }

        const mention = `<@${bot.user.id}>`;
        if (message.author.bot) return;

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase();
        let args = messageArray.slice(1);

        if (!(cmd.startsWith(prefix) || cmd.startsWith(mention))) return;
        let slicecmd;
        if (cmd.startsWith(prefix)) slicecmd = cmd.slice(prefix.length);
        if (cmd.startsWith(mention)) slicecmd = cmd.slice(mention.length);

        let commandfile = bot.commands.get(slicecmd);
        if (!commandfile) return;

        if (!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
        const a = new Discord.EmbedBuilder()
          .setTitle(`${bot.emoji.deny}・Erreur`)
          .setDescription(`<@${message.author.id}>, pour que je puisse bien fonctionner sur le serveur merci de me mettre la permission \`ADMINISTRATOR\`\nSupport: https://discord.gg/7xFnasnrtf !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.channel.send({ embeds: [a] });
      }

       bot.db.query(`SELECT * FROM owner WHERE memberId = "${message.author.id}" AND guildId = "${message.guild.id}"`, async (err, req) => {
        if(req.length < 1) {
        if (commandfile.help.permission == "OWNER") {
          const reas = new Discord.EmbedBuilder()
            .setTitle(`${bot.emoji.deny}・Erreur`)
            .setDescription(
              `<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Couronne du serveur\` !`
            )
            .setColor(bot.color)
            .setFooter(bot.footer);
          if (message.author.id !== message.guild.ownerId) return message.channel.send({ embeds: [reas] });
        }
        if(commandfile.help.permission == "MANAGE_MESSAGES") {
           const reas = new Discord.EmbedBuilder()
            .setTitle(`${bot.emoji.deny}・Erreur`)
            .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les messages\` !`)
            .setColor(bot.color)
            .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return message.channel.send({ embeds: [reas] })
        }

        if(commandfile.help.permission == "BAN_MEMBERS") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Bannir les membres\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
    return message.channel.send({ embeds: [reas] });
  }
        }

        if(commandfile.help.permission == "MANAGE_ROLES") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les rôles\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {
    return message.channel.send({ embeds: [reas] });
  }
        }

        if(commandfile.help.permission == "KICK_MEMBERS") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Expulser les membres\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
    return message.channel.send({ embeds: [reas] });
  }
        }

        if(commandfile.help.permission == "MUTE_MEMBERS") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Rendre muet les membres\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers)) {
    return message.channel.send({ embeds: [reas] });
  }
        }

        if(commandfile.help.permission == "MANAGE_EMOJIS") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les emojis\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageEmojisAndStickers)) {
    return message.channel.send({ embeds: [reas] });
  }
        }
        if(commandfile.help.permission == "MANAGE_WEBHOOKS") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les webhooks\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {
    return message.channel.send({ embeds: [reas] });
  }
        }
         if(commandfile.help.permission == "ADMINISTRATOR") {
           const reas = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Administrateur\` !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
    return message.channel.send({ embeds: [reas] });
  }
        }
        if (commandfile) {
          commandfile.run(bot, message, args);
        }
      } else {

        if (commandfile) {
          commandfile.run(bot, message, args);
        }
      }
        })
    })
  },
};
