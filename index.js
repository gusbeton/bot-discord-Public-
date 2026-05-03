require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require('discord.js');

const {
  joinVoiceChannel,
  getVoiceConnection
} = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const CHANNEL_ID = '1488135944371572866';
const AUTO_VC_ID = '1488854856633680083'; // 🔥 TAMBAHAN (ISI ID VC BOT)

client.once('ready', async () => {
  console.log(`✅ Login sebagai ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  const messages = await channel.messages.fetch({ limit: 10 });
  const botMessage = messages.find(m => m.author.id === client.user.id);
  if (botMessage) return;

  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setAuthor({
      name: 'BETLEHEM',
      iconURL: 'https://media.discordapp.net/attachments/1487590787284734143/1492050545219862598/bthl.png'
    })
    .setTitle('BETLEHEM ROLE GAMING')
    .setDescription(`✨ Pilih role game kamu di dropdown bawah 🔥`)
    .setImage('https://media.discordapp.net/attachments/1487590787284734143/1492050006507651173/Black_and_White_Grunge_Gaming_Youtube_Banner.png')
    .setFooter({
      text: 'Copyright ©2018 - BTHL | BETLEHEM Role',
      iconURL: channel.guild.iconURL({ dynamic: true })
    })
    .setTimestamp();

  // 🔥 AUTO JOIN VC (TAMBAHAN DOANG)
  try {
    const guild = channel.guild;
    const vc = guild.channels.cache.get(AUTO_VC_ID);

    if (vc) {
      joinVoiceChannel({
        channelId: vc.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false
      });

      console.log('🎤 Auto join VC aktif');
    }
  } catch (err) {
    console.log(err);
  }

  // 📱 MOBILE 1
  const mobile1 = new StringSelectMenuBuilder()
    .setCustomId('mobile1')
    .setPlaceholder('📱 Mobile Games (1)')
    .addOptions([
      { label: 'Among Us', value: 'among', emoji: { id: '1488232855724101853' } },
      { label: 'AOV', value: 'aov', emoji: { id: '1488232953292001452' } },
      { label: 'Apex Mobile', value: 'apexm', emoji: { id: '1488233017087492167' } },
      { label: 'Free Fire', value: 'ff', emoji: { id: '1488233144732876820' } },
      { label: 'Genshin', value: 'gi', emoji: { id: '1488233389638156391' } },
      { label: 'League Mobile', value: 'lolm', emoji: { id: '1488233476292608171' } },
      { label: 'Mobile Legends', value: 'ml', emoji: { id: '1488225517113966673' } }
    ]);

  const mobile2 = new StringSelectMenuBuilder()
    .setCustomId('mobile2')
    .setPlaceholder('📱 Mobile Games (2)')
    .addOptions([
      { label: 'Roblox', value: 'roblox', emoji: { id: '1489081406406525121' } },
      { label: 'PUBG Mobile', value: 'pubgm', emoji: { id: '1488233818153418824' } },
      { label: 'Sausage Man', value: 'sausage', emoji: { id: '1488233909241118721' } },
      { label: 'Super Sus', value: 'supers', emoji: { id: '1488233979168559257' } },
      { label: 'Stumble Guys', value: 'stumble', emoji: { id: '1488234053906989126' } },
      { label: 'Honor of Kings', value: 'hok', emoji: { id: '1488234145787154653' } },
      { label: 'COD Mobile', value: 'codm', emoji: { id: '1488233107642515496' } }
    ]);

  const pc = new StringSelectMenuBuilder()
    .setCustomId('pc')
    .setPlaceholder('💻 PC Games')
    .addOptions([
      { label: 'Apex Legends', value: 'apexl', emoji: { id: '1488234574109610096' } },
      { label: 'CS2', value: 'cs2', emoji: { id: '1488229246441754744' } },
      { label: 'Dota 2', value: 'dota2', emoji: { id: '1488225450865066064' } },
      { label: 'Fortnite', value: 'ft', emoji: { id: '1488229574780391434' } },
      { label: 'GTA V', value: 'gtav', emoji: { id: '1488229820977516666' } },
      { label: 'League PC', value: 'lolpc', emoji: { id: '1488230038808821851' } },
      { label: 'Minecraft', value: 'mc', emoji: { id: '1488230360260284488' } },
      { label: 'Point Blank', value: 'pb', emoji: { id: '1488230516355240037' } },
      { label: 'PUBG PC', value: 'pubg', emoji: { id: '1488230934602973325' } },
      { label: 'R6', value: 'r6', emoji: { id: '1488231298135752748' } },
      { label: 'Valorant', value: 'vl', emoji: { id: '1488225389724700724' } }
    ]);

  const row1 = new ActionRowBuilder().addComponents(mobile1);
  const row2 = new ActionRowBuilder().addComponents(mobile2);
  const row3 = new ActionRowBuilder().addComponents(pc);

  await channel.send({
    embeds: [embed],
    components: [row1, row2, row3]
  });
});

// 🎤 COMMAND & ROLE SYSTEM (TETAP SAMA PERSIS)
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const cmd = message.content.toLowerCase();

  if (cmd === 'join' || cmd === 'v' || cmd === 'gas') {
    const channel = message.member.voice.channel;

    if (!channel) return message.reply('❌ Masuk voice dulu!');

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    return message.reply('🎤 Bot masuk voice!');
  }

  if (cmd === 'leave') {
    const connection = getVoiceConnection(message.guild.id);
    if (connection) {
      connection.destroy();
      return message.reply('👋 Keluar dari VC');
    }
  }
});

// 🎮 ROLE SYSTEM (AMAN)
client.on('interactionCreate', async interaction => {
  if (!interaction.isStringSelectMenu()) return;

  const rolesMap = { /* (tetap sama semua) */ };

  const member = interaction.member;
  const addedRoles = [];
  const removedRoles = [];

  for (const val of interaction.values) {
    const roleId = rolesMap[val];
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) continue;

    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(role);
      removedRoles.push(role.name);
    } else {
      await member.roles.add(role);
      addedRoles.push(role.name);
    }
  }

  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setAuthor({
      name: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    })
    .setDescription(`
✅ **Role Updated**

${addedRoles.length ? `✔️ Added: ${addedRoles.join(', ')}` : ''}
${removedRoles.length ? `❌ Removed: ${removedRoles.join(', ')}` : ''}
`)
    .setFooter({ text: 'Role System' })
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
});

client.login(process.env.TOKEN);
