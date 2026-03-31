const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = 'ISI_CHANNEL_ID_LO';

client.once('ready', async () => {
  const channel = await client.channels.fetch(CHANNEL_ID);

  const messages = await channel.messages.fetch({ limit: 10 });
  const botMessage = messages.find(m => m.author.id === client.user.id);
  if (botMessage) return;

  // EMBED
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎮 SERVER ROLE GAMES')
    .setDescription(`Pilih role game kamu di dropdown bawah 🔥`)
    .setFooter({ text: 'Gaming Role System' });

  // 📱 MOBILE 1
  const mobile1 = new StringSelectMenuBuilder()
    .setCustomId('mobile1')
    .setPlaceholder('📱 Mobile Games (1)')
    .addOptions([
      { label: 'Among Us', value: 'among', emoji: '<:among:1488232855724101853>' },
      { label: 'AOV', value: 'aov', emoji: '<:aov:1488232953292001452>' },
      { label: 'Apex Mobile', value: 'apexm', emoji: '<:apexm:1488233017087492167>' },
      { label: 'Free Fire', value: 'ff', emoji: '<:ff:1488233144732876820>' },
      { label: 'Genshin', value: 'gi', emoji: '<:gi:1488233389638156391>' },
      { label: 'League Mobile', value: 'lolm', emoji: '<:lol:1488233476292608171>' },
      { label: 'Mobile Legends', value: 'ml', emoji: '<:ml:1488225517113966673>' }
    ]);

  // 📱 MOBILE 2
  const mobile2 = new StringSelectMenuBuilder()
    .setCustomId('mobile2')
    .setPlaceholder('📱 Mobile Games (2)')
    .addOptions([
      { label: 'Point Blank Mobile', value: 'pbm', emoji: '<:pu:1488233568042750144>' },
      { label: 'PUBG Mobile', value: 'pubgm', emoji: '<:pubgm:1488233818153418824>' },
      { label: 'Sausage Man', value: 'sausage', emoji: '<:sausage:1488233909241118721>' },
      { label: 'Super Sus', value: 'supers', emoji: '<:supers:1488233979168559257>' },
      { label: 'Stumble Guys', value: 'stumble', emoji: '<:stumble:1488234053906989126>' },
      { label: 'Honor of Kings', value: 'hok', emoji: '<:hok:1488234145787154653>' },
      { label: 'COD Mobile', value: 'codm', emoji: '<:codm:1488233107642515496>' }
    ]);

  // 💻 PC
  const pc = new StringSelectMenuBuilder()
    .setCustomId('pc')
    .setPlaceholder('💻 PC Games')
    .addOptions([
      { label: 'Apex Legends', value: 'apexl', emoji: '<:apexl:1488234574109610096>' },
      { label: 'CS2', value: 'cs2', emoji: '<:cs2:1488229246441754744>' },
      { label: 'Dota 2', value: 'dota2', emoji: '<:dt:1488225450865066064>' },
      { label: 'Fortnite', value: 'ft', emoji: '<:ft:1488229574780391434>' },
      { label: 'GTA V', value: 'gtav', emoji: '<:gtav:1488229820977516666>' },
      { label: 'League PC', value: 'lolpc', emoji: '<:lol:1488230038808821851>' },
      { label: 'Minecraft', value: 'mc', emoji: '<:mc:1488230360260284488>' },
      { label: 'Point Blank', value: 'pb', emoji: '<:pb:1488230516355240037>' },
      { label: 'PUBG PC', value: 'pubg', emoji: '<:pubg:1488230934602973325>' },
      { label: 'R6', value: 'r6', emoji: '<:r6:1488231298135752748>' },
      { label: 'Valorant', value: 'vl', emoji: '<:vl:1488225389724700724>' }
    ]);

  const row1 = new ActionRowBuilder().addComponents(mobile1);
  const row2 = new ActionRowBuilder().addComponents(mobile2);
  const row3 = new ActionRowBuilder().addComponents(pc);

  await channel.send({
    embeds: [embed],
    components: [row1, row2, row3]
  });
});

// ROLE MAP (SAMA)
client.on('interactionCreate', async interaction => {
  if (!interaction.isStringSelectMenu()) return;

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
});

client.login(process.env.TOKEN);
