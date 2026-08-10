import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Check, ChevronDown, CircleHelp, Clock3, MessageCircle,
  Search, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react';
import { catalog, categories, type Category, type PackageOption, type Product } from './data/catalog';

const WHATSAPP_NUMBER = '6285190899490';
const formatIDR = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

const getCategoryCount = (category: 'Semua' | Category) =>
  category === 'Semua' ? catalog.length : catalog.filter((item) => item.category === category).length;

function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Semua' | Category>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredCatalog = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return catalog.filter((product) => {
      const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
      const matchesQuery = !normalized || `${product.service} ${product.short} ${product.category} ${product.packages.map((item) => item.name).join(' ')}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const openOrder = (product: Product, packageOption: PackageOption) => {
    const message = [
      'Halo evok, saya mau order:', '', `Layanan: ${product.service}`,
      `Paket: ${packageOption.name}`, `Durasi: ${packageOption.duration}`,
      `Total: ${formatIDR(packageOption.price)} (${packageOption.cadence})`,
      ...(packageOption.monthlyPrice ? [`Tarif dasar: ${formatIDR(packageOption.monthlyPrice)} / bulan`] : []),
      `Akses: ${packageOption.access}`, '', 'Mohon info ketersediaan dan langkah berikutnya ya.',
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const scrollToCatalog = () => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  const openProductDetail = (product: Product) => {
    const cheapestIndex = product.packages.reduce(
      (lowestIndex, current, index, packages) => {
        const lowest = packages[lowestIndex];
        return (current.monthlyPrice ?? current.price) < (lowest.monthlyPrice ?? lowest.price)
          ? index
          : lowestIndex;
      },
      0,
    );
    setSelectedPackageIndex(cheapestIndex);
    setSelectedProduct(product);
  };

  return (
    <div className="evok-app">
      <header className="topbar sticky top-0 z-30">
        <div className="mx-auto flex h-[70px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" data-testid="link-brand"><span className="brand-mark">E</span><span className="font-display text-[20px] font-bold tracking-[-.04em]">evok<span className="text-[#ff6b2b]">.</span></span></a>
          <nav className="hidden items-center gap-7 text-[13px] text-[#b8a99d] md:flex" aria-label="Navigasi utama"><a href="#catalog" className="transition-colors hover:text-[#fff3e5]" data-testid="link-catalog">Katalog</a><a href="#cara-order" className="transition-colors hover:text-[#fff3e5]" data-testid="link-how-to-order">Cara order</a><a href="#faq" className="transition-colors hover:text-[#fff3e5]" data-testid="link-faq">FAQ</a></nav>
          <button type="button" onClick={scrollToCatalog} className="orange-button flex items-center gap-2 rounded-full bg-[#ff6b2b] px-4 py-2.5 text-[12px] font-bold text-[#1a120c]" data-testid="button-browse-top">Lihat paket <ArrowRight size={14} strokeWidth={2.5} /></button>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-[#2d241f]">
          <div className="hero-grid absolute inset-0" /><div className="hero-orb" />
          <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
            <div className="stagger-in">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#63402d] bg-[#2a1d16] px-3 py-1.5 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#ffb27c]"><span className="h-1.5 w-1.5 rounded-full bg-[#ff6b2b]" /> Akses premium, dibuat tenang</div>
              <h1 className="font-display max-w-[700px] text-[clamp(3.2rem,7.8vw,6.7rem)] font-bold leading-[.91] tracking-[-.075em] text-[#fff3e5]">Langganan premium, <span className="text-[#ff6b2b]">tanpa ribut.</span></h1>
              <p className="mt-7 max-w-[500px] text-[16px] leading-7 text-[#b8a99d]">evok adalah counter digital untuk akses streaming, musik, AI, dan produktivitas. Pilih paket yang jelas, lalu order dalam satu chat.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3"><button type="button" onClick={scrollToCatalog} className="orange-button flex items-center gap-3 rounded-xl bg-[#ff6b2b] px-5 py-3.5 text-[14px] font-bold text-[#1a120c]" data-testid="button-browse-hero">Cari aksesmu <ArrowRight size={17} /></button><a href="#cara-order" className="outline-button flex items-center gap-2 rounded-xl border border-[#4b3930] px-5 py-3.5 text-[14px] font-semibold text-[#f1dfd0]" data-testid="link-order-guide">Cara order <span className="text-[#ff6b2b]">↘</span></a></div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[12px] text-[#94867c]"><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#ff8c52]" /> Harga transparan</span><span className="flex items-center gap-2"><Clock3 size={16} className="text-[#ff8c52]" /> Respon via WhatsApp</span><span className="flex items-center gap-2"><Users size={16} className="text-[#ff8c52]" /> Grup terkelola</span></div>
            </div>
            <div className="hero-card stagger-in delay-2 relative min-h-[360px] overflow-hidden rounded-[24px] p-6 sm:p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#ff8b50]/25" /><div className="absolute -right-2 top-0 h-40 w-40 rounded-full border border-[#ff8b50]/15" />
              <div className="relative flex items-start justify-between"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#d9a382]">evok counter / 001</p><p className="mt-4 font-display text-2xl font-bold tracking-[-.05em] text-[#fff3e5]">Yang kamu butuh,<br /><span className="text-[#ffb27c]">sudah dirapikan.</span></p></div><Sparkles size={22} className="text-[#ffb27c]" /></div>
              <div className="relative mt-10 grid grid-cols-2 gap-3">{[['01', 'Streaming', 'Netflix · Disney+ · Max'], ['02', 'Audio', 'Spotify · Apple Music'], ['03', 'Kerja & AI', 'ChatGPT · Gemini · 365'], ['04', 'Kreatif', 'Canva · CapCut']].map(([number, title, detail]) => <div key={number} className="rounded-xl border border-[#f1d5c3]/10 bg-[#1a130f]/35 p-3.5"><p className="font-mono-custom text-[10px] text-[#ff6b2b]">{number}</p><p className="mt-3 text-[13px] font-bold text-[#f8e9dd]">{title}</p><p className="mt-1 text-[10px] leading-4 text-[#b69f91]">{detail}</p></div>)}</div>
              <div className="relative mt-5 flex items-center justify-between border-t border-[#f1d5c3]/10 pt-4"><span className="font-mono-custom text-[10px] text-[#aa8c7c]">Mulai dari</span><span className="font-display text-xl font-bold text-[#ffb27c]">Rp 12.500<span className="ml-1 text-[11px] font-normal text-[#c09d8a]">/ bulan</span></span></div>
            </div>
          </div>
        </section>

        <section id="catalog" className="scroll-mt-20 border-y border-[#2d241f] bg-[#171311]">
          <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-7"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#ff8c52]">02 / Katalog lengkap</p><h2 className="font-display mt-3 text-3xl font-bold tracking-[-.05em] text-[#fff3e5] sm:text-4xl">Satu counter. Banyak kemungkinan.</h2></div><div className="relative w-full md:max-w-[320px]"><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9d887b]" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Netflix, Canva, AI..." className="h-12 w-full rounded-xl border border-[#49362c] bg-[#211a16] pl-11 pr-4 text-[13px] text-[#fff3e5] outline-none transition-colors placeholder:text-[#7f6c61] focus:border-[#ff6b2b]" data-testid="input-search-products" /></div></div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1"><button type="button" onClick={() => setShowMobileFilters(!showMobileFilters)} className="mr-1 flex shrink-0 items-center gap-2 rounded-lg border border-[#49362c] px-3 py-2 text-[12px] font-semibold text-[#cdbbae] md:hidden" data-testid="button-toggle-filters">Filter <span className="text-[#ff8c52]">{showMobileFilters ? '−' : '+'}</span></button><div className={`${showMobileFilters ? 'flex' : 'hidden'} flex-wrap gap-2 md:flex`}>{categories.map((category) => <button type="button" key={category} onClick={() => { setActiveCategory(category); setShowMobileFilters(false); }} className={`filter-chip shrink-0 rounded-lg border px-3.5 py-2 text-[12px] font-semibold ${activeCategory === category ? 'border-[#ff6b2b] bg-[#ff6b2b] text-[#1a120c]' : 'border-[#49362c] bg-transparent text-[#bba99c] hover:text-[#fff3e5]'}`} data-testid={`button-filter-${category.toLowerCase().replace(/\W/g, '-')}`}>{category} <span className={activeCategory === category ? 'text-[#6f2d13]' : 'text-[#78665c]'}>({getCategoryCount(category)})</span></button>)}</div></div>
              <div className="flex items-center justify-between border-b border-[#302720] pb-4 text-[12px] text-[#917f73]"><span data-testid="text-results-count">{filteredCatalog.length} layanan tersedia</span>{query && <button type="button" onClick={() => setQuery('')} className="flex items-center gap-1.5 text-[#ff9b65] hover:text-[#ffc3a0]" data-testid="button-clear-search">Hapus pencarian <X size={13} /></button>}</div>
            </div>
            {filteredCatalog.length > 0 ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredCatalog.map((product, index) => <ProductCard key={product.id} product={product} index={index} onView={() => openProductDetail(product)} />)}</div> : <EmptyState query={query} onClear={() => { setQuery(''); setActiveCategory('Semua'); }} />}
          </div>
        </section>

        <section id="cara-order" className="scroll-mt-20 mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#ff8c52]">03 / Cara order</p><h2 className="font-display mt-3 max-w-[360px] text-4xl font-bold leading-[1] tracking-[-.06em] text-[#fff3e5]">Pilih. Chat. Beres.</h2><p className="mt-5 max-w-[340px] text-[14px] leading-6 text-[#a39184]">Tidak perlu masuk grup ramai atau menebak-nebak format order. Kami sudah siapkan semuanya.</p></div><div className="grid gap-3 sm:grid-cols-3">{[['01', 'Pilih paket', 'Gunakan pencarian atau filter untuk menemukan layanan yang pas.'], ['02', 'Tekan order', 'Detail layanan dan harga otomatis masuk ke chat WhatsApp.'], ['03', 'Terima akses', 'Admin mengecek slot, lalu mengirim instruksi aksesmu.']].map(([number, title, detail]) => <div key={number} className="rounded-2xl border border-[#382c25] bg-[#1b1714] p-5"><div className="flex items-center justify-between"><span className="font-mono-custom text-[11px] text-[#ff6b2b]">{number}</span><ArrowRight size={15} className="text-[#6e5a50]" /></div><h3 className="mt-10 font-display text-lg font-bold text-[#f6e8dc]">{title}</h3><p className="mt-2 text-[12px] leading-5 text-[#958277]">{detail}</p></div>)}</div></div></section>

        <section id="faq" className="scroll-mt-20 border-t border-[#2d241f] bg-[#171311]"><div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 lg:grid-cols-[.7fr_1.3fr] lg:px-8 lg:py-24"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#ff8c52]">04 / Perlu tahu</p><h2 className="font-display mt-3 text-4xl font-bold tracking-[-.06em] text-[#fff3e5]">Biar jelas dari awal.</h2><div className="mt-7 flex items-center gap-3 text-[#c4b1a4]"><CircleHelp size={20} className="text-[#ff6b2b]" /><span className="text-[13px]">Masih ragu? Tanyakan langsung di WhatsApp.</span></div></div><div className="divide-y divide-[#332821] rounded-2xl border border-[#382c25] bg-[#1b1714] px-5">{[['Bagaimana sistem akun patungan di evok?', 'Setiap paket punya jumlah member dan skema akses yang tertera di detail. evok membentuk grup sesuai kapasitas paket, jadi tidak ada grup chat yang penuh sesak.'], ['Apakah harga sudah termasuk biaya admin?', 'Ya. Harga yang tampil adalah harga paket akhir sesuai katalog evok. Untuk paket tertentu, durasi atau status pre-order akan ditulis jelas di kartu detail.'], ['Berapa lama akses dikirim?', 'Setelah order masuk, admin mengecek slot dan membalas melalui WhatsApp. Waktu pengiriman bisa berbeda mengikuti jenis layanan dan kepenuhan grup.'], ['Kalau saya hanya ingin tanya dulu?', 'Boleh. Tekan tombol order pada paket yang paling mendekati kebutuhanmu. Pesan yang dibuat otomatis bisa kamu edit sebelum dikirim.']].map(([question, answer], index) => <div key={question} className="faq-row"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left" data-testid={`button-faq-${index + 1}`}><span className="text-[14px] font-semibold text-[#edddd1]">{question}</span><ChevronDown size={17} className={`shrink-0 text-[#ff8c52] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="faq-answer max-w-[650px] pb-5 pr-7 text-[13px] leading-6 text-[#9f8d80]">{answer}</p>}</div>)}</div></div></section>
      </main>
      <footer className="border-t border-[#2d241f]"><div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-3"><span className="brand-mark">E</span><div><p className="font-display text-[16px] font-bold tracking-[-.04em]">evok<span className="text-[#ff6b2b]">.</span></p><p className="text-[11px] text-[#806f64]">Premium access, made simple.</p></div></div><p className="text-[11px] text-[#76665c]">Katalog presentation • Harga dapat berubah mengikuti ketersediaan.</p></div></footer>
      {selectedProduct && <ProductModal product={selectedProduct} packageIndex={selectedPackageIndex} onPackageChange={setSelectedPackageIndex} onClose={() => setSelectedProduct(null)} onOrder={openOrder} />}
    </div>
  );
}

