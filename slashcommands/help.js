const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ComponentType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Embed } = require("discord.js");


module.exports = {
  name: "help",
  description: "Permet de voir la liste des commandes",
  permission: "Aucune",
  dm: true,
  async run(bot, interaction, slashCommand) {
     const embeddepart = new EmbedBuilder() 
      .setTitle(`Liste des commandes ${bot.emoji.HappyEevee}`)
      .setDescription(`Bonjour **${interaction.user.username}** !\nBienvenue sur le menu d'aide du bot !\nLe préfix du bot est \`${bot.prefix}\` !\nVous trouvez un bug ? Faîtes la commande \`${bot.prefix}bugreport\`\n\n Je possède actuellement **51 commandes** !\nIl ya des commandes en préfix \`${bot.prefix}help\`!`)
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
            .setLabel(`SlashCommands`)
            .setEmoji(bot.emoji.slashcommands)
            .setValue("slashmenuhelp"),
        ) 

          row = new ActionRowBuilder()
          .addComponents(menuoptions) 

        let msgEmbed = await interaction.reply({ embeds: [embeddepart], components: [row] })
        let msg = msgEmbed
    
    const collector = await msg.createMessageComponentCollector({ 
        componentType: ComponentType.StringSelect,
     });
    collector.on('collect', async (i) => {
        if(i.user.id !== interaction.user.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        }) 
        i.deferUpdate(); 
    
        if(i.values[0] == "slashmenuhelp") {
            if(i.user.id !== interaction.user.id) return i.reply({
            content: 'Vous ne pouvez pas utiliser ce menu !',
            ephemeral: true
        })
            const embedsecond = new EmbedBuilder()
            .setTitle(`${bot.emoji.slashcommands}・SlashCommands (25)`)
            .setDescription(`</8ball:1124650661611577354> - </addrole:1124650661611577355>  - </afk:1124650661611577356> - etc... fais / sur la barre de texte et tu vas voir la liste des commande psk là j'ai trop la flemme de mettre 50 commandes à la main `)
            .setColor(bot.color)
            .setFooter(bot.footer)

            msgEmbed.edit({ embeds: [embedsecond], components: [row]})
        }

    })

  }

}