const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

exports.help = {
  name: 'snipe',
  permission: "EVERYONE",
  utilisation: 'snipe [msg/edit/img] (nombre)',
  description: 'Permet d\'afficher les derniers messages supprimés du salon',
  category: 'infos'
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}snipe [msg/edit/img] (nombre)\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) {
    return message.channel.send({ embeds: [nondef] });
  }

  const nomsg = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, il n'y a aucun message supprimé récemment. (Il se peut que le bot ait restart entre temps)`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const noedit = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, il n'y a aucun message édité récemment. (Il se peut que le bot ait restart entre temps)`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const noimg = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, il n'y a aucune image supprimée récemment. (Il se peut que le bot ait restart entre temps)`)
    .setColor(bot.color)
    .setFooter(bot.footer);
    if (args[0] === 'msg' && args[1] === 'all') {
        const snipes = bot.snipes.get(message.channel.id);
        if (!snipes) {
          return message.reply({ embeds: [nomsg] });
        }
      
        const embeds = snipes.map((snipe, index) => {
          const { msg, time } = snipe;
          return new EmbedBuilder()
            .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL({}) })
            .setTitle(`Dans <#${msg.channel.id}>`)
            .setColor(bot.color)
            .setDescription(msg.content)
            .setFooter({text: `${moment(time).fromNow()} | ${index + 1}/${snipes.length}`});
        });
      
        message.reply({ embeds });
      }

  if (args[0] === 'msg') {
    const snipes = bot.snipes.get(message.channel.id);
    if (!snipes) {
      return message.reply({ embeds: [nomsg] });
    }
  
    const numSnipes = parseInt(args[1]) || 1;
    const target = snipes[numSnipes - 1];
  
    if (!target) {
      return message.reply({ content: `Seulement ${snipes.length} message(s) à snipe`, allowedMentions: { repliedUser: false } });
    }
  
    const { msg, time } = target;
  
    const embed = new EmbedBuilder()
      .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL({}) })
      .setTitle(`Dans <#${msg.channel.id}>`)
      .setColor(bot.color)
      .setDescription(msg.content)
      .setFooter({ text: `${moment(time).fromNow()} | ${numSnipes}/${snipes.length}` });
  
    message.reply({ embeds: [embed] });
  }
  
  if (args[0] === 'edit') {
    const snipes = bot.snipesedit.get(message.channel.id);
    if (!snipes) {
      return message.reply({ embeds: [noedit] });
    }
  
    const numSnipes = parseInt(args[1]) || 1;
    const target = snipes[numSnipes - 1];
  
    if (!target) {
      return message.reply({ content: `Seulement ${snipes.length} message(s) à snipe`, allowedMentions: { repliedUser: false } });
    }
  
    const { msg, msg2, time } = target;
    const embed = new EmbedBuilder()
      .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL({}) })
      .setTitle(`Dans <#${msg.channel.id}>`)
      .setColor(bot.color)
      .setDescription(`> Message **Original:** ${msg}\n> Message **Edité:** ${msg2}`)
      .setFooter({ text: `${moment(time).fromNow()} | ${numSnipes}/${snipes.length}` });
  
    message.reply({ embeds: [embed] });
  }
  
  if (args[0] === 'img') {
    const snipes = bot.snipesimg.get(message.channel.id);
    if (!snipes) {
      return message.reply({ embeds: [noimg] });
    }
  
    const numSnipes = parseInt(args[1]) || 1;
    const target = snipes[numSnipes - 1];
  
    if (!target) {
      return message.reply({ content: `Seulement ${snipes.length} image(s) à snipe`, allowedMentions: { repliedUser: false } });
    }
  
    const { msg, image, time } = target;
    const embed = new EmbedBuilder()
      .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL({}) })
      .setTitle(`Dans <#${msg.channel.id}>`)
      .setColor(bot.color)
      .setImage(image)
      .setFooter({ text: `${moment(time).fromNow()} | ${numSnipes}/${snipes.length}` });
  
    message.reply({ embeds: [embed] });
  }
};
