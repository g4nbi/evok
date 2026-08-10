export type Category = 'Film & TV' | 'Musik' | 'Produktivitas' | 'Kreativitas' | 'Bundling';

export type PackageOption = {
  name: string;
  price: number;
  cadence: string;
  duration: string;
  monthlyPrice?: number;
  members: number;
  access: string;
  note?: string;
};

export type Product = {
  id: string;
  service: string;
  category: Category;
  short: string;
  description: string;
  accent: string;
  badge?: string;
  packages: PackageOption[];
};

type PriceLine = {
  duration: string;
  total: number;
  cadence: string;
  monthlyPrice?: number;
  note?: string;
};

const makePackages = (
  variant: string,
  members: number,
  access: string,
  lines: PriceLine[],
  variantNote?: string,
): PackageOption[] =>
  lines.map((line) => ({
    name: `${variant} · ${line.duration}`,
    price: line.total,
    cadence: line.cadence,
    duration: line.duration,
    monthlyPrice: line.monthlyPrice,
    members,
    access,
    note: line.note ?? variantNote,
  }));

export const catalog: Product[] = [
  {
    id: 'netflix',
    service: 'Netflix',
    category: 'Film & TV',
    short: 'Film, series, dan tayangan favorit.',
    description: 'Pilihan perangkat dan jumlah member berbeda. Total harga di bawah mengikuti durasi yang dipilih.',
    accent: 'NF',
    badge: 'Paling dicari',
    packages: [
      ...makePackages('1 Perangkat', 4, '4 member / akun', [
        { duration: '1 Bulan', total: 47500, cadence: 'per bulan', monthlyPrice: 47500 },
        { duration: '2 Bulan', total: 95000, cadence: 'total', monthlyPrice: 47500 },
        { duration: '3 Bulan', total: 142500, cadence: 'total', monthlyPrice: 47500 },
        { duration: '6 Bulan', total: 285000, cadence: 'total', monthlyPrice: 47500 },
      ]),
      ...makePackages('2 Perangkat', 2, '2 member / akun', [
        { duration: '1 Bulan', total: 95000, cadence: 'per bulan', monthlyPrice: 95000 },
        { duration: '2 Bulan', total: 190000, cadence: 'total', monthlyPrice: 95000 },
        { duration: '3 Bulan', total: 285000, cadence: 'total', monthlyPrice: 95000 },
        { duration: '6 Bulan', total: 570000, cadence: 'total', monthlyPrice: 95000 },
      ]),
      ...makePackages('5 Perangkat', 1, '1 member / akun', [
        { duration: '1 Bulan', total: 195000, cadence: 'per bulan', monthlyPrice: 195000 },
        { duration: '2 Bulan', total: 390000, cadence: 'total', monthlyPrice: 195000 },
        { duration: '3 Bulan', total: 585000, cadence: 'total', monthlyPrice: 195000 },
        { duration: '6 Bulan', total: 1170000, cadence: 'total', monthlyPrice: 195000 },
      ]),
      ...makePackages('User Reguler TV', 4, '4 member / akun', [
        { duration: '2 Bulan', total: 122000, cadence: 'total', monthlyPrice: 61000 },
        { duration: '3 Bulan', total: 183000, cadence: 'total', monthlyPrice: 61000 },
        { duration: '6 Bulan', total: 366000, cadence: 'total', monthlyPrice: 61000 },
      ]),
      ...makePackages('User Host TV', 4, '4 member / akun', [
        { duration: '1 Bulan', total: 57500, cadence: 'per bulan', monthlyPrice: 57500 },
      ]),
      ...makePackages('User Reguler Non-TV', 4, '4 member / akun', [
        { duration: '2 Bulan', total: 108000, cadence: 'total', monthlyPrice: 54000 },
        { duration: '3 Bulan', total: 162000, cadence: 'total', monthlyPrice: 54000 },
        { duration: '6 Bulan', total: 324000, cadence: 'total', monthlyPrice: 54000 },
      ]),
      ...makePackages('User Host Non-TV', 4, '4 member / akun', [
        { duration: '1 Bulan', total: 47500, cadence: 'per bulan', monthlyPrice: 47500 },
      ]),
    ],
  },
  {
    id: 'disney-hotstar',
    service: 'Disney+ Hotstar',
    category: 'Film & TV',
    short: 'Koleksi Disney, Marvel, dan lainnya.',
    description: 'Tersedia paket reguler bulanan, tahunan, dan User Host dengan kapasitas grup yang berbeda.',
    accent: 'DH',
    packages: [
      ...makePackages('1 Bulan (Reguler)', 3, '3 member / akun', [
        { duration: '1 Bulan', total: 36000, cadence: 'per bulan', monthlyPrice: 36000 },
        { duration: '2 Bulan', total: 72000, cadence: 'total', monthlyPrice: 36000 },
        { duration: '3 Bulan', total: 108000, cadence: 'total', monthlyPrice: 36000 },
        { duration: '6 Bulan', total: 216000, cadence: 'total', monthlyPrice: 36000 },
      ]),
      ...makePackages('12 Bulan (Tahunan)', 3, '3 member / akun', [
        { duration: '12 Bulan', total: 292992, cadence: 'total', monthlyPrice: 24416 },
      ]),
      ...makePackages('User Host Tahunan', 2, '2 member / akun', [
        { duration: '12 Bulan', total: 99500, cadence: 'per tahun', monthlyPrice: 99500 },
      ]),
    ],
  },
  {
    id: 'max',
    service: 'Max',
    category: 'Film & TV',
    short: 'Series premium untuk malam panjang.',
    description: 'Paket Max tersedia dalam pilihan bulanan dan tahunan dengan kapasitas 4 member per akun.',
    accent: 'MX',
    packages: [
      ...makePackages('Bulanan', 4, '4 member / akun', [
        { duration: '1 Bulan', total: 39000, cadence: 'per bulan', monthlyPrice: 39000 },
        { duration: '3 Bulan', total: 117000, cadence: 'total', monthlyPrice: 39000 },
        { duration: '6 Bulan', total: 234000, cadence: 'total', monthlyPrice: 39000 },
      ]),
      ...makePackages('Tahunan', 4, '4 member / akun', [
        { duration: '12 Bulan', total: 468000, cadence: 'total', monthlyPrice: 39000 },
      ]),
    ],
  },
  {
    id: 'prime-video',
    service: 'Prime Video',
    category: 'Film & TV',
    short: 'Film pilihan dan serial eksklusif.',
    description: 'Paket streaming dengan pilihan durasi fleksibel dan 3 member per akun.',
    accent: 'PV',
    packages: makePackages('Bulanan', 3, '3 member / akun', [
      { duration: '1 Bulan', total: 32500, cadence: 'per bulan', monthlyPrice: 32500 },
      { duration: '2 Bulan', total: 65000, cadence: 'total', monthlyPrice: 32500 },
      { duration: '3 Bulan', total: 97500, cadence: 'total', monthlyPrice: 32500 },
    ]),
  },
  {
    id: 'vidio',
    service: 'Vidio Premier',
    category: 'Film & TV',
    short: 'Tayangan lokal dan olahraga pilihan.',
    description: 'Paket Premier dengan pilihan masa akses 1, 2, 3, atau 6 bulan.',
    accent: 'VD',
    packages: makePackages('Bulanan', 2, '2 member / akun', [
      { duration: '1 Bulan', total: 35000, cadence: 'per bulan', monthlyPrice: 35000 },
      { duration: '2 Bulan', total: 70000, cadence: 'total', monthlyPrice: 35000 },
      { duration: '3 Bulan', total: 105000, cadence: 'total', monthlyPrice: 35000 },
      { duration: '6 Bulan', total: 210000, cadence: 'total', monthlyPrice: 35000 },
    ]),
  },
  {
    id: 'viu',
    service: 'Viu Premium',
    category: 'Film & TV',
    short: 'Drama Asia dan hiburan lokal.',
    description: 'Viu Premium dalam grup 4 member dengan pilihan durasi hingga 3 bulan.',
    accent: 'VU',
    packages: makePackages('Bulanan', 4, '4 member / akun', [
      { duration: '1 Bulan', total: 27500, cadence: 'per bulan', monthlyPrice: 27500 },
      { duration: '2 Bulan', total: 55000, cadence: 'total', monthlyPrice: 27500 },
      { duration: '3 Bulan', total: 82500, cadence: 'total', monthlyPrice: 27500 },
    ]),
  },
  {
    id: 'viu-plus',
    service: 'Viu Premium Plus',
    category: 'Film & TV',
    short: 'Koleksi Viu dengan benefit Plus.',
    description: 'Paket Viu Premium Plus untuk 4 member per akun.',
    accent: 'VP',
    packages: makePackages('Bulanan', 4, '4 member / akun', [
      { duration: '1 Bulan', total: 48000, cadence: 'per bulan', monthlyPrice: 48000 },
    ]),
  },
  {
    id: 'iqiyi',
    service: 'iQIYI VIP',
    category: 'Film & TV',
    short: 'Serial Asia dan tayangan eksklusif.',
    description: 'Paket VIP dengan pilihan durasi 1, 2, 3, atau 6 bulan untuk 4 member per akun.',
    accent: 'IQ',
    packages: makePackages('Bulanan', 4, '4 member / akun', [
      { duration: '1 Bulan', total: 19500, cadence: 'per bulan', monthlyPrice: 19500 },
      { duration: '2 Bulan', total: 39000, cadence: 'total', monthlyPrice: 19500 },
      { duration: '3 Bulan', total: 58500, cadence: 'total', monthlyPrice: 19500 },
      { duration: '6 Bulan', total: 117000, cadence: 'total', monthlyPrice: 19500 },
    ]),
  },
  {
    id: 'wetv',
    service: 'WeTV VIP',
    category: 'Film & TV',
    short: 'Drama Asia, variety show, dan film.',
    description: 'Paket VIP untuk 3 member per akun.',
    accent: 'WT',
    packages: makePackages('Bulanan', 3, '3 member / akun', [
      { duration: '1 Bulan', total: 25000, cadence: 'per bulan', monthlyPrice: 25000 },
    ]),
  },
  {
    id: 'catchplay',
    service: 'CATCHPLAY+',
    category: 'Film & TV',
    short: 'Film pilihan untuk penonton serius.',
    description: 'Paket bulanan untuk 5 member per akun dengan pilihan durasi hingga 6 bulan.',
    accent: 'CP',
    packages: makePackages('Bulanan', 5, '5 member / akun', [
      { duration: '1 Bulan', total: 25000, cadence: 'per bulan', monthlyPrice: 25000 },
      { duration: '2 Bulan', total: 50000, cadence: 'total', monthlyPrice: 25000 },
      { duration: '3 Bulan', total: 75000, cadence: 'total', monthlyPrice: 25000 },
      { duration: '6 Bulan', total: 150000, cadence: 'total', monthlyPrice: 25000 },
    ]),
  },
  {
    id: 'youku',
    service: 'Youku Premium',
    category: 'Film & TV',
    short: 'Drama Asia yang sedang hangat.',
    description: 'Paket Premium untuk 5 member per akun dengan pilihan durasi hingga 6 bulan.',
    accent: 'YK',
    packages: makePackages('Bulanan', 5, '5 member / akun', [
      { duration: '1 Bulan', total: 25000, cadence: 'per bulan', monthlyPrice: 25000 },
      { duration: '2 Bulan', total: 50000, cadence: 'total', monthlyPrice: 25000 },
      { duration: '3 Bulan', total: 75000, cadence: 'total', monthlyPrice: 25000 },
      { duration: '6 Bulan', total: 150000, cadence: 'total', monthlyPrice: 25000 },
    ]),
  },
  {
    id: 'vision-plus',
    service: 'Vision+ Ultimate',
    category: 'Film & TV',
    short: 'TV dan streaming dalam satu akses.',
    description: 'Paket 1 perangkat untuk 3 member per akun.',
    accent: 'V+',
    packages: makePackages('1 Perangkat', 3, '3 member / akun', [
      { duration: '1 Bulan', total: 25500, cadence: 'per bulan', monthlyPrice: 25500 },
    ]),
  },
  {
    id: 'spotify-premium',
    service: 'Spotify Premium',
    category: 'Musik',
    short: 'Musik tanpa iklan, kapan saja.',
    description: 'Pilih User Reguler, promo durasi, atau User Host. Semua varian berkapasitas 3 member per akun.',
    accent: 'SP',
    packages: [
      ...makePackages('User Reguler', 3, '3 member / akun', [
        { duration: '2 Bulan', total: 86600, cadence: 'total', monthlyPrice: 43300 },
        { duration: '3 Bulan', total: 129900, cadence: 'total', monthlyPrice: 43300 },
        { duration: '6 Bulan', total: 259800, cadence: 'total', monthlyPrice: 43300 },
      ]),
      ...makePackages('Promo 3 & 6 Bulan', 3, '3 member / akun', [
        { duration: '3 Bulan', total: 130002, cadence: 'total', monthlyPrice: 43334, note: 'Harga promo' },
        { duration: '6 Bulan', total: 260004, cadence: 'total', monthlyPrice: 43334, note: 'Harga promo' },
      ]),
      ...makePackages('Promo 12 Bulan', 3, '3 member / akun', [
        { duration: '12 Bulan', total: 521004, cadence: 'total', monthlyPrice: 43417, note: 'Harga promo' },
      ]),
      ...makePackages('User Host', 3, '3 member / akun', [
        { duration: '1 Bulan', total: 35113, cadence: 'per bulan', monthlyPrice: 35113 },
      ]),
    ],
  },
  {
    id: 'spotify-platinum',
    service: 'Spotify Platinum',
    category: 'Musik',
    short: 'Premium Platinum untuk rutinitas audio.',
    description: 'Pilihan Reguler atau User Host, masing-masing untuk 3 member per akun.',
    accent: 'SP',
    packages: [
      ...makePackages('Reguler', 3, '3 member / akun', [
        { duration: '2 Bulan', total: 96000, cadence: 'total', monthlyPrice: 48000 },
        { duration: '3 Bulan', total: 144000, cadence: 'total', monthlyPrice: 48000 },
        { duration: '6 Bulan', total: 288000, cadence: 'total', monthlyPrice: 48000 },
      ]),
      ...makePackages('User Host', 3, '3 member / akun', [
        { duration: '1 Bulan', total: 39967, cadence: 'per bulan', monthlyPrice: 39967 },
        { duration: '2 Bulan', total: 79934, cadence: 'total', monthlyPrice: 39967 },
        { duration: '3 Bulan', total: 119901, cadence: 'total', monthlyPrice: 39967 },
      ]),
    ],
  },
  {
    id: 'apple-music',
    service: 'Apple Music',
    category: 'Musik',
    short: 'Jutaan lagu, tanpa gangguan.',
    description: 'Akses Apple Music Family untuk 5 member per akun.',
    accent: 'AM',
    packages: makePackages('Bulanan', 5, '5 member / akun', [
      { duration: '1 Bulan', total: 25000, cadence: 'per bulan', monthlyPrice: 25000 },
      { duration: '2 Bulan', total: 50000, cadence: 'total', monthlyPrice: 25000 },
      { duration: '3 Bulan', total: 75000, cadence: 'total', monthlyPrice: 25000 },
      { duration: '6 Bulan', total: 150000, cadence: 'total', monthlyPrice: 25000 },
    ]),
  },
  {
    id: 'chatgpt',
    service: 'ChatGPT Plus',
    category: 'Produktivitas',
    short: 'Partner berpikir untuk kerja dan belajar.',
    description: 'Akses ChatGPT Plus untuk 5 member per akun dengan pilihan 1, 3, atau 6 bulan.',
    accent: 'AI',
    packages: makePackages('1 Perangkat', 5, '5 member / akun', [
      { duration: '1 Bulan', total: 79900, cadence: 'per bulan', monthlyPrice: 79900 },
      { duration: '3 Bulan', total: 239700, cadence: 'total', monthlyPrice: 79900 },
      { duration: '6 Bulan', total: 479400, cadence: 'total', monthlyPrice: 79900 },
    ]),
  },
  {
    id: 'gemini',
    service: 'Google Gemini',
    category: 'Produktivitas',
    short: 'AI untuk ide, riset, dan kerja.',
    description: 'Google Gemini dengan varian bulanan Advanced dan tahunan untuk 5 member per akun.',
    accent: 'GM',
    packages: [
      ...makePackages('Bulanan (Advanced)', 5, '5 member / akun', [
        { duration: '1 Bulan', total: 76500, cadence: 'per bulan', monthlyPrice: 76500 },
      ]),
      ...makePackages('Tahunan', 5, '5 member / akun', [
        { duration: '12 Bulan', total: 903804, cadence: 'total', monthlyPrice: 75317 },
      ]),
    ],
  },
  {
    id: 'microsoft-365',
    service: 'Microsoft 365',
    category: 'Produktivitas',
    short: 'Word, Excel, dan kerja lebih rapi.',
    description: 'Paket Microsoft 365 untuk 5 member per akun.',
    accent: 'M3',
    packages: makePackages('Bulanan', 5, '5 member / akun', [
      { duration: '1 Bulan', total: 41000, cadence: 'per bulan', monthlyPrice: 41000 },
    ]),
  },
  {
    id: 'canva',
    service: 'Canva Pro',
    category: 'Kreativitas',
    short: 'Desain bagus tanpa mulai dari nol.',
    description: 'Pilihan Host atau Reguler untuk 5 member per akun. Total harga mengikuti durasi.',
    accent: 'CV',
    badge: 'Favorit kreator',
    packages: [
      ...makePackages('Bulanan Host', 5, '5 member / akun', [
        { duration: '1 Bulan', total: 73000, cadence: 'per bulan', monthlyPrice: 73000 },
        { duration: '3 Bulan', total: 219000, cadence: 'total', monthlyPrice: 73000 },
        { duration: '6 Bulan', total: 438000, cadence: 'total', monthlyPrice: 73000 },
      ], 'Akun disediakan tim'),
      ...makePackages('Bulanan Reguler', 5, '5 member / akun', [
        { duration: '1 Bulan', total: 79500, cadence: 'per bulan', monthlyPrice: 79500 },
        { duration: '3 Bulan', total: 238500, cadence: 'total', monthlyPrice: 79500 },
        { duration: '6 Bulan', total: 477000, cadence: 'total', monthlyPrice: 79500 },
      ], 'Canva Teams'),
    ],
  },
  {
    id: 'capcut',
    service: 'CapCut Pro',
    category: 'Kreativitas',
    short: 'Edit video lebih cepat dan lengkap.',
    description: 'Pilihan desktop atau mobile dengan batas device yang tercantum pada setiap varian.',
    accent: 'CC',
    packages: [
      ...makePackages('Bulanan Desktop', 3, '3 member / akun', [
        { duration: '2 Bulan', total: 109000, cadence: 'total', monthlyPrice: 54500 },
      ], 'Maks. 3 device'),
      ...makePackages('Tahunan Desktop', 3, '3 member / akun', [
        { duration: '12 Bulan', total: 399000, cadence: 'per tahun', monthlyPrice: 399000 },
      ], 'Maks. 3 device'),
      ...makePackages('Bulanan Mobile', 2, '2 member / akun', [
        { duration: '2 Bulan', total: 173000, cadence: 'total', monthlyPrice: 86500 },
      ], 'Maks. 2 device'),
      ...makePackages('Tahunan Mobile', 2, '2 member / akun', [
        { duration: '12 Bulan', total: 567000, cadence: 'per tahun', monthlyPrice: 567000 },
      ], 'Maks. 2 device'),
    ],
  },
  {
    id: 'zoom',
    service: 'Zoom Pro',
    category: 'Produktivitas',
    short: 'Meeting panjang tanpa terputus.',
    description: 'Untuk kelas, meeting, dan kolaborasi dengan kapasitas 3 member per akun.',
    accent: 'ZM',
    packages: makePackages('Bulanan', 3, '3 member / akun', [
      { duration: '1 Bulan', total: 68000, cadence: 'per bulan', monthlyPrice: 68000 },
      { duration: '2 Bulan', total: 136000, cadence: 'total', monthlyPrice: 68000 },
      { duration: '3 Bulan', total: 204000, cadence: 'total', monthlyPrice: 68000 },
      { duration: '6 Bulan', total: 408000, cadence: 'total', monthlyPrice: 68000 },
    ]),
  },
  {
    id: 'apple-one',
    service: 'Apple One',
    category: 'Produktivitas',
    short: 'Satu paket untuk ekosistem Apple.',
    description: 'Pilihan Reguler atau Host untuk 5 member per akun.',
    accent: 'A1',
    packages: [
      ...makePackages('Reguler Bulanan', 5, '5 member / akun', [
        { duration: '3 Bulan', total: 138000, cadence: 'total', monthlyPrice: 46000 },
        { duration: '6 Bulan', total: 276000, cadence: 'total', monthlyPrice: 46000 },
      ]),
      ...makePackages('Host Bulanan', 5, '5 member / akun', [
        { duration: '3 Bulan', total: 119400, cadence: 'total', monthlyPrice: 39800 },
        { duration: '6 Bulan', total: 238800, cadence: 'total', monthlyPrice: 39800 },
      ]),
    ],
  },
  {
    id: 'apple-premier',
    service: 'Apple One Premier',
    category: 'Produktivitas',
    short: 'Apple One dengan benefit Premier.',
    description: 'Pilihan bulanan Reguler atau Host untuk 5 member per akun.',
    accent: 'AP',
    packages: [
      ...makePackages('Bulanan Reguler', 5, '5 member / akun', [
        { duration: '1 Bulan', total: 69500, cadence: 'per bulan', monthlyPrice: 69500 },
        { duration: '3 Bulan', total: 208500, cadence: 'total', monthlyPrice: 69500 },
        { duration: '6 Bulan', total: 417000, cadence: 'total', monthlyPrice: 69500 },
      ]),
      ...makePackages('Bulanan Host', 5, '5 member / akun', [
        { duration: '1 Bulan', total: 63800, cadence: 'per bulan', monthlyPrice: 63800 },
        { duration: '3 Bulan', total: 191400, cadence: 'total', monthlyPrice: 63800 },
        { duration: '6 Bulan', total: 382800, cadence: 'total', monthlyPrice: 63800 },
      ]),
    ],
  },
  {
    id: 'google-one',
    service: 'Google One',
    category: 'Produktivitas',
    short: 'Ruang penyimpanan untuk semua file.',
    description: 'Pilih paket bulanan atau tahunan untuk 5 member per akun.',
    accent: 'G1',
    packages: [
      ...makePackages('Bulanan', 5, '5 member / akun', [
        { duration: '1 Bulan', total: 41000, cadence: 'per bulan', monthlyPrice: 41000 },
        { duration: '2 Bulan', total: 82000, cadence: 'total', monthlyPrice: 41000 },
        { duration: '3 Bulan', total: 123000, cadence: 'total', monthlyPrice: 41000 },
        { duration: '6 Bulan', total: 246000, cadence: 'total', monthlyPrice: 41000 },
      ]),
      ...makePackages('Tahunan', 5, '5 member / akun', [
        { duration: '12 Bulan', total: 480000, cadence: 'total', monthlyPrice: 40000 },
      ]),
    ],
  },
  {
    id: 'nordvpn',
    service: 'NordVPN',
    category: 'Produktivitas',
    short: 'Privasi untuk aktivitas online.',
    description: 'Paket bulanan atau tahunan Pre-Order untuk 6 member per akun.',
    accent: 'NV',
    badge: 'Pre-Order tahunan',
    packages: [
      ...makePackages('Bulanan', 6, '6 member / akun', [
        { duration: '1 Bulan', total: 54500, cadence: 'per bulan', monthlyPrice: 54500 },
        { duration: '3 Bulan', total: 163500, cadence: 'total', monthlyPrice: 54500 },
        { duration: '6 Bulan', total: 327000, cadence: 'total', monthlyPrice: 54500 },
      ]),
      ...makePackages('Tahunan (Pre-Order)', 6, '6 member / akun', [
        { duration: '12 Bulan', total: 306000, cadence: 'per tahun', monthlyPrice: 306000, note: 'Menunggu grup penuh' },
      ]),
    ],
  },
  {
    id: 'duolingo',
    service: 'Duolingo Super',
    category: 'Produktivitas',
    short: 'Belajar bahasa dengan ritme sendiri.',
    description: 'Paket tahunan untuk 5 member per akun.',
    accent: 'DL',
    packages: makePackages('Tahunan', 5, '5 member / akun', [
      { duration: '12 Bulan', total: 41000, cadence: 'per tahun', monthlyPrice: 41000 },
    ]),
  },
  {
    id: 'crunchyroll',
    service: 'Crunchyroll',
    category: 'Film & TV',
    short: 'Anime baru, langsung tayang.',
    description: 'Pilih varian bulanan atau tahunan untuk 4 member per akun.',
    accent: 'CR',
    packages: [
      ...makePackages('Bulanan', 4, '4 member / akun', [
        { duration: '12 Bulan', total: 180000, cadence: 'total', monthlyPrice: 15000 },
      ]),
      ...makePackages('Tahunan', 4, '4 member / akun', [
        { duration: '12 Bulan', total: 150000, cadence: 'total', monthlyPrice: 12500 },
      ]),
    ],
  },
  {
    id: 'spotify-netflix',
    service: 'Bundling Spotify x Netflix',
    category: 'Bundling',
    short: 'Dua langganan, satu checkout.',
    description: 'Promo BH6K untuk akses Spotify dan Netflix dalam satu paket.',
    accent: 'BH',
    badge: 'Hemat',
    packages: [
      ...makePackages('Promo BH6K', 5, 'Spotify + Netflix', [
        { duration: '1 Bulan', total: 118500, cadence: 'per bulan', monthlyPrice: 118500 },
        { duration: '3 Bulan', total: 355500, cadence: 'total', monthlyPrice: 118500 },
      ]),
    ],
  },
  {
    id: 'disney-netflix',
    service: 'Bundling Disney x Netflix',
    category: 'Bundling',
    short: 'Koleksi tontonan untuk seisi grup.',
    description: 'Promo BH7K untuk akses Disney+ dan Netflix dalam satu paket.',
    accent: 'BH',
    badge: 'Hemat',
    packages: makePackages('Promo BH7K', 5, 'Disney+ + Netflix', [
      { duration: '1 Bulan', total: 81500, cadence: 'per bulan', monthlyPrice: 81500 },
    ]),
  },
  {
    id: 'youtube-netflix',
    service: 'Bundling YouTube x Netflix',
    category: 'Bundling',
    short: 'Video tanpa batas, satu paket praktis.',
    description: 'Promo BH12K untuk akses YouTube dan Netflix dalam satu paket.',
    accent: 'BH',
    badge: 'Baru',
    packages: [
      ...makePackages('Promo BH12K', 5, 'YouTube + Netflix', [
        { duration: '1 Bulan', total: 83500, cadence: 'per bulan', monthlyPrice: 83500 },
        { duration: '3 Bulan', total: 250500, cadence: 'total', monthlyPrice: 83500 },
      ]),
    ],
  },
];

export const categories: Array<'Semua' | Category> = ['Semua', 'Film & TV', 'Musik', 'Produktivitas', 'Kreativitas', 'Bundling'];