function ProductCard({ product, index, onView }: { product: Product; index: number; onView: () => void }) {
  const cheapest = product.packages.reduce((lowest, current) => (current.monthlyPrice ?? current.price) < (lowest.monthlyPrice ?? lowest.price) ? current : lowest, product.packages[0]);
  return <article className={`product-card stagger-in rounded-2xl p-5 ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`} data-testid={`card-product-${product.id}`}>
    <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="service-icon">{product.accent}</span><div><h3 className="font-display text-[17px] font-bold tracking-[-.035em] text-[#f8e9dd]" data-testid={`text-product-name-${product.id}`}>{product.service}</h3><p className="mt-0.5 text-[11px] text-[#87756a]">{product.category}</p></div></div>{product.badge && <span className="rounded-md bg-[#3a2519] px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em] text-[#ffae7c]">{product.badge}</span>}</div>
    <div className="card-line mt-5" /><p className="mt-4 min-h-[40px] text-[13px] leading-5 text-[#a79386]">{product.short}</p>
     <div className="mt-5 flex items-end justify-between border-t border-[#332821] pt-4"><div><p className="font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#806e63]">Mulai dari / bulan</p><p className="mt-1 font-display text-[21px] font-bold tracking-[-.04em] text-[#ff9a64]" data-testid={`text-price-${product.id}`}>{formatIDR(cheapest.monthlyPrice ?? cheapest.price)}<span className="ml-1 text-[10px] font-normal tracking-normal text-[#87756a]">{cheapest.cadence === 'per tahun' ? 'per tahun' : 'per bulan'}</span></p></div><button type="button" onClick={onView} className="outline-button rounded-lg border border-[#49362c] px-3 py-2 text-[11px] font-bold text-[#dbc7b9]" data-testid={`button-detail-${product.id}`}>Detail <ArrowRight size={13} className="ml-1 inline" /></button></div>
     <button type="button" onClick={onView} className="orange-button mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6b2b] py-2.5 text-[12px] font-bold text-[#1a120c]" data-testid={`button-order-${product.id}`}><MessageCircle size={15} /> Order paket termurah</button>
  </article>;
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#4a372d] bg-[#1b1714] px-5 text-center" data-testid="empty-search-state"><div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#5a3e2d] bg-[#2c1c14] text-[#ff8c52]"><Search size={24} /></div><h3 className="mt-5 font-display text-xl font-bold text-[#f6e8dc]">Belum ketemu, coba kata lain.</h3><p className="mt-2 max-w-[320px] text-[13px] leading-5 text-[#988579]">{query ? `Tidak ada hasil untuk “${query}”.` : 'Belum ada paket di filter ini.'} Coba nama layanan atau kategori lain.</p><button type="button" onClick={onClear} className="outline-button mt-6 rounded-lg border border-[#ff6b2b] px-4 py-2.5 text-[12px] font-bold text-[#ffae7c]" data-testid="button-reset-search">Reset pencarian</button></div>;
}

