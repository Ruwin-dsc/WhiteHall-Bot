const { EmbedBuilder } = require("discord.js");
const ms = require("ms")

exports.help = {
    name: 'rules',
    category: 'outils',
    description: "Permet d'envoyer un règlement",
    utilisation: "rules",
    permission: "OWNER"
}
    exports.run = async (bot, message) => {
        


        let time1 = "5s";
        setTimeout(function () {


            let embed1 = new EmbedBuilder()
            .setTitle(`Règlement de: \n\`${message.guild.name}\``)
            .setColor(bot.color)

                  
            message.channel.send( {embeds: [embed1]}, ms(time1))
        })


        let time2 = "6s";
        setTimeout(function () {

            let embed2 = new EmbedBuilder()
            .setTitle('I - Pour respecter les ToS /Guidelines de Discord.')
            .setDescription((`Garder un climat Sain / Respectueux & accueillant pour notre communauté, ainsi que fournir une expérience incroyable à nos utilisateur, l'équipe **${message.guild.name}** met en place un règlement applicable aux membres et au staff.`))
            .setColor(bot.color)
            message.channel.send({embeds: [embed2]})
        }, ms(time2))


        let time3 = "7s";
        setTimeout(function () {

            let embed3 = new EmbedBuilder()
            .setTitle('II - Respect des documents officiels.')
            .setDescription(`Chaque utilisateur présent sur notre serveur dois prendre en compte ce règlement et les documents officiels de Discord, les ToS et les Guidelines.`)
            .setColor(bot.color)
            message.channel.send({embeds: [embed3]})
        }, ms(time3))
        
  


        let time4 = "8s";
        setTimeout(function () {

            let embed4 = new EmbedBuilder()
            .setTitle('III - Le respect est de mise')
            .setDescription(`Afin de fournir une bonne expérience à nos utilisateurs\n\nL'équipe ${message.guild.name} t'exige le respect, peut importe sa forme (verbal, écrit). Toutes les formes de racisme, d'homophobie, de sexisme et de misogynie sont interdites et seront sanctionnées sévèrement par l'équipe de modération.`)
            .setColor(bot.color)
            message.channel.send({embeds: [embed4]})
 
        }, ms(time4))


        let time5 = "9s";
        setTimeout(function () {

            let embed5 = new EmbedBuilder()
            .setTitle('IV - Utilisation des failles sur le serveur')
            .setDescription("Si vous trouvez une faille sur le serveur, par exemple un salon non accessible au public ou bien une permission qui n'est pas sensée être donnée à un certain rôle, veuillez rapporter l'erreur dans un ticket avec le salon #support, N'abusez pas de l'erreur sans quoi vous serez sanctionné. ")
            .setColor(bot.color)
            message.channel.send({embeds: [embed5]})
        }, ms(time5))


        let time6 = "10s";
        setTimeout(function () {

            let embed6 = new EmbedBuilder()
            .setTitle('V - Respect des salons')
            .setDescription("Chaque salon possède un thème\n\nExemple le salon #suggestion sert à proposer des idées constructives afin d'aider Shinetsus à se développer, chaque message dans ce salon dois être en rapport avec le thème. Si vous ne respectez pas le thème du salon où vous vous trouvez, le staff se permettra de prendre action.")
            .setColor(bot.color)
            message.channel.send({embeds: [embed6]})
        }, ms(time6))


        let time7 = "11s";

        setTimeout(function () {
            let embed7 = new EmbedBuilder()
            .setTitle('V - Utilisez votre bon-sens')
            .setDescription("Si vous savez qu'une action n'est pas dans le règlement mais qu'elle est stupide, utilisez votre bon-sens. Le staff peut se permettre d'intervenir si vous faites une action stupide et irréfléchie.")
            .setColor(bot.color)
            message.channel.send({embeds: [embed7]})
        }, ms(time7))





        let time9 = "12s";

        setTimeout(function () {
            let embed9 = new EmbedBuilder()
            .setDescription(`- == - == - == - == - == - == - == - == - == - == - == - == -
            Veuillez prendre le temps de lire attentivement cette politique.
            
             Merci à tous de prendre en compte les T.O.S de Discord, pour cela, cliquez ci-dessous https://discordapp.com/terms
            - == - == - == - == - == - == - == - == - == - == - == - == -`)
            .setColor(bot.color)
            message.channel.send({embeds: [embed9]})
        }, ms(time9))



        let time10 = "13s";

        setTimeout(function () {

            let embed10 = new EmbedBuilder()
            .setDescription(`Veuillez réagir ${bot.emoji.success} ci dessous pour affirmer que vous avez pris connaissance du règlement de ${message.guild.name}.`)
            .setColor(bot.color)
            .setFooter(bot.footer)
            message.channel.send({embeds: [embed10]}).then(m => m.react(bot.emoji.success))
        }, ms(time10))
    }