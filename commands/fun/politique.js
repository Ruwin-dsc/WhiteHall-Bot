const Discord = require("discord.js");

exports.help = {
    name: "politique",
    category: "funny",
    description: "Pour qui votez-vous ?",
    utilisation: "politique (utilisateur)",
    permission: "EVERYONE"
};

exports.run = async (bot, message, args, db) => {
    let user;
    if (message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
        user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
        if (!user) return message.reply("Aucune personne trouvée !");
    } else {
        user = message.user ? message.user : message.author;
    }

    let replies = ["Mélenchon", "Macron", "Zemmour", "Le Pen", "Fabien Roussel", "Anne Hidalgo", "Valérie Pécresse", "Poutine", "Biden", "Trump", "Snipe", "Asta", "Koryai", "Sharky", "Ambox"];
    let imageLinks = {
        "Mélenchon": 'https://cdn.discordapp.com/attachments/1065584807234502696/1093154001069035551/cover-r4x3w1000-5958aba3c97c2-000-pz7n1-1.png',
        "Macron": 'https://media.discordapp.net/attachments/1065584807234502696/1093158445634564096/1579458-emmanuel-macron-lors-d-une-table-ronde-au-ministere-des-affaires-etrangeres-le-16-mars-2023.png?width=1540&height=1026',
        "Zemmour": 'https://media.discordapp.net/attachments/1065584807234502696/1093158592481349732/V2BGN2H65BFPBENGTO2PP6PLKE.png?width=1864&height=1164',
        "Le Pen": 'https://images-ext-2.discordapp.net/external/GK9aQxYybuE8eCcvQKPzF0P5JRgkkb51PbTvsiM0HD0/https/img.20mn.fr/2C1bYJIGTXuppJVlaZsLsSk/768x492_national-assembly-parliamentary-group-s-president-for-the-french-far-right-rassemblement-national-rn-party-marine-le-pen-reacts-as-she-addresses-a-press-conference-at-the-national-assembly-in-paris-on-march-22-2023-after-a-televised-interview-of-the-french-president-french-president-on-march-22-2023-defiantly-vowed-to-push-through-a-controversial-pensions-reform-saying-he-was-prepared-to-accept-unpopularity-in-the-face-of-sometimes-violent-protests-photo-by-b-ertrand-guay-afp?width=1536&height=984',
        "Fabien Roussel": 'https://media.discordapp.net/attachments/1065584807234502696/1093166189359927438/fabien-roussel.png?width=1852&height=1420',
        "Anne Hidalgo": 'https://media.discordapp.net/attachments/1065584807234502696/1093166590423466014/anne-hidalgo.png?width=1894&height=1420',
        "Valérie Pécresse": 'https://media.discordapp.net/attachments/1065584807234502696/1093166414426288178/cover-r4x3w1000-61a8d6cc6d57e-5170d5eb96891c918e03f4f2acba284ac524a67f-jpg.png?width=1894&height=1420',
        "Poutine": 'https://media.discordapp.net/attachments/1065584807234502696/1093166749194653788/image.png?width=1770&height=1000',
        "Biden": 'https://media.discordapp.net/attachments/1065584807234502696/1093166859337093140/0603477568789-web-tete.png?width=2524&height=1420',
        "Ruwin": 'https://cdn.discordapp.com/avatars/820361590826205215/a_971d721e985096f9fbc25af1d0bd0a7a.gif?size=4096',
        "Trump": 'https://media.discordapp.net/attachments/1065584807234502696/1093167451828654100/1260516-donald-trump-a-la-maison-blanche-le-6-juin-2017.png?width=1420&height=1420',
        "Asta": 'https://images-ext-2.discordapp.net/external/ow7SAqvs1lqF1AHs_iqZXMy4dTM65yiBASsfvD1HDFU/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/863027810191540235/8fb52326b5833c784250a13d4ba486e2.webp?width=512&height=512',
        "Koryai": 'https://images-ext-2.discordapp.net/external/gLGCSbFnGg0NDvDz3S0xMrhWiTnnt8VVoILfErZXIMM/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/970697240953905162/a_0163b412eb0636613ff4d7e04e045780.gif?width=554&height=554',
        "Sharky": 'https://images-ext-1.discordapp.net/external/t-e5ToW3Na1rso4jtR4z_RJVIw0sbH-AYD7RM3s41E4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1036205691880357960/917dca17af4ab7bb931fe604f6c384d5.webp?width=512&height=512',
        "Ambox": 'https://cdn.discordapp.com/avatars/968863659709329429/a_5b6781147bd41b3e3256a1811cd9dcc4.gif?size=4096'
    };

    let res = Math.floor(Math.random() * replies.length);
    let reply = replies[res];

    let loveEmbed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`${user} vote pour : **${reply} !**`)
        .setFooter(bot.footer);

    if (reply in imageLinks) {
        loveEmbed.setImage(imageLinks[reply]);
        message.reply({ embeds: [loveEmbed] });
    } else {
        message.reply("Aucune image trouvée pour cette option.");
    }
};