function ProductModal({ product, packageIndex, onPackageChange, onClose, onOrder }: { product: Product; packageIndex: number; onPackageChange: (index: number) => void; onClose: () => void; onOrder: (product: Product, packageOption: PackageOption) => void }) {
  const selectedPackage = product.packages[packageIndex];
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKeyDown); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; }; }, [onClose]);
  return <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#0d0907]/80 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label={`Detail ${product.service}`} data-testid="product-modal"><button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Tutup detail" data-testid="button-close-modal-backdrop" /><div className="modal-panel relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-[24px] border border-[#49362c] bg-[#1b1714] shadow-2xl sm:max-w-[640px] sm:rounded-[24px]">
    <div className="flex items-start justify-between border-b border-[#352a24] p-5 sm:p-7"><div className="flex items-center gap-4"><span className="service-icon h-14 w-14 text-[16px]">{product.accent}</span><div><p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#ff8c52]">{product.category}</p><h2 className="font-display mt-1 text-2xl font-bold tracking-[-.05em] text-[#fff3e5]">{product.service}</h2></div></div><button type="button" onClick={onClose} className="outline-button rounded-lg border border-[#49362c] p-2 text-[#c4b1a4]" aria-label="Tutup detail" data-testid="button-close-modal"><X size={18} /></button></div>
    <div className="p-5 sm:p-7"><p className="text-[14px] leading-6 text-[#b29e91]">{product.description}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl border border-[#382c25] bg-[#241c18] p-3.5"><p className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#837065]">Kapasitas</p><p className="mt-2 flex items-center gap-2 text-[13px] font-bold text-[#eee0d5]"><Users size={15} className="text-[#ff8c52]" /> {selectedPackage.members} member</p></div><div className="rounded-xl border border-[#382c25] bg-[#241c18] p-3.5"><p className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#837065]">Akses</p><p className="mt-2 flex items-center gap-2 text-[13px] font-bold text-[#eee0d5]"><Check size={15} className="text-[#ff8c52]" /> {selectedPackage.access}</p></div></div>
    <div className="mt-7"><div className="mb-3 flex items-center justify-between"><p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#ff8c52]">Pilih paket</p><span className="text-[11px] text-[#7f6d62]">{product.packages.length} opsi tersedia</span></div><div className="grid gap-2">{product.packages.map((packageOption, index) => <button type="button" key={packageOption.name} onClick={() => onPackageChange(index)} className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${packageIndex === index ? 'border-[#ff6b2b] bg-[#382116]' : 'border-[#3b2d26] bg-[#211a17] hover:border-[#70503c]'}`} data-testid={`button-select-package-${product.id}-${index}`}><span className="min-w-0 pr-3"><span className="block text-[13px] font-bold text-[#edddd1]">{packageOption.name}</span><span className="mt-1 block text-[11px] text-[#988477]">{packageOption.note || packageOption.access}</span>{packageOption.monthlyPrice && packageOption.monthlyPrice !== packageOption.price && <span className="mt-1 block text-[10px] text-[#806e63]">{formatIDR(packageOption.monthlyPrice)} / bulan</span>}</span><span className="shrink-0 text-right"><span className="block font-display text-[16px] font-bold text-[#ff9d68]">{formatIDR(packageOption.price)}</span><span className="text-[10px] text-[#a48778]">{packageOption.duration} · {packageOption.cadence}</span></span></button>)}</div></div>
    <button type="button" onClick={() => onOrder(product, selectedPackage)} className="orange-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b2b] py-3.5 text-[13px] font-bold text-[#1a120c]" data-testid={`button-modal-order-${product.id}`}><MessageCircle size={17} /> Order {product.service} via WhatsApp</button><p className="mt-3 text-center text-[10px] leading-4 text-[#806e63]">Pesan otomatis berisi layanan, paket, dan harga. Kamu bisa cek ulang sebelum kirim.</p></div>
  </div></div>;
}

export default App;