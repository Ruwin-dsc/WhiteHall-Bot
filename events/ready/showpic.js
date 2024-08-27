const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'ready',
  async execute(bot) {
    setInterval(() => {
      bot.guilds.cache.forEach(async (guild) => {
        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${guild.id}"`, async (err, req) => {
          if (req.length < 1 || req[0].pfps === 'off') return;

          const channelId = req[0].pfps;
          const channel = guild.channels.cache.get(channelId);
          if (!channel) return;

          const invalidAvatarURLs = [
            'https://images-ext-2.discordapp.net/external/GyQicPLz_zQO15bOMtiGTtC4Kud7JjQbs1Ecuz7RrtU/https/cdn.discordapp.com/embed/avatars/1.png?width=512&height=512',
            'https://images-ext-2.discordapp.net/external/XGd-VZutJciwsICslQJTyIdK74gyWeVC88l_QhX3nLk/%3Fsize%3D512/https/cdn.discordapp.com/avatars/1058209623951282237/157e517cdbf371a47aaead44675714a3.png?width=1024&height=1024',
            'https://images-ext-1.discordapp.net/external/vzl3NGWAEK1Te1Gad7T5iMDtCSNZctkSGApvhD6JoxM/https/cdn.discordapp.com/embed/avatars/2.png?width=512&height=512',
            'https://images-ext-2.discordapp.net/external/2dZVVL6feMSM7lxfFkKVW__LToSOzmToSEmocJV5vcA/https/cdn.discordapp.com/embed/avatars/0.png?width=512&height=512',
            'https://images-ext-2.discordapp.net/external/7kG8GvaAyFTW94FQsZCs8yiC3GDDqorEamYmQhePvI4/https/cdn.discordapp.com/embed/avatars/3.png?width=512&height=512',
            'https://images-ext-2.discordapp.net/external/6tVaUxectogf8lZc5X8fWTGd2tbzlG6I5AtVbWYYLNI/https/cdn.discordapp.com/embed/avatars/4.png?width=512&height=512'
          ];

          const user = bot.users.cache.random();
          if (invalidAvatarURLs.includes(user.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }))) return;
          if (['878763313843011605', '878388819383169065', '878759770406912031', '878774598940889088'].includes(user.id)) return;

          const embed = new EmbedBuilder({ footer: { text: user.username } })
            .setTitle(`${user.tag} - (\`${user.id}\`)`)
            .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }))
            .setFooter(bot.footer)
            .setColor(bot.color);

          const button = new ButtonBuilder()
            .setLabel('Télécharger')
            .setURL(user.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }))
            .setStyle(ButtonStyle.Link);

          const row = new ActionRowBuilder().addComponents(button);
          channel.send({ embeds: [embed], components: [row] });
        });
      });
    }, ms('15s'));
  }
};