const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Bot login sebagai ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rules') {
    await interaction.reply({
      embeds: [
        {
          title: "Server Ninja Rules!",
          description: "Pastikan membaca aturan berikut:",
          color: 0x00ff00,
          fields: [
            {
              name: "Rule 1",
              value: "Hormati semua member"
            },
            {
              name: "Rule 2",
              value: "Gunakan bahasa sopan"
            },
            {
              name: "Rule 3",
              value: "Dilarang spam"
            }
          ]
        }
      ]
    });
  }
});

client.login(process.env.TOKEN);