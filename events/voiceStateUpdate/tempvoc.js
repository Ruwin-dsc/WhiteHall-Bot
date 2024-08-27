const Discord = require("discord.js")

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState, bot) {
      const guildId = oldState.guild.id;
      const query = `SELECT * FROM tempvoc WHERE guildId = "${guildId}"`;
      bot.db.query(query, async (err, req) => {
        if (req.length < 1) return;

        const categorytemp = req[0].category;
        const salontempvoc = req[0].channel;

        if (oldState.channel === null || oldState.channel) {
          if (newState.channelId === salontempvoc) {
            const category = oldState.guild.channels.cache.get(categorytemp);
            if (!category) return;

            oldState.guild.channels
              .create({
                name: `🔊・${newState.member.user.username}`,
                type: Discord.ChannelType.GuildVoice,
                parent: category,
                reason: 'Salon temporaire',
                permissionOverwrites: [
                  {
                    id: newState.member,
                    allow: [
                      Discord.PermissionsBitField.Flags.MoveMembers,
                      Discord.PermissionsBitField.Flags.MuteMembers,
                      Discord.PermissionsBitField.Flags.DeafenMembers,
                      Discord.PermissionsBitField.Flags.ManageChannels,
                      Discord.PermissionsBitField.Flags.ViewChannel,
                      Discord.PermissionsBitField.Flags.UseVAD,
                      Discord.PermissionsBitField.Flags.Stream,
                      Discord.PermissionsBitField.Flags.Connect,
                      Discord.PermissionsBitField.Flags.Speak,
                      Discord.PermissionsBitField.Flags.UseSoundboard,
                      Discord.PermissionsBitField.Flags.SendVoiceMessages
                    ]
                  },
                  {
                    id: newState.guild.id,
                    allow: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak, Discord.PermissionsBitField.Flags.Stream, Discord.PermissionsBitField.Flags.UseVAD]
                  }
                ]
              })
              .then((funny) => {
                newState.member.voice.setChannel(funny);
              });
          }
        }


        if (!oldState.channel) return;
        if (oldState.channel.name === `🔊・${newState.member.user.username}`) {
          if (oldState.channel.id === salontempvoc) return;
          if (oldState.channel.members.size === 0) {
            oldState.channel.delete({ reason: 'Salon temporaire - Plus personne dans le salon' });
          }
        }
      });
  }
};