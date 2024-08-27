const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: 'restart',
    category: 'developer',
    description: 'Permet de redémarrer le bot',
    utilisation: 'restart oui',
    permission: 'owner',
};

exports.run = async (bot, message, args, prefix) => {
    // Vérifie si l'utilisateur a la permission d'effectuer cette commande
    if (!bot.config.owner.includes(message.author.id)) {
        return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    // Vérifie si l'utilisateur a confirmé le redémarrage
    if (args[0] === 'oui') {
        message.channel.send('Redémarrage du bot en cours...');

        try {
            // Détruit l'instance du bot
            await bot.destroy();
            
            // Attend quelques secondes avant de quitter le processus
            setTimeout(() => {
                process.exit(0);
            }, 3000);
        } catch (error) {
            console.error('Erreur lors du redémarrage du bot :', error);
            message.channel.send('Une erreur s\'est produite lors du redémarrage du bot.');
        }
    } else {
        // Si l'utilisateur n'a pas confirmé, demande confirmation
        return message.reply('Veuillez confirmer en faisant `restart oui`.');
    }
};
