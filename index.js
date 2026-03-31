const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// REGISTER SLASH COMMAND
const commands = [
  new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Menampilkan rules server')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// GANTI INI
const CLIENT_ID = '1488224269543411742';

(async () => {
  try {
    console.log('Registering slash command...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log('Slash command ready!');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`Login sebagai ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rules') {
    const embed = new EmbedBuilder()
      .setTitle('📜 Server Ninja Rules!')
      .setDescription('**Important**\n\nPastikan membaca dan memahami aturan dengan teliti.\nSelamat datang di server NINJA!')
      .setColor(0x00ff00)
      .addFields(
        {
          name: '📌 RULE 1 — Hormati Semua Member',
          value: 'Perlakukan semua anggota dengan setara tanpa memandang apapun.'
        },
        {
          name: '💬 RULE 2 — Gunakan Bahasa yang Baik',
          value: 'Hindari kata kasar, toxic, SARA, dan hal yang menyinggung.'
        },
        {
          name: '🚫 RULE 3 — Dilarang Spam',
          value: 'Jangan spam chat, emoji, link, atau hal tidak penting.'
        },
        {
          name: '⚖️ RULE 4 — Ikuti Admin & Moderator',
          value: 'Admin berhak mute/kick/ban sesuai aturan.'
        }
      )
      .setFooter({ text: 'Server Ninja • Stay Respectful' });

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
