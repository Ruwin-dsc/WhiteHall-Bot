const { EmbedBuilder, ActionRowBuilder, ComponentType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Embed } = require("discord.js");

exports.help = {
  name: "help",
  category: "général",
  description: "Permet d'avoir les commandes d'aides.",
  utilisation: "help",
  permission: "EVERYONE",
  aliases: ["h", "listcommand", "info", "aide"],
};
exports.run = async (bot, message, args) => {

    const cmd = bot.commands
    let row
    const prefix = bot.prefix
    

    if(!args[0]) {
      const embeddepart = new EmbedBuilder() 
      .setTitle(`Liste des commandes ${bot.emoji.HappyEevee}`)
      .setDescription(`Bonjour **${message.author.username}** !\nBienvenue sur le menu d'aide du bot !\nLe préfix du bot est \`${bot.prefix}\` !\nVous trouvez un bug ? Faîtes la commande \`${bot.prefix}bugreport\`\n\n Je possède actuellement **${cmd.size} commandes** !\nIl ya des commandes en slashcommand </help:1124742120759107726>!`)
      .setColor(bot.color)
      .setImage('https://media.discordapp.net/attachments/1192200111044964354/1199350046672572507/8ae0fede903a994a71c4ce86ac526b6a.png?ex=65c238c5&is=65afc3c5&hm=bae65e4021b9f89005b75df6eb0ff47b04af45840c5c1d1e82878273d18316bf&=&format=webp&quality=lossless&width=1191&height=670')
      .setTimestamp()
      .setThumbnail('https://media.discordapp.net/attachments/1192200111044964354/1199350046169247744/wp2297089.png?ex=65c238c5&is=65afc3c5&hm=ff297a532e5209e4f04cdd687d17b9ab8d3116d3e0cb9345c7247e4dd2e9b850&=&format=webp&quality=lossless&width=443&height=670')
      .setFooter(bot.footer); 

      let menuoptions = new StringSelectMenuBuilder()
        .setCustomId('MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Choisis une option !")
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(`Général`)
            .setEmoji(bot.emoji.slashcommands)
            .setValue("generalmenuhelp"),
            
            new StringSelectMenuOptionBuilder()
            .setLabel(`Modération`)
            .setEmoji(bot.emoji.policecar)
            .setValue("modmenuhelp"),
            
            new StringSelectMenuOptionBuilder()
            .setLabel(`Information`)
            .setEmoji(bot.emoji.information)
            .setValue("infosmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Outils`)
            .setEmoji('🛠️')
            .setValue("outilsmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Fun`)
            .setEmoji(bot.emoji.pokessparkel)
            .setValue("funmenuhelp"),
            
            new StringSelectMenuOptionBuilder()
            .setLabel(`Musique`)
            .setEmoji(bot.emoji.cd)
            .setValue("musicmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Giveaway`)
            .setEmoji(bot.emoji.tada)
            .setValue("gwlmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Image`)
            .setEmoji(bot.emoji.camera)
            .setValue("imagemenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Configuration`)
            .setEmoji('⚙️')
            .setValue("configmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Antiraid`)
            .setEmoji(bot.emoji.shield)
            .setValue("antiraidmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Backup`)
            .setEmoji(bot.emoji.folder)
            .setValue("backupmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Logs`)
            .setEmoji(bot.emoji.snake)
            .setValue("logsmenuhelp"),

            new StringSelectMenuOptionBuilder()
            .setLabel(`Autres`)
            .setEmoji(bot.emoji.celebiquestion)
            .setValue("othermenuhelp"),

            

        ) 

          row = new ActionRowBuilder()
          .addComponents(menuoptions) 

        let msgEmbed = await message.reply({ embeds: [embeddepart], components: [row] })
        let msg = msgEmbed
    
    const collector = await msg.createMessageComponentCollector({ 
        componentType: ComponentType.StringSelect,
     });
    collector.on('collect', async (i) => {
        if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        }) 
        i.deferUpdate(); 
    
        if(i.values[0] == "generalmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.slashcommands}・Général (12)`)
            .setDescription(`\`${prefix}afk\` - \`${prefix}botinfo\` - \`${prefix}botinvite\` - \`${prefix}bugreport\` - \`${prefix}confess\` - \`${prefix}help\` - \`${prefix}ping\` - \`${prefix}prevname\` - \`${prefix}suggest\` - \`${prefix}support\` - \`${prefix}uptime\` - \`${prefix}vocmanager\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "modmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.policecar}・Modération (12)`)
            .setDescription(`\`${prefix}ban\` - \`${prefix}derank\` - \`${prefix}derankall\` - \`${prefix}kick\` - \`${prefix}mute\` - \`${prefix}mutelist\` - \`${prefix}unban\` - \`${prefix}unbanall\` - \`${prefix}unmute\` - \`${prefix}unwarn\` - \`${prefix}warn\` - \`${prefix}warnlist\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "infosmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.information}・Information (19)`)
            .setDescription(`\`${prefix}adminlist\` - \`${prefix}avatar\` - \`${prefix}badgelist\` - \`${prefix}banlist\` - \`${prefix}banner\` - \`${prefix}boosterlist\` - \`${prefix}botlist\` - \`${prefix}channelinfo\` - \`${prefix}emojiinfo\` - \`${prefix}emojilist\` - \`${prefix}firstmsg\` - \`${prefix}invitescrapper\` - \`${prefix}roleinfo\` - \`${prefix}rolelist\` - \`${prefix}rolemember\` - \`${prefix}serverinfo\` - \`${prefix}userinfo\` - \`${prefix}vc\` - \`${prefix}Shinetsus\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "outilsmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`🛠️・Outils (15)`)
            .setDescription(`\`${prefix}addrole\` - \`${prefix}clear\` - \`${prefix}clearwebhook\` - \`${prefix}embed\` - \`${prefix}hide\` - \`${prefix}lock\` - \`${prefix}massiverole\` - \`${prefix}renew\` - \`${prefix}prune\` - \`${prefix}removerole\` - \`${prefix}rules\` - \`${prefix}say\` - \`${prefix}snipe\` - \`${prefix}unhide\` - \`${prefix}unlock\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "funmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.pokessparkel}・Fun (22)`)
            .setDescription(`\`${prefix}8ball\` - \`${prefix}akinator\` - \`${prefix}anagrame\` - \`${prefix}anime\` - \`${prefix}ascii\` - \`${prefix}blague\` - \`${prefix}calculate\` - \`${prefix}des\` - \`${prefix}emojify\` - \`${prefix}gay\` - \`${prefix}gennumber\` - \`${prefix}gunfight\` - \`${prefix}meteo\` - \`${prefix}pf\` - \`${prefix}politique\` - \`${prefix}rappel\` - \`${prefix}slap\` - \`${prefix}traduction\` - \`${prefix}wiki\` - \`${prefix}wof\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "musicmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.cd}・Musique (1)`)
            .setDescription(`\`${prefix}radio\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "gwlmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.tada}・Giveaway (4)`)
            .setDescription(`\`${prefix}gcreate\` - \`${prefix}gedit\` - \`${prefix}gend\` - \`${prefix}greroll\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "imagemenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.camera}・Image (18)`)
            .setDescription(`\`${prefix}bird\` - \`${prefix}car\` - \`${prefix}cat\` - \`${prefix}dog\` - \`${prefix}fox\` - \`${prefix}gif\` - \`${prefix}image\` - \`${prefix}kangouroo\` - \`${prefix}kiss\` - \`${prefix}koala\` - \`${prefix}lc\` - \`${prefix}panda\` - \`${prefix}pikachu\` - \`${prefix}racoon\` - \`${prefix}redpanda\` - \`${prefix}screenshot\` - \`${prefix}shibe\` - \`${prefix}snapcode\` - \`${prefix}whale\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "configmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`⚙️・Configuration (20)`)
            .setDescription(`\`${prefix}autopublish\` - \`${prefix}autoreact\` - \`${prefix}autorole\` - \`${prefix}constantmsg\` - \`${prefix}countchannel\` - \`${prefix}counter\` - \`${prefix}greet\` - \`${prefix}joinsettings\` - \`${prefix}leavesettings\` - \`${prefix}piconly\` - \`${prefix}setcolor\` - \`${prefix}setconfess\` - \`${prefix}setlevel\` - \`${prefix}setprefix\` - \`${prefix}setsuggest\` - \`${prefix}setticket\` - \`${prefix}showpic\` - \`${prefix}soutien\` - \`${prefix}starboard\`  - \`${prefix}tempvoc\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "antiraidmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.shield}・Antiraid (15)`)
            .setDescription(`\`${prefix}antialt\` - \`${prefix}antibot\` - \`${prefix}antichannel\` - \`${prefix}antijoin\` - \`${prefix}antilink\` - \`${prefix}antirole\` - \`${prefix}antispam\` - \`${prefix}bl\` - \`${prefix}owner\` - \`${prefix}removeperms\` - \`${prefix}secur\` - \`${prefix}unbl\` - \`${prefix}unowner\` - \`${prefix}unwl\` - \`${prefix}wl\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "backupmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.folder}・Backup (5)`)
            .setDescription(`\`${prefix}backup-create\` - \`${prefix}backup-delete\` - \`${prefix}backup-info\` - \`${prefix}backup-list\` - \`${prefix}backup-load\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "logsmenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.snake}・Logs (14)`)
            .setDescription(`\`${prefix}antiraidlogs\` - \`${prefix}banlogs\` - \`${prefix}boostlogs\` - \`${prefix}botlogs\` - \`${prefix}channellogs\` - \`${prefix}emojilogs\` - \`${prefix}invitelogs\` - \`${prefix}joinleavelogs\` - \`${prefix}logs\` - \`${prefix}messagelogs\` - \`${prefix}modslogs\` - \`${prefix}presetlogs\` - \`${prefix}rolelogs\` - \`${prefix}voicelogs\``)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

        if(i.values[0] == "othermenuhelp") {
            if(i.user.id !== message.author.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.celebiquestion}・Autres (x)`)
            .setDescription(`Créateur: <@!1188788946973507607>\nHébergeur: [Shinetsu](https://discord.gg/7xFnasnrtf)\nSupport: [Shinetsu](https://discord.gg/7xFnasnrtf)`)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

    })
    }

     let cmdname = args[0]
        if(bot.commands.get(cmdname)){
         const cmdad = bot.commands.get(cmdname)
         let perm = cmdad.help.permission 
         if(perm == undefined) perm = 'everyone'
         

        let embed_args = new EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes- \`${prefix}${cmdname}\` !`)
            .setDescription(`**Nom de la commande:** \`${prefix}${cmdname}\` \n **Description de la commande:** \`${cmdad.help.description}\` \n **Catégorie:** \`${cmdad.help.category}\`\n **Utilisation:** \`${prefix}${cmdad.help.utilisation}\`\n**Permission:** \`${perm}\``)
            .setTimestamp()
            .setFooter(bot.footer);

           message.channel.send({embeds: [embed_args]});
            return;
    }
     
}