const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// READY
client.once('ready', async () => {
  console.log(`Login sebagai ${client.user.tag}`);

  const commands = [
    new SlashCommandBuilder()
      .setName('rules')
      .setDescription('Menampilkan rules server')
  ];

  await client.application.commands.set(commands);
  console.log('Slash command ready!');
});

// COMMAND
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rules') {

    const embed = new EmbedBuilder()
      .setTitle('📜 𝘼𝙎𝙊𝙎𝙄𝘼𝙎𝙄 𝙋𝙇𝙀𝙉𝙂𝙀𝙍 𝙍𝙐𝙇𝙀𝙎')
      .setDescription(
        `**Welcome to ASSPLR Server!**

Harap membaca dan memahami semua aturan berikut.
Dengan masuk ke server ini, kamu dianggap setuju dengan semua rules yang berlaku.

━━━━━━━━━━━━━━━━━━━━━━`
      )
      .setColor(0x2ecc71)
      .addFields(
        {
          name: '📌 𝑹𝑼𝑳𝑬 1 • Respect Everyone',
          value: 'Hormati semua member tanpa terkecuali. Dilarang menghina, merendahkan, atau toxic terhadap siapapun.',
        },
        {
          name: '💬 𝑹𝑼𝑳𝑬 2 • Proper Language',
          value: 'Gunakan bahasa yang sopan. Dilarang berkata kasar, SARA, atau hal yang menyinggung.',
        },
        {
          name: '🚫 𝑹𝑼𝑳𝑬 3 • No Spamming',
          value: 'Dilarang spam chat, emoji, sticker, atau link yang tidak relevan.',
        },
        {
          name: '🔗 𝑹𝑼𝑳𝑬 4 • No Unauthorized Promotion',
          value: 'Dilarang promosi tanpa izin dari admin/moderator.',
        },
        {
          name: '⚖️ 𝑹𝑼𝑳𝑬 5 • Follow Staff Instructions',
          value: 'Semua keputusan admin/mod bersifat final dan wajib dipatuhi.',
        },
        {
          name: '🛡️ 𝑹𝑼𝑳𝑬 6 • Keep It Safe',
          value: 'Dilarang mengirim konten NSFW, ilegal, atau berbahaya.',
        }
      )
      .setFooter({
        text: 'NINJA SERVER • Stay Respectful & Enjoy',
      });

    await interaction.reply({ embeds: [embed] });
  }
});

// LOGIN
client.login(process.env.TOKEN);
