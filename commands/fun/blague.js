const Discord = require("discord.js")
const { EmbedBuilder } = require('discord.js')

exports.help = {
    name: "blague",
    description: "Faire une blague",
    permission: "everyone",
    category: 'funny',
    utilisation: 'blague',
}
    exports.run = async (bot, message, args) => {

    const blagues = [
            {
              Question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant?",
              Blague: "Parce que sinon ils tombent dans le bateau!"
            },
            {
              Question: "Pourquoi les plongeurs plongent-ils toujours avec une bouteille ?",
              Blague: "Parce que sinon ils n’ont pas pied !"
            },
            {
              Question: "Comment appelle-t-on un steak qui joue de la guitare ?",
              Blague: "Un steak haché !"
            },
            {
              Question: "Pourquoi les requins n'attaquent-ils pas les avocats ?",
              Blague: "Parce qu'ils n'aiment pas la chair froide et sans goût !"
            },
            
            {
Question: "Pourquoi le poulet a-t-il traversé la rue?",
Blague: "Pour se rendre de l'autre côté!"
},

{
Question: "Comment appelle-t-on un alligator qui enquête?",
Blague: "Un investi-gator."
},

{
Question: "Qu’est-ce que le livre de mathématiques dit au conseiller d’orientation?",
Blague: "J’ai tellement de problèmes."
},

{
Question: "Pourquoi tant de poissons vivent-ils dans l’eau salée?",
Blague: "Parce que l’eau poivrée les ferait éternuer!"
},

{
Question: "Si une horloge sonne 13 fois, quelle heure est-il?",
Blague: "Il est l’heure d’acheter une nouvelle horloge!"
},

{
Question: "Pourquoi un ordinateur voudrait-il se gratter?",
Blague: "Parce qu’il a des puces!"
},

{
Question: "Quel bonbon est toujours blasé?",
Blague: "Le choco-las"
},

{
Question: "Quel est le type de blague préféré d’une tomate?",
Blague: "Celles bien juteuses!"
},

{
Question: "Quelles lettres ne se trouvent pas dans l’alphabet?",
Blague: "Celles qui ne sont pas dans le courrier."
},

{
Question: "Qu’a dit Vénus en flirtant avec Saturne?",
Blague: "«Passe-moi l’anneau au doigt!»"
},

{
Question: "Que peut-on trouver dans la mer et dans le ciel?",
Blague: "Une étoile."
},

{
Question: "Que fait la lune quand elle ne veut plus parler à quelqu’un?",
Blague: "Elle l’éclipse de sa vie."
},

{
Question: "Quel fruit doit toujours se sacrifier lors d’un compromis?",
Blague: "La poire… en deux."
},

{
Question: "Pourquoi le melon a-t-il sauté dans le lac?",
Blague: "Pour devenir un melon d’eau."
},

{
Question: "Pourquoi un professeur porte-t-il ses lunettes de soleil en classe?",
Blague: "Parce que ses élèves sont trop brillants!"
},

{
Question: "Quel est l’endroit préféré d’un géologue pour un rendez-vous amoureux?",
Blague: "Un concert de roc."
},

{
Question: "Quel type de musique les ballons détestent-ils écouter?",
Blague: "Pop!"
},

{
Question: "Pourquoi Dark Vador a-t-il éteint toutes les lumières de la pièce?",
Blague: "Parce qu’il est du côté obscur."
},

{
Question: "Pourquoi les vaches portent-elles des cloches?",
Blague: "Parce que leurs cornes ne fonctionnent pas."
},

{
Question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant?",
Blague: "Parce que sinon ils tombent dans le bateau."
}, 
{
    Question: "Comment appelle-t-on un chat qui aime les arbres ?",
    Blague: "Un chat-pitre !"
    },
    
    {
    Question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
    Blague: "Parce que sinon ils tombent dans le bateau."
    },
    
    {
    Question: "Comment appelle-t-on une abeille qui ne produit pas de miel ?",
    Blague: "Une abeille qui travaille pour la poste."
    },
    
    {
    Question: "Pourquoi les oiseaux volent-ils vers le sud en hiver ?",
    Blague: "Parce que c’est trop loin pour y aller à pied."
    },
    
    {
    Question: "Comment appelle-t-on un chat qui a mangé un sandwich au fromage ?",
    Blague: "Un chat-qui-a-dit-cheddar."
    },
    
    {
    Question: "Pourquoi les pingouins portent-ils des costumes ?",
    Blague: "Parce qu’ils ont un goût très chic."
    },
    
    {
    Question: "Pourquoi est-ce que les sorcières ne portent pas de sous-vêtements ?",
    Blague: "Pour laisser de la place pour leur balai !"
    },
    
    {
    Question: "Comment appelle-t-on un chameau sans bosse ?",
    Blague: "Un cheval."
    },
    
    {
    Question: "Comment appelle-t-on un chien qui pratique la magie ?",
    Blague: "Un labracadabrador."
    },
    
    {
    Question: "Pourquoi les pianistes sont-ils toujours calmes ?",
    Blague: "Parce qu’ils jouent avec les touches."
    },
    {
        Question: "Qu'est-ce qu'un chat dit quand il joue aux cartes?",
        Blague: "Je mise sur miaou!"
        },
        
        {
        Question: "Pourquoi le football est-il le sport le plus bruyant?",
        Blague: "Parce que chaque fois qu'il y a un but, il y a un filet!"
        },
        
        {
        Question: "Pourquoi les étudiants ont-ils de mauvaises notes en classe de géographie?",
        Blague: "Parce qu'ils ne trouvent pas leur place sur la carte!"
        },
        
        {
        Question: "Comment appelle-t-on une personne qui parle trois langues?",
        Blague: "Trilingue. Et une personne qui parle deux langues est bilingue. Et une personne qui parle une seule langue est... française!"
        },
        
        {
        Question: "Comment appelle-t-on un éléphant qui ne peut pas se déplacer?",
        Blague: "Immobiliphant."
        },
        {
            Question: "Pourquoi est-ce que les grenouilles aiment les temps chauds?",
            Blague: "Parce que ça les aide à sauter plus haut!"
            },
            
            {
            Question: "Qu'est-ce que les oiseaux disent quand ils ont faim?",
            Blague: "J'ai les croque-mitaines!"
            },
            
            {
            Question: "Pourquoi les pirates ne savent-ils pas faire de puzzles?",
            Blague: "Parce qu'ils ont toujours une pièce manquante: l'œil de verre!"
            },
            
            {
            Question: "Pourquoi les pianistes font-ils des faux-plis sur leurs pantalons?",
            Blague: "Pour qu'ils puissent jouer à la jambe croisée."
            },
            
            {
            Question: "Pourquoi les toilettes publiques ont-elles toujours des portes qui ne se ferment pas?",
            Blague: "Pour que vous puissiez voir qui d'autre est là-bas!"
            },
            
            {
            Question: "Qu'est-ce qu'un chat préfère faire par temps chaud?",
            Blague: "Des siestes dans la litière!"
            },
            
            {
            Question: "Pourquoi les pingouins portent-ils des smoking?",
            Blague: "Parce que c'est la tenue de rigueur pour les occasions importantes!"
            },
            
            {
            Question: "Pourquoi les chauves-souris ont-elles des problèmes de maintien?",
            Blague: "Parce qu'elles ont des ailes qui sont trop lourdes pour leur corps!"
            },
            
            {
            Question: "Pourquoi les carottes sont-elles bonnes pour la vue?",
            Blague: "Parce qu'elles ont des vitamines pour les yeux. Et aussi parce que personne ne veut manger des carottes moches!"
            },
            
            {
            Question: "Pourquoi est-ce que les bibliothèques sont si calmes?",
            Blague: "Parce que tout le monde chuchote pour ne pas réveiller les livres!"
            },
            
            {
            Question: "Pourquoi les musiciens portent-ils des lunettes?",
            Blague: "Pour mieux lire la partition!"
            },
            
            {
            Question: "Pourquoi les pirates portent-ils des boucles d'oreilles?",
            Blague: "Pour que s'ils tombent à l'eau, ils aient quelque chose à récupérer!"
            },
            
            {
            Question: "Comment appelle-t-on un lapin qui a gagné une course?",
            Blague: "Un as de carottes!"
            },
            
            {
            Question: "Pourquoi les ordinateurs ont-ils de la fièvre?",
            Blague: "Parce qu'ils ont attrapé un virus!"
            },
            
            {
            Question: "Qu'est-ce qu'un fantôme dit à un autre fantôme?",
            Blague: "Tu es dans une forme spectrale aujourd'hui!"
            },
            
            {
            Question: "Pourquoi les crocodiles n'aiment-ils pas jouer aux cartes?",
            Blague: "Parce qu'ils n'aiment pas être trahis!"
            },
            
            {
            Question: "Pourquoi les grenouilles aiment-elles jouer aux jeux de hasard?",
            Blague: "Parce qu'elles sont très chanceuses avec les sauts!"
            },
            
            {
            Question: "Qu'est-ce qu'un chat qui vit dans le désert?",
            Blague: "Un chat sauvage!"
            }
          ];
          
    const randomIndex = Math.floor(Math.random() * blagues.length);
    const blague = blagues[randomIndex];
    const Question = blague.Question;
    const blagueTexte = blague.Blague;

    const EmbedB = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`${bot.emoji.zanyface} __Voici une blague__ ${bot.emoji.zanyface}`)
    .setDescription(`**Question :**\n\`${Question}\`\n**Blague :**\n\`${blagueTexte}\``)
    .setTimestamp()
    .setFooter(bot.footer)


    message.reply({embeds: [EmbedB]});
    }
