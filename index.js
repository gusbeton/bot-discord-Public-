require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require('discord.js');

const {
  joinVoiceChannel
} = require('@discordjs/voice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const CHANNEL_ID = '1488135944371572866';

client.once('ready', async () => {
  console.log(`✅ Login sebagai ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  const messages = await channel.messages.fetch({ limit: 10 });
  const botMessage = messages.find(m => m.author.id === client.user.id);
  if (botMessage) return;

  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setAuthor({
      name: 'Asosiasi Plenger',
      iconURL: 'https://LINK-ICON-LU.png'
    })
    .setTitle('ASOSIASI PLENGER')
    .setDescription(`✨ Pilih role game kamu di dropdown bawah 🔥`)
    .setImage('https://cdn.discordapp.com/attachments/1487590787284734143/1488478860394631329/p.png')
    .setFooter({
      text: 'Asosiasi Plenger • Gaming Role System'
    })
    .setTimestamp();

  const mobile1 = new StringSelectMenuBuilder()
    .setCustomId('mobile1')
    .setPlaceholder('📱 Mobile Games (1)')
    .addOptions([
      { label: 'Among Us', value: 'among' },
      { label: 'AOV', value: 'aov' },
      { label: 'Apex Mobile', value: 'apexm' },
      { label: 'Free Fire', value: 'ff' },
      { label: 'Genshin', value: 'gi' },
      { label: 'League Mobile', value: 'lolm' },
      { label: 'Mobile Legends', value: 'ml' }
    ]);

  const mobile2 = new StringSelectMenuBuilder()
    .setCustomId('mobile2')
    .setPlaceholder('📱 Mobile Games (2)')
    .addOptions([
      { label: 'Point Blank Mobile', value: 'pbm' },
      { label: 'PUBG Mobile', value: 'pubgm' },
      { label: 'Sausage Man', value: 'sausage' },
      { label: 'Super Sus', value: 'supers' },
      { label: 'Stumble Guys', value: 'stumble' },
      { label: 'Honor of Kings', value: 'hok' },
      { label: 'COD Mobile', value: 'codm' }
    ]);

  const pc = new StringSelectMenuBuilder()
    .setCustomId('pc')
    .setPlaceholder('💻 PC Games')
    .addOptions([
      { label: 'Apex Legends', value: 'apexl' },
      { label: 'CS2', value: 'cs2' },
      { label: 'Dota 2', value: 'dota2' },
      { label: 'Fortnite', value: 'ft' },
      { label: 'GTA V', value: 'gtav' },
      { label: 'League PC', value: 'lolpc' },
      { label: 'Minecraft', value: 'mc' },
      { label: 'Point Blank', value: 'pb' },
      { label: 'PUBG PC', value: 'pubg' },
      { label: 'R6', value: 'r6' },
      { label: 'Valorant', value: 'vl' }
    ]);

  const row1 = new ActionRowBuilder().addComponents(mobile1);
  const row2 = new ActionRowBuilder().addComponents(mobile2);
  const row3 = new ActionRowBuilder().addComponents(pc);

  await channel.send({
    embeds: [embed],
    components: [row1, row2, row3]
  });
});

// 🎤 JOIN VOICE COMMAND
client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'join') {
      const channel = interaction.member.voice.channel;

      if (!channel) {
        return interaction.reply({
          content: '❌ Masuk voice dulu!',
          ephemeral: true
        });
      }

      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      });

      return interaction.reply('🎤 Bot masuk voice!');
    }
  }

  // 🎮 ROLE DROPDOWN
  if (interaction.isStringSelectMenu()) {
    const rolesMap = {
      among: '1488435375725740172',
      aov: '1488435756350308443',
      apexm: '1488434903732195418',
      ff: '1488435095814803486',
      gi: '1488435159198859304',
      lolm: '1488435269081239623',
      ml: '1488435375725740172',
      pbm: '1488435629011374120',
      pubgm: '1488435756350308443',
      sausage: '1488435820560912434',
      supers: '1488441075680153680',
      stumble: '1488435872826130593',
      hok: '1488436005139644426',
      codm: '1488435039275319356',

      apexl: '1488432911290994769',
      cs2: '1488433170876600360',
      dota2: '1488433456252850297',
      ft: '1488433517049417728',
      gtav: '1488433623588802630',
      lolpc: '1488433735966920734',
      mc: '1488433861905092668',
      pb: '1488434230143881398',
      pubg: '1488434320308965546',
      r6: '1488434488064086117',
      vl: '1488434562114785371'
    };

    const member = interaction.member;

    for (const val of interaction.values) {
      const roleId = rolesMap[val];
      const role = interaction.guild.roles.cache.get(roleId);
      if (!role) continue;

      if (member.roles.cache.has(roleId)) {
        await member.roles.remove(role);
      } else {
        await member.roles.add(role);
      }
    }

    await interaction.reply({
      content: '✅ Role updated!',
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
