const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require("discord.js");
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent
  ],
});
bot.setMaxListeners(70)


bot.commands = new Collection();
bot.slashcommand = new Collection()
bot.snipes = new Collection();
bot.snipesedit = new Collection();
bot.snipesimg = new Collection();

bot.config = require("./bot/config.json")
bot.emoji = require("./utils/emoji.json");
bot.footer = {
  text: "Shinetsu",
  iconURL:
    "https://media.discordapp.net/attachments/1192200111044964354/1199350046169247744/wp2297089.png?ex=65c238c5&is=65afc3c5&hm=ff297a532e5209e4f04cdd687d17b9ab8d3116d3e0cb9345c7247e4dd2e9b850&=&format=webp&quality=lossless&width=443&height=670",
};
bot.support = "https://discord.gg/7xFnasnrtf"

bot.login(bot.config.token);

const commandHandler = require("./handlers/command.js")(bot);
const anticrashHandler = require("./utils/anticrash");
anticrashHandler(bot);
const eventdHandler = require("./handlers/event.js")(bot);
const slashcommandHandler = require("./handlers/loadslashcommand.js")(bot);
const loadDatabase = require("./handlers/loadDatabase");
const DataBase = require("./handlers/loginDatabase");
DataBase.connectDatabase(bot);
const colorBot = require("./utils/colorBot");
colorBot.colorBot(bot);

bot.on("messageCreate", (message) => {
  if (!message.guild) return;
  bot.db.query(
    `SELECT * FROM serveurs WHERE guildId = "${message.guild.id}"`,
    async (err, req) => {
      if (req.length < 1) return;
      pref = req[0].prefix;
      if (!pref) return;
      bot.prefix = pref;
    }
  );
});

bot.on("interactionCreate", (interaction) => {
  if (!interaction.guild) return;
  bot.db.query(
    `SELECT * FROM serveurs WHERE guildId = "${interaction.guild.id}"`,
    async (err, req) => {
      if (req.length < 1) return;
      pref = req[0].prefix;
      if (!pref) return;
      bot.prefix = pref;
    }
  );
});

const { GiveawaysManager } = require("discord-giveaways");
bot.giveawaysManager = new GiveawaysManager(bot, {
  storage: "./utils/giveaway.json",
  default: {
    botsCanWin: false,
    embedColor: bot.color,
    reaction: "<:partypopper_1f389:1199746425844674700>",
    lastChance: { 
      enabled: false,
      content: `<:stopsign_1f6d1:1199746718275731508> **Dernière chance pour participer** <:stopsign_1f6d1:1199746718275731508>`,
      threshold: 5000,
      embedColor: bot.color
    }
  }
});

bot.function = {
    createID: require("./bot/fonctions/createID"),
    antiSpam: require("./bot/fonctions/antispam.js"),
    antilink: require("./bot/fonctions/antilink")
}







