const { 
    joinVoiceChannel, createAudioResource, createAudioPlayer, getVoiceConnection
} = require('@discordjs/voice');
const { 
    EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder
} = require('discord.js');
const Discord = require('discord.js')



exports.help = {
    name: "radio",
    description: "Radio complète",
    utilisation: "radio",
    permission: "EVERYONE",
    category: "musique"
}


exports.run = async (bot, message, args) => {
        
    const DEFAULT_COLOR = bot.color
     
        let isVoc = message.guild.channels.cache.find((channel) => channel.type == Discord.ChannelType.GuildVoice && !channel.members.has(message.author.id) && channel.members.has(bot.user.id))
        const member = message.guild.members.cache.get(message.author.id).voice
        try {
            if(!member.channel) return message.reply(`Vous devez être dans un salon vocal pour écouter de la radio.`)
        } catch (error) {
            console.log("Une erreur est survenue" + error)
        }
        try {
            if (isVoc) return message.reply(`Quelqu'un d'autre utilise déjà le bot dans le serveur.`)
        } catch (error) {
            console.log("Une erreur est survenue" + error)
        }
    
    
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("📻 Choisissez Votre Radio")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("NRJ")
                    .setDescription("Permet d'écouter la Radio NRJ.")
                    .setValue("un"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("NOSTALGIE")
                    .setDescription("Permet d'écouter la radio NOSTALGIE.")
                    .setValue("deux"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("CHERIE")
                    .setDescription("Permet d'écouter la radio CHERIE.")
                    .setValue("trois"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Rire & Chansons")
                    .setDescription("Permet d'écouter la radio Rire & Chansons.")
                    .setValue("quatre"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("RTL")
                    .setDescription("Permet d'écouter la radio RTL.")
                    .setValue("cinq"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("RTL 2")
                    .setDescription("Permet d'écouter la radio RTL 2.")
                    .setValue("six"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Fun Radio France")
                    .setDescription("Permet d'écouter la radio Fun Radio France.")
                    .setValue("sept"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Europe 1")
                    .setDescription("Permet d'écouter la radio Europe 1.")
                    .setValue("huit"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Europe 2")
                    .setDescription("Permet d'écouter la radio Europe 2")
                    .setValue("neuf"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("RFM")
                    .setDescription("Permet d'écouter la radio RFM")
                    .setValue("dix"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("RMC")
                    .setDescription("Permet d'écouter la radio RMC")
                    .setValue("onze"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("BFM Business")
                    .setDescription("Permet d'écouter la radio BFM Business")
                    .setValue("douze"),

                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Skyrock")
                    .setDescription("Permet d'écouter la radio Skyrock")
                    .setValue("treize"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Radio Classique")
                    .setDescription("Permet d'écouter la radio Radio Classique")
                    .setValue("quatorze"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("France Info")
                    .setDescription("Permet d'écouter la radio France Info")
                    .setValue("quinze"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("France Inter")
                    .setDescription("Permet d'écouter la radio France Inter")
                    .setValue("seize"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("France Culture")
                    .setDescription("Permet d'écouter la radio France Culture")
                    .setValue("dixsept"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("France Musique")
                    .setDescription("Permet d'écouter la radio France Musique")
                    .setValue("dixhuit"),
               
                new StringSelectMenuOptionBuilder()
                    .setLabel("France Bleu")
                    .setDescription("Permet d'écouter la radio France Bleu")
                    .setValue("dixneuf"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Fip - Nationale")
                    .setDescription("Permet d'écouter la radio Fip - Nationale")
                    .setValue("vingt"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Mouv'")
                    .setDescription("Permet d'écouter la radio Mouv'")
                    .setValue("vingtun"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Ouï FM")
                    .setDescription("Permet d'écouter la radio Ouï FM")
                    .setValue("vingtdeux"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Jazz Radio")
                    .setDescription("Permet d'écouter la radio Jazz Radio")
                    .setValue("vingttrois"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("M Radio")
                    .setDescription("Permet d'écouter la radio M Radio")
                    .setValue("vingtquatre"),
                
                new StringSelectMenuOptionBuilder()
                    .setLabel("Arrêter la radio")
                    .setDescription("Permet d'arrêter la radio")
                    .setValue("off")
        ))
 
        const embed = new EmbedBuilder()
        .setColor(DEFAULT_COLOR)
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setDescription(`Utilisez le menu ci-dessous pour choisir votre radio.\nVous avez un choix de **24** radios.`)
        .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
        .setFooter(bot.footer)

  
            message.reply({ embeds: [embed], components: [row] })
        
        const collector = message.channel.createMessageComponentCollector({
            componentType: Discord.ComponentType.StringSelect
        })

        collector.on("collect", async (c) => { 
            
           
                if(c.user.id !== message.author.id) return c.reply({ content: `Vous ne pouvez pas modifier la radio de quelqu'un d'autre.`, ephemeral: true }).catch(e => {console.log(e)})

            if(c.values[0] == 'off') {
                try {
                    
                getVoiceConnection(`${message.guild.id}`).disconnect();
                message.reply('J\'ai bien arrêté la radio')
                return;
                } catch (error) {
                    message.reply('Je ne suis pas dans une vocale !')
                }
            } 
            let links = { un: "https://scdn.nrjaudio.fm/adwz2/fr/30001/mp3_128.mp3?origine=fluxradios", deux: "https://scdn.nrjaudio.fm/adwz2/fr/30601/mp3_128.mp3?origine=fluxradios", trois: "https://scdn.nrjaudio.fm/adwz2/fr/30201/mp3_128.mp3?origine=fluxradios", quatre: "https://scdn.nrjaudio.fm/adwz2/fr/30401/mp3_128.mp3?origine=fluxradios", cinq: "http://icecast.rtl.fr/rtl-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg", six: "http://icecast.rtl2.fr/rtl2-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg", sept: "http://icecast.funradio.fr/fun-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg", huit: "http://stream.europe1.fr/europe1.mp3", neuf: "http://europe2.lmn.fm/europe2.mp3", dix: "http://stream.rfm.fr/rfm.mp3", onze: "http://audio.bfmtv.com/rmcradio_128.mp3", douze: "http://audio.bfmtv.com/bfmbusiness_128.mp3", treize: "http://icecast.skyrock.net/s/natio_aac_128k", quatorze: "http://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3", quinze: "http://icecast.radiofrance.fr/franceinfo-hifi.aac", seize: "http://icecast.radiofrance.fr/franceinter-hifi.aac", dixsept: "http://icecast.radiofrance.fr/franceculture-hifi.aac", dixhuit: "http://icecast.radiofrance.fr/francemusique-hifi.aac", dixneuf: "http://direct.francebleu.fr/live/fbnord-midfi.mp3", vingt: "http://icecast.radiofrance.fr/fip-hifi.aac", vingtun: "http://icecast.radiofrance.fr/mouv-hifi.aac", vingtdeux: "http://ouifm.ice.infomaniak.ch/ouifm-high.mp3", vingttrois: "http://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3", vingtquatre: "http://mfm.ice.infomaniak.ch/mfm-128.mp3" }
            let thislive = links[c.values[0]]
        
            const VoiceConnection = joinVoiceChannel({
                channelId: member.channelId,
                guildId: member.channel.guild.id,
                adapterCreator: member.channel.guild.voiceAdapterCreator
            });
            const live = createAudioResource(`${thislive}`, {
                inlineVolume: true
            }); 
            try {
                live.volume.setVolume(0.2)
                const player = createAudioPlayer()
                VoiceConnection.subscribe(player)
                player.play(live)
                await c.reply({content: `Lancement de la radio.`, ephemeral: true})
            } catch (error) {
                console.log("Une erreur est survenue" + error);
            }
          
        })                
}
 
