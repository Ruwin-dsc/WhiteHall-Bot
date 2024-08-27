const Discord = require("discord.js");
const { version } = require("discord.js");
const os = require("os");
const cpuStat = require("cpu-stat");

exports.help = {
  name: "botinfo",
  category: "général",
  description: "Affiche les indormation du bot !",
  utilisation: "botinfo",
  permission: "EVERYONE",
};

exports.run = async (bot, message) => {
  cpuStat.usagePercent(function (err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    const userss = bot.guilds.cache
      .map((g) => g.memberCount)
      .reduce((a, b) => a + b);

    const botinfo = new Discord.EmbedBuilder()
      .setTitle(
        "<:laptop:1199389100512383098> __**Information du bot:**__ <:laptop:1199389100512383098>"
      )
      .setDescription(
        `
                ➔ **Information sur le bot**
                > \`•\` **Nom du bot :** Shinetsus
                > \`•\` **Nombre de membres :** ${userss}
                > \`•\` **Nombre de salons :** ${bot.channels.cache.size}
                > \`•\` **Nombre de serveurs :** ${bot.guilds.cache.size}
                > \`•\` **Latence de l'api :** ${bot.ws.ping}ms
                > \`•\` **Développeur :** <@1188788946973507607>
                ➔ **Information sur le système**
                > \`•\` **Memoire utilisée :** ${(
                  process.memoryUsage().heapUsed /
                  1024 /
                  1024
                ).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
                > \`•\` **CPU :** ${os.cpus().map((i) => `${i.model}`)[0]}
                > \`•\` **Utilisation du CPU :** ${percent.toFixed(2)}%
                > \`•\` **Plateforme :** ${os.platform()}
                > \`•\` **Arch :** ${os.arch()}
                > \`•\` **Node :** ${process.version}
                > \`•\` **discord.js :** v${version}
                `
      )
      .setColor(bot.color)
      .setTimestamp()
      .setThumbnail(
        "https://media.discordapp.net/attachments/1192200111044964354/1199350046169247744/wp2297089.png?ex=65c238c5&is=65afc3c5&hm=ff297a532e5209e4f04cdd687d17b9ab8d3116d3e0cb9345c7247e4dd2e9b850&=&format=webp&quality=lossless&width=443&height=670"
      )
      .setFooter(bot.footer);
    return message.channel.send({ embeds: [botinfo] });
  });
};
