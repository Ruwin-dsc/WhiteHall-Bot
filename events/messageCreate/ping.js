module.exports = {
    name: 'messageCreate',
    async execute(message, bot) {
        if(message.content == `<@${bot.user.id}>`) {
            message.reply(`
            Salut, c'est moi <:interesting:1199477603174715554>
            Mon préfix est \`${bot.prefix}\`
            `)
        }

    }}