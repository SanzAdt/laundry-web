// LaundryFlow - Complete POS, Expenses, CRM & Public Tracking System
const STORAGE_KEYS = {
  ORDERS: 'laundryflow_orders_v2',
  EXPENSES: 'laundryflow_expenses_v2',
  SETTINGS: 'laundryflow_settings_v2',
};

const DEFAULT_SETTINGS = {
  storeName: 'Berkah Laundry Express',
  tagline: 'Layanan Cuci & Setrika Profesional',
  address: 'Jl. Merpati No. 12, RT 03/04',
  phone: '081234567890',
  footerNote: 'Syarat & Ketentuan: Pengambilan cucian wajib menunjukkan bukti nota fisik atau digital. Komplain maksimal 1x24 jam setelah barang diterima.',
};

const SERVICES = [
  { id: 'komplit-reg', name: 'Cuci Komplit Reguler (2 Hari)', price: 0, unit: 'Kg', days: 2 },
  { id: 'komplit-kilat', name: 'Cuci Komplit Kilat / Express (1 Hari)', price: 0, unit: 'Kg', days: 1 },
  { id: 'kering-saja', name: 'Cuci Kering Saja (1 Hari)', price: 0, unit: 'Kg', days: 1 },
  { id: 'setrika-saja', name: 'Setrika Saja (1 Hari)', price: 0, unit: 'Kg', days: 1 },
  { id: 'bedcover-b', name: 'Bedcover Besar (Satuan)', price: 0, unit: 'Pcs', days: 3 },
  { id: 'bedcover-k', name: 'Bedcover Kecil (Satuan)', price: 0, unit: 'Pcs', days: 3 },
  { id: 'sepatu', name: 'Cuci Sepatu Premium', price: 0, unit: 'Pasang', days: 2 },
  { id: 'custom', name: 'Layanan Tambahan', price: 0, unit: 'Item', days: 1 },
];

const INITIAL_DEMO_ORDERS = [
  {
    id: 'LND-1001',
    customerName: 'Budi Santoso',
    customerPhone: '081234567801',
    items: [
      { name: 'Cuci Komplit Reguler (2 Hari)', qty: 4.5, unit: 'Kg', price: 7000, subtotal: 31500 },
      { name: 'Bedcover Besar (Satuan)', qty: 1, unit: 'Pcs', price: 25000, subtotal: 25000 }
    ],
    total: 56500,
    status: 'ready', // pending, washing, ironing, ready, completed
    paymentMethod: 'QRIS',
    isPaid: true,
    notes: 'Pakaian kerja putih dipisah.',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    estimatedDate: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
  },
  {
    id: 'LND-1002',
    customerName: 'Siti Rahma',
    customerPhone: '085712345678',
    items: [
      { name: 'Cuci Komplit Kilat / Express (1 Hari)', qty: 3.0, unit: 'Kg', price: 12000, subtotal: 36000 }
    ],
    total: 36000,
    status: 'ironing',
    paymentMethod: 'Tunai',
    isPaid: false,
    notes: 'Aroma parfum Sakura.',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    estimatedDate: new Date(Date.now() + 20 * 3600 * 1000).toISOString(),
  },
  {
    id: 'LND-1003',
    customerName: 'Agus Wijaya',
    customerPhone: '081398765432',
    items: [
      { name: 'Bedcover Besar (Satuan)', qty: 1, unit: 'Pcs', price: 25000, subtotal: 25000 }
    ],
    total: 25000,
    status: 'washing',
    paymentMethod: 'Transfer Bank',
    isPaid: true,
    notes: 'Noda minuman di bagian tengah selimut.',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    estimatedDate: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
  },
  {
    id: 'LND-1004',
    customerName: 'Dian Permata',
    customerPhone: '087811223344',
    items: [
      { name: 'Setrika Saja (1 Hari)', qty: 5.2, unit: 'Kg', price: 5000, subtotal: 26000 }
    ],
    total: 26000,
    status: 'pending',
    paymentMethod: 'Tunai',
    isPaid: false,
    notes: 'Gantung 3 kemeja, sisanya lipat.',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    estimatedDate: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
  },
  {
    id: 'LND-0999',
    customerName: 'Budi Santoso',
    customerPhone: '081234567801',
    items: [
      { name: 'Cuci Komplit Reguler (2 Hari)', qty: 6.0, unit: 'Kg', price: 7000, subtotal: 42000 }
    ],
    total: 42000,
    status: 'completed',
    paymentMethod: 'Tunai',
    isPaid: true,
    notes: '',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    estimatedDate: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
  }
];

const INITIAL_DEMO_EXPENSES = [
  { id: 'EXP-101', date: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), category: 'Bahan Baku', description: 'Deterjen Liquid 20 Liter', amount: 160000 },
  { id: 'EXP-102', date: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), category: 'Bahan Baku', description: 'Parfum Laundry & Plastik Packing', amount: 95000 },
  { id: 'EXP-103', date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), category: 'Operasional', description: 'Token Listrik Outlet', amount: 100000 }
];

// App State
let state = {
  settings: { ...DEFAULT_SETTINGS },
  orders: [],
  expenses: [],
  activeTab: 'orders', // 'orders', 'customers', 'expenses', 'tracking'
  currentFilter: 'all',
  searchQuery: '',
  // Multi-item cart in form
  formItems: [],
};

// Utilities
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

function formatDate(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPhoneWA(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

// Storage Management
function loadState() {
  try {
    const sSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    state.settings = sSettings ? JSON.parse(sSettings) : { ...DEFAULT_SETTINGS };

    const sOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    state.orders = sOrders ? JSON.parse(sOrders) : [...INITIAL_DEMO_ORDERS];

    const sExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    state.expenses = sExpenses ? JSON.parse(sExpenses) : [...INITIAL_DEMO_EXPENSES];

    // Day 1 Normalization (One-time migration agar data demo sinkron di hari pertama)
    const isDay1Done = localStorage.getItem('laundryflow_v2_day1_done');
    if (!isDay1Done) {
      const todayStr = new Date().toDateString();
      state.orders.forEach((o, i) => {
        const d = new Date(o.createdAt);
        if (d.toDateString() !== todayStr) {
          o.createdAt = new Date(Date.now() - (i + 1) * 3600 * 1000).toISOString();
        }
      });

      state.expenses.forEach((exp, i) => {
        const d = new Date(exp.date);
        if (d.toDateString() !== todayStr) {
          exp.date = new Date(Date.now() - (i + 1) * 3600 * 1000).toISOString();
        }
      });

      localStorage.setItem('laundryflow_v2_day1_done', 'true');
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));
    }
  } catch (e) {
    console.error('Storage parse error:', e);
    state.settings = { ...DEFAULT_SETTINGS };
    state.orders = [...INITIAL_DEMO_ORDERS];
    state.expenses = [...INITIAL_DEMO_EXPENSES];
  }
}

function saveOrders() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
  renderApp();
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));
  renderApp();
}

function saveSettings(newSettings) {
  state.settings = { ...newSettings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
  renderHeader();
  renderApp();
}

// WhatsApp Message Formatters
function buildInvoiceMessage(order, settings) {
  const itemsText = (order.items || []).map(item => `• ${item.name} (${item.qty} ${item.unit}) : ${formatRupiah(item.subtotal)}`).join('\n');
  const trackingUrl = `${window.location.origin}${window.location.pathname}?track=${order.id}`;

  return `*NOTA TRANSAKSI - ${settings.storeName.toUpperCase()}*
No. Nota: *#${order.id}*
Tanggal: ${formatDate(order.createdAt)}
Nama Pelanggan: *${order.customerName}*

*RINCIAN LAYANAN*
${itemsText}
${order.notes ? `Catatan: ${order.notes}\n` : ''}
*TOTAL TAGIHAN: ${formatRupiah(order.total)}*
Status Pembayaran: *[${order.isPaid ? 'LUNAS' : 'BELUM LUNAS'}]* (${order.paymentMethod})
Estimasi Selesai: *${formatDate(order.estimatedDate)}*

*Lacak Status Cucian Anda Secara Real-time:*
${trackingUrl}

Alamat: ${settings.address}
Kontak/WhatsApp: ${settings.phone}

${settings.footerNote}

Terima kasih atas kunjungan Anda.`;
}

function buildReadyMessage(order, settings) {
  const itemsText = (order.items || []).map(item => `• ${item.name} (${item.qty} ${item.unit})`).join('\n');
  const trackingUrl = `${window.location.origin}${window.location.pathname}?track=${order.id}`;

  return `*PEMBERITAHUAN: PESANAN SIAP DIAMBIL*

Yth. *${order.customerName}*,
Pesanan cucian Anda pada *${settings.storeName}* dengan No. Nota *#${order.id}* telah *SELESAI* dan siap diambil.

Rincian:
${itemsText}
Status Pembayaran: *${order.isPaid ? 'LUNAS (Sudah Dibayar)' : 'BELUM LUNAS - ' + formatRupiah(order.total)}*

Detail Nota Digital:
${trackingUrl}

Lokasi Pengambilan:
${settings.address}

Silakan menunjukkan nomor nota kepada petugas. Terima kasih.`;
}

function openWhatsApp(phone, messageText) {
  const waPhone = formatPhoneWA(phone);
  if (!waPhone) {
    alert('Nomor WhatsApp pelanggan tidak valid atau kosong.');
    return;
  }
  const encoded = encodeURIComponent(messageText);
  const url = `https://wa.me/${waPhone}?text=${encoded}`;
  window.open(url, '_blank');
}

// Status Badges
const STATUS_CONFIG = {
  pending: { label: 'Baru Masuk', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', step: 1 },
  washing: { label: 'Sedang Dicuci', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', step: 2 },
  ironing: { label: 'Sedang Disetrika', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500', step: 3 },
  ready: { label: 'Siap Diambil', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', step: 4 },
  completed: { label: 'Selesai', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400', step: 5 },
};

// Navigation Tabs Handling
function switchTab(tabName) {
  state.activeTab = tabName;
  ['orders', 'customers', 'expenses', 'tracking'].forEach(tab => {
    const elView = document.getElementById(`view-${tab}`);
    const elBtn = document.getElementById(`nav-btn-${tab}`);
    if (tab === tabName) {
      if (elView) elView.classList.remove('hidden');
      if (elBtn) {
        elBtn.className = 'nav-tab px-3.5 py-1.5 rounded-lg font-semibold bg-white text-slate-900 shadow-xs transition';
      }
    } else {
      if (elView) elView.classList.add('hidden');
      if (elBtn) {
        elBtn.className = 'nav-tab px-3.5 py-1.5 rounded-lg font-medium text-slate-500 hover:text-slate-900 transition';
      }
    }
  });

  if (tabName === 'customers') renderCustomers();
  if (tabName === 'expenses') renderExpenses();
  if (tabName === 'orders') renderOrders();
}

// Render Header & Metrics
function renderHeader() {
  document.getElementById('header-store-name').textContent = state.settings.storeName;
  document.getElementById('header-tagline').textContent = state.settings.tagline;
}

function renderStats() {
  const activeOrders = state.orders.filter(o => o.status !== 'completed');
  const readyOrders = state.orders.filter(o => o.status === 'ready');
  
  const todayStr = new Date().toDateString();
  const todayOrders = state.orders.filter(o => new Date(o.createdAt).toDateString() === todayStr);
  
  let todayKg = 0;
  let todayOmzet = 0;

  // Pendapatan Hari Ini HANYA menghitung transaksi yang SUDAH LUNAS (isPaid === true)
  todayOrders.forEach(o => {
    if (o.isPaid) {
      todayOmzet += Number(o.total || 0);
    }
    (o.items || []).forEach(item => {
      if (item.unit === 'Kg') todayKg += Number(item.qty || 0);
    });
  });

  const totalExpense = state.expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  // Total Pendapatan (Omzet) HANYA dari transaksi yang SUDAH LUNAS
  const allOmzet = state.orders.filter(o => o.isPaid).reduce((acc, curr) => acc + Number(curr.total || 0), 0);
  const netProfit = allOmzet - totalExpense;

  document.getElementById('stat-active-count').textContent = activeOrders.length;
  document.getElementById('stat-ready-count').textContent = readyOrders.length;
  document.getElementById('stat-today-kg').textContent = todayKg.toFixed(1) + ' Kg';
  document.getElementById('stat-today-omzet').textContent = formatRupiah(todayOmzet);
  
  // Total Pendapatan (Omzet) & Beban in Buku Kas Tab
  const allOmzetEl = document.getElementById('stat-today-omzet-2');
  if (allOmzetEl) allOmzetEl.textContent = formatRupiah(allOmzet);

  const expenseTotalEl = document.getElementById('expense-total-display');
  if (expenseTotalEl) expenseTotalEl.textContent = formatRupiah(totalExpense);

  // Financial overview stats (Estimasi Laba Bersih)
  const netProfitEl = document.getElementById('stat-net-profit');
  if (netProfitEl) {
    netProfitEl.textContent = formatRupiah(netProfit);
    netProfitEl.className = `text-2xl font-extrabold mt-1 tabular-nums tracking-tight ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`;
  }
}

// Orders Filter & Render
function getFilteredOrders() {
  return state.orders.filter(order => {
    if (state.currentFilter !== 'all' && order.status !== state.currentFilter) {
      return false;
    }
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchId = order.id.toLowerCase().includes(q);
      const matchPhone = (order.customerPhone || '').includes(q);
      if (!matchName && !matchId && !matchPhone) return false;
    }
    return true;
  });
}

function renderOrders() {
  const listContainer = document.getElementById('orders-container');
  const filtered = getFilteredOrders();

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-16 bg-white rounded-xl border border-slate-200/80 shadow-xs">
        <div class="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-100">
          <svg class="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
        </div>
        <p class="text-slate-700 font-semibold text-sm">Tidak ada transaksi ditemukan</p>
        <p class="text-slate-400 text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter status transaksi.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(order => {
    const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
    const isReady = order.status === 'ready';
    const itemsListHtml = (order.items || []).map(i => `
      <div class="flex items-center justify-between text-xs py-0.5">
        <span class="text-slate-700 font-medium">${i.name} &times; ${i.qty} ${i.unit}</span>
        <span class="text-slate-500 font-mono">${formatRupiah(i.subtotal)}</span>
      </div>
    `).join('');

    return `
      <div class="bg-white rounded-2xl border ${isReady ? 'border-emerald-300/80 ring-2 ring-emerald-100/60' : 'border-slate-200/70'} p-5 sm:p-6 shadow-xs card-hover">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5 mb-4">
          <div class="flex items-center space-x-2.5">
            <span class="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">#${order.id}</span>
            <span class="text-xs text-slate-400 font-medium">${formatDate(order.createdAt)}</span>
          </div>

          <div class="flex items-center space-x-2">
            <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text} border ${statusCfg.border}">
              <span class="w-1.5 h-1.5 rounded-full ${statusCfg.dot}"></span>
              <select onchange="updateOrderStatus('${order.id}', this.value)" class="bg-transparent border-none text-xs font-semibold cursor-pointer focus:ring-0 py-0 pl-0 pr-4">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Baru Masuk</option>
                <option value="washing" ${order.status === 'washing' ? 'selected' : ''}>Sedang Dicuci</option>
                <option value="ironing" ${order.status === 'ironing' ? 'selected' : ''}>Sedang Disetrika</option>
                <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Siap Diambil</option>
                <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Selesai</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Pelanggan</p>
            <p class="font-bold text-slate-900 text-sm mt-0.5">${order.customerName}</p>
            <div class="mt-1.5 flex items-center gap-1.5">
              <a href="https://wa.me/${formatPhoneWA(order.customerPhone)}" target="_blank" title="Chat langsung via WhatsApp" class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200/80 transition">
                <svg class="w-3.5 h-3.5 fill-current shrink-0 text-emerald-600" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>${order.customerPhone || '-'}</span>
              </a>
            </div>
          </div>

          <div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Rincian Layanan (${(order.items || []).length} Item)</p>
            <div class="space-y-1">
              ${itemsListHtml}
            </div>
            ${order.notes ? `<p class="text-[11px] text-slate-600 border-t border-slate-200/60 pt-1.5 mt-2 font-medium">Catatan: ${order.notes}</p>` : ''}
          </div>

          <div class="md:text-right">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Tagihan</p>
            <p class="font-extrabold text-slate-900 text-lg mt-0.5 tabular-nums font-mono">${formatRupiah(order.total)}</p>
            <div class="flex items-center md:justify-end gap-1.5 mt-2">
              <button onclick="togglePaymentStatus('${order.id}')" title="Klik untuk mengubah status pembayaran Lunas / Belum Lunas" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition shadow-2xs hover:scale-105 active:scale-95 ${order.isPaid ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200'}">
                <span class="w-2 h-2 rounded-full ${order.isPaid ? 'bg-emerald-600' : 'bg-rose-600'}"></span>
                <span>${order.isPaid ? 'LUNAS' : 'BELUM LUNAS'}</span>
                <span class="text-[10px] text-slate-500 font-normal underline decoration-dotted ml-0.5">(Klik ubah)</span>
              </button>
              <span class="text-xs text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">${order.paymentMethod}</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-1.5">Estimasi: <span class="font-medium text-slate-600">${formatDate(order.estimatedDate)}</span></p>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between pt-3.5 border-t border-slate-100 gap-2">
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="sendInvoiceWA('${order.id}')" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition active:scale-98">
              <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Kirim Nota WA</span>
            </button>

            <button onclick="openEditOrderModal('${order.id}')" title="Edit Transaksi, Rincian Layanan & Tarif" class="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition shadow-2xs active:scale-98">
              <svg class="w-4 h-4 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path></svg>
              <span>Edit Nota</span>
            </button>

            <button onclick="sendReadyWA('${order.id}')" class="inline-flex items-center gap-1.5 ${isReady ? 'bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'} text-xs px-3.5 py-2.5 rounded-xl transition active:scale-98">
              <svg class="w-3.5 h-3.5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg>
              <span>Notifikasi Selesai</span>
            </button>

            <button onclick="openLiveTracking('${order.id}')" class="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition shadow-2xs">
              <svg class="w-3.5 h-3.5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg>
              <span>Lacak Publik</span>
            </button>
          </div>

          <div class="flex items-center gap-1.5">
            <button onclick="printReceipt('${order.id}')" title="Cetak Struk Thermal" class="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition">
              <svg class="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24-1.077.538-2.079 1.64-2.079h7.28c1.102 0 1.88 1.002 1.64 2.079l-.544 2.45A1.5 1.5 0 0115.27 17.5H8.73a1.5 1.5 0 01-1.465-1.221l-.545-2.45zM6 8.25h12M6 8.25A2.25 2.25 0 003.75 10.5v4.5A2.25 2.25 0 006 17.25h.75v-1.5H6a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h12a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.75v1.5H18a2.25 2.25 0 002.25-2.25v-4.5A2.25 2.25 0 0018 8.25m-12 0V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v2.25"></path></svg>
            </button>
            <button onclick="deleteOrder('${order.id}')" title="Hapus Transaksi" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition">
              <svg class="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// CRM / Customer Management
function renderCustomers() {
  const container = document.getElementById('customers-container');
  const customerMap = {};

  state.orders.forEach(o => {
    const key = o.customerPhone ? o.customerPhone : o.customerName;
    if (!customerMap[key]) {
      customerMap[key] = {
        name: o.customerName,
        phone: o.customerPhone,
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: o.createdAt,
      };
    }
    customerMap[key].totalOrders += 1;
    customerMap[key].totalSpent += Number(o.total || 0);
    if (new Date(o.createdAt) > new Date(customerMap[key].lastOrder)) {
      customerMap[key].lastOrder = o.createdAt;
    }
  });

  const list = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent);
  document.getElementById('crm-total-count').textContent = list.length;

  if (list.length === 0) {
    container.innerHTML = `<p class="text-slate-400 text-xs py-8 text-center">Belum ada riwayat pelanggan terdaftar.</p>`;
    return;
  }

  container.innerHTML = list.map((c, idx) => `
    <tr class="border-b border-slate-100 hover:bg-slate-50/60 transition text-xs">
      <td class="py-3 px-4 font-medium text-slate-400 font-mono">${idx + 1}</td>
      <td class="py-3 px-4 font-bold text-slate-800">${c.name}</td>
      <td class="py-3 px-4 text-slate-600 font-mono">${c.phone || '-'}</td>
      <td class="py-3 px-4 font-semibold text-slate-700">${c.totalOrders} Transaksi</td>
      <td class="py-3 px-4 font-bold text-slate-900">${formatRupiah(c.totalSpent)}</td>
      <td class="py-3 px-4 text-slate-400">${formatDate(c.lastOrder)}</td>
      <td class="py-3 px-4 text-right">
        <button onclick="openWhatsApp('${c.phone}', 'Halo Kak ${c.name}, terima kasih telah menjadi pelanggan setia ${state.settings.storeName}. Ada yang bisa kami bantu hari ini?')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-semibold border border-emerald-200/60 transition">
          <svg class="w-3.5 h-3.5 fill-current shrink-0 text-emerald-600" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Chat WA</span>
        </button>
      </td>
    </tr>
  `).join('');
}

// Expenses & Financial Book
function renderExpenses() {
  const container = document.getElementById('expenses-container');
  const totalExpense = state.expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  // Total Pendapatan (Omzet) HANYA dari transaksi yang SUDAH LUNAS
  const allOmzet = state.orders.filter(o => o.isPaid).reduce((acc, curr) => acc + Number(curr.total || 0), 0);
  const netProfit = allOmzet - totalExpense;

  const omzetEl = document.getElementById('stat-today-omzet-2');
  if (omzetEl) omzetEl.textContent = formatRupiah(allOmzet);

  const expenseEl = document.getElementById('expense-total-display');
  if (expenseEl) expenseEl.textContent = formatRupiah(totalExpense);

  const netProfitEl = document.getElementById('stat-net-profit');
  if (netProfitEl) {
    netProfitEl.textContent = formatRupiah(netProfit);
    netProfitEl.className = `text-2xl font-extrabold mt-1 tabular-nums tracking-tight ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`;
  }

  if (state.expenses.length === 0) {
    container.innerHTML = `<p class="text-slate-400 text-xs py-8 text-center">Belum ada catatan pengeluaran operasional.</p>`;
    return;
  }

  container.innerHTML = state.expenses.map(exp => `
    <div class="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-800 text-sm">${exp.description}</span>
          <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[11px]">${exp.category}</span>
        </div>
        <p class="text-[11px] text-slate-400 mt-0.5">${formatDate(exp.date)}</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-bold text-slate-900 text-sm font-mono">${formatRupiah(exp.amount)}</span>
        <button onclick="deleteExpense('${exp.id}')" title="Hapus Pengeluaran" class="text-slate-400 hover:text-rose-600 p-1 rounded">
          <svg class="w-4 h-4 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function handleExpenseSubmit(e) {
  e.preventDefault();
  const desc = document.getElementById('exp-desc').value.trim();
  const cat = document.getElementById('exp-cat').value;
  const amount = parseFloat(document.getElementById('exp-amount').value) || 0;

  if (!desc || amount <= 0) return;

  const newExp = {
    id: 'EXP-' + Math.floor(100 + Math.random() * 900),
    date: new Date().toISOString(),
    category: cat,
    description: desc,
    amount: amount,
  };

  state.expenses.unshift(newExp);
  saveExpenses();
  document.getElementById('expense-form').reset();
  renderStats();
  renderExpenses();
}

function deleteExpense(id) {
  if (confirm('Hapus catatan pengeluaran ini?')) {
    state.expenses = state.expenses.filter(e => e.id !== id);
    saveExpenses();
    renderStats();
    renderExpenses();
  }
}

// Public Order Tracking Portal
function openLiveTracking(orderId) {
  switchTab('tracking');
  document.getElementById('tracking-search-input').value = orderId;
  executePublicTrack(orderId);
}

function executePublicTrack(query) {
  const resultCard = document.getElementById('tracking-result-card');
  const notFoundCard = document.getElementById('tracking-notfound-card');

  if (!query) {
    resultCard.classList.add('hidden');
    notFoundCard.classList.add('hidden');
    return;
  }

  const cleanQ = query.trim().toUpperCase().replace('#', '');
  const matched = state.orders.find(o => 
    o.id.toUpperCase() === cleanQ || 
    (o.customerPhone && formatPhoneWA(o.customerPhone).includes(cleanQ))
  );

  if (!matched) {
    resultCard.classList.add('hidden');
    notFoundCard.classList.remove('hidden');
    return;
  }

  notFoundCard.classList.add('hidden');
  resultCard.classList.remove('hidden');

  document.getElementById('track-order-id').textContent = '#' + matched.id;
  document.getElementById('track-date').textContent = formatDate(matched.createdAt);
  document.getElementById('track-customer-name').textContent = matched.customerName;
  document.getElementById('track-total-amount').textContent = formatRupiah(matched.total);
  document.getElementById('track-pay-status').textContent = matched.isPaid ? 'LUNAS' : 'BELUM LUNAS';
  document.getElementById('track-est-done').textContent = formatDate(matched.estimatedDate);
  document.getElementById('track-outlet-name').textContent = state.settings.storeName;
  document.getElementById('track-outlet-address').textContent = state.settings.address;

  // Render Items in Tracking Card
  const itemsContainer = document.getElementById('track-items-list');
  itemsContainer.innerHTML = (matched.items || []).map(i => `
    <div class="flex justify-between py-1 text-xs border-b border-slate-100 last:border-none">
      <span class="text-slate-700 font-medium">${i.name} (${i.qty} ${i.unit})</span>
      <span class="text-slate-900 font-bold font-mono">${formatRupiah(i.subtotal)}</span>
    </div>
  `).join('');

  // Update Visual Progress Steps (1 to 5)
  const stepNumber = STATUS_CONFIG[matched.status]?.step || 1;
  const steps = [
    { num: 1, title: 'Diterima di Outlet', desc: 'Nota transaksi diterbitkan' },
    { num: 2, title: 'Sedang Dicuci', desc: 'Proses pencucian & higienisasi' },
    { num: 3, title: 'Sedang Disetrika', desc: 'Penyetrikaan rapi & pewangi' },
    { num: 4, title: 'Siap Diambil', desc: 'Dikemas rapi & siap di outlet' },
    { num: 5, title: 'Selesai', desc: 'Telah diserahkan ke pelanggan' },
  ];

  const stepsHtml = steps.map(s => {
    const isDone = s.num < stepNumber;
    const isCurrent = s.num === stepNumber;
    return `
      <div class="flex items-start gap-3">
        <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-slate-900 text-white ring-4 ring-slate-100' : 'bg-slate-100 text-slate-400'}">
          ${isDone ? '✓' : s.num}
        </div>
        <div>
          <p class="text-xs font-bold ${isCurrent ? 'text-slate-900 font-extrabold' : isDone ? 'text-emerald-800' : 'text-slate-400'}">${s.title}</p>
          <p class="text-[11px] text-slate-500">${s.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('track-steps-container').innerHTML = stepsHtml;

  // Contact Outlet WA
  const waBtn = document.getElementById('track-contact-wa');
  waBtn.onclick = () => {
    openWhatsApp(state.settings.phone, `Halo ${state.settings.storeName}, saya ingin menanyakan status pesanan saya dengan nomor nota #${matched.id}.`);
  };
}

// Multi-Item Order Form Logic
function initOrderFormItems() {
  state.formItems = [
    { serviceId: 'komplit-reg', name: 'Cuci Komplit Reguler (2 Hari)', qty: 1, unit: 'Kg', price: 0, subtotal: 0 }
  ];
  renderFormItems();
}

function addFormItemRow() {
  state.formItems.push({
    serviceId: 'komplit-reg',
    name: 'Cuci Komplit Reguler (2 Hari)',
    qty: 1,
    unit: 'Kg',
    price: 0,
    subtotal: 0
  });
  renderFormItems();
}

function removeFormItemRow(index) {
  if (state.formItems.length <= 1) return;
  state.formItems.splice(index, 1);
  renderFormItems();
}

function updateFormItem(index, key, val) {
  const item = state.formItems[index];
  if (!item) return;

  if (key === 'serviceId') {
    const s = SERVICES.find(srv => srv.id === val);
    if (s) {
      item.serviceId = s.id;
      item.name = s.name;
      item.unit = s.unit;
      if (s.price > 0) {
        item.price = s.price;
      }
    }
    renderFormItems();
    return;
  }

  if (key === 'qty') {
    item.qty = parseFloat(val) || 0;
  } else if (key === 'price') {
    item.price = parseFloat(val) || 0;
  }

  item.subtotal = item.qty * item.price;

  // Realtime update of subtotal and grand total without full innerHTML replacement
  // to preserve keyboard focus while user is typing
  const subtotalEl = document.getElementById(`form-item-subtotal-${index}`);
  if (subtotalEl) {
    subtotalEl.textContent = formatRupiah(item.subtotal);
  }
  const grandTotal = state.formItems.reduce((acc, i) => acc + i.subtotal, 0);
  const totalPreviewEl = document.getElementById('new-order-total-preview');
  if (totalPreviewEl) {
    totalPreviewEl.textContent = formatRupiah(grandTotal);
  }
}

function renderFormItems() {
  const container = document.getElementById('order-items-wrapper');
  if (!container) return;
  let grandTotal = 0;

  container.innerHTML = state.formItems.map((item, idx) => {
    grandTotal += item.subtotal;
    const serviceOptions = SERVICES.map(s => `
      <option value="${s.id}" ${s.id === item.serviceId ? 'selected' : ''}>${s.name} (${s.unit})</option>
    `).join('');

    return `
      <div class="grid grid-cols-12 gap-2 items-center p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 transition hover:border-slate-300">
        <div class="col-span-5">
          <select onchange="updateFormItem(${idx}, 'serviceId', this.value)" class="w-full text-xs py-2 px-2.5 border border-slate-200 rounded-lg bg-white font-medium focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:outline-none transition">
            ${serviceOptions}
          </select>
        </div>
        <div class="col-span-2">
          <input type="number" step="0.1" min="0.1" value="${item.qty || ''}" placeholder="1" oninput="updateFormItem(${idx}, 'qty', this.value)" class="w-full text-xs py-2 px-1 border border-slate-200 rounded-lg bg-white font-mono font-bold text-center focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:outline-none transition">
        </div>
        <div class="col-span-2">
          <input type="number" step="500" min="0" value="${item.price > 0 ? item.price : ''}" placeholder="0" oninput="updateFormItem(${idx}, 'price', this.value)" class="w-full text-xs py-2 px-2 border border-slate-200 rounded-lg bg-white font-mono text-right focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:outline-none transition">
        </div>
        <div id="form-item-subtotal-${idx}" class="col-span-2 text-right font-mono font-bold text-xs text-slate-900 tabular-nums">
          ${formatRupiah(item.subtotal)}
        </div>
        <div class="col-span-1 text-center">
          <button type="button" onclick="removeFormItemRow(${idx})" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Hapus Baris">
            <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  const totalPreviewEl = document.getElementById('new-order-total-preview');
  if (totalPreviewEl) {
    totalPreviewEl.textContent = formatRupiah(grandTotal);
  }
}

// User Actions
function updateOrderStatus(id, newStatus) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  order.status = newStatus;
  saveOrders();

  if (newStatus === 'ready') {
    if (confirm(`Status pesanan ${order.customerName} telah diubah menjadi SIAP DIAMBIL. Kirim notifikasi WhatsApp ke pelanggan sekarang?`)) {
      sendReadyWA(id);
    }
  }
}

function togglePaymentStatus(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  order.isPaid = !order.isPaid;
  saveOrders();
}

function deleteOrder(id) {
  if (confirm(`Hapus transaksi #${id}? Tindakan ini tidak dapat dibatalkan.`)) {
    state.orders = state.orders.filter(o => o.id !== id);
    saveOrders();
  }
}

function sendInvoiceWA(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  const msg = buildInvoiceMessage(order, state.settings);
  openWhatsApp(order.customerPhone, msg);
}

function sendReadyWA(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  const msg = buildReadyMessage(order, state.settings);
  openWhatsApp(order.customerPhone, msg);
}

function setFilter(filter) {
  state.currentFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(el => {
    if (el.dataset.filter === filter) {
      el.className = 'filter-tab px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white shadow-xs transition';
    } else {
      el.className = 'filter-tab px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition';
    }
  });
  renderOrders();
}

// Export CSV for Excel/Spreadsheets
function exportCSV() {
  const headers = ['No Nota', 'Tanggal', 'Nama Pelanggan', 'No WhatsApp', 'Total Biaya', 'Status Bayar', 'Metode Bayar', 'Status Cucian', 'Rincian Item'];
  const rows = state.orders.map(o => {
    const itemsSummary = (o.items || []).map(i => `${i.name} (${i.qty} ${i.unit})`).join('; ');
    return [
      `"${o.id}"`,
      `"${formatDate(o.createdAt)}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone || ''}"`,
      o.total,
      o.isPaid ? '"Lunas"' : '"Belum Lunas"',
      `"${o.paymentMethod}"`,
      `"${STATUS_CONFIG[o.status]?.label || o.status}"`,
      `"${itemsSummary.replace(/"/g, '""')}"`,
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laporan_transaksi_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Thermal Receipt with Dynamic QR Code
function printReceipt(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;

  document.getElementById('receipt-store-name').textContent = state.settings.storeName;
  document.getElementById('receipt-store-tagline').textContent = state.settings.tagline;
  document.getElementById('receipt-store-address').textContent = state.settings.address;
  document.getElementById('receipt-store-phone').textContent = 'Kontak: ' + state.settings.phone;

  document.getElementById('receipt-order-id').textContent = '#' + order.id;
  document.getElementById('receipt-date').textContent = formatDate(order.createdAt);
  document.getElementById('receipt-cust-name').textContent = order.customerName;
  document.getElementById('receipt-cust-phone').textContent = order.customerPhone || '-';

  const itemsHtml = (order.items || []).map(i => `
    <div class="py-1 border-b border-dashed border-slate-200">
      <div class="font-bold">${i.name}</div>
      <div class="flex justify-between text-slate-600">
        <span>${i.qty} ${i.unit} &times; ${formatRupiah(i.price)}</span>
        <span class="font-bold text-slate-900">${formatRupiah(i.subtotal)}</span>
      </div>
    </div>
  `).join('');
  document.getElementById('receipt-items-container').innerHTML = itemsHtml;

  document.getElementById('receipt-total').textContent = formatRupiah(order.total);
  document.getElementById('receipt-pay-status').textContent = order.isPaid ? 'LUNAS' : 'BELUM LUNAS';
  document.getElementById('receipt-pay-method').textContent = order.paymentMethod;
  document.getElementById('receipt-est-date').textContent = formatDate(order.estimatedDate);
  document.getElementById('receipt-footer-note').textContent = state.settings.footerNote;

  // Render QR Code linking to tracking
  const qrContainer = document.getElementById('receipt-qrcode');
  qrContainer.innerHTML = '';
  const trackingUrl = `${window.location.origin}${window.location.pathname}?track=${order.id}`;
  if (window.QRCode) {
    new QRCode(qrContainer, {
      text: trackingUrl,
      width: 80,
      height: 80,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  const modal = document.getElementById('thermal-receipt-modal');
  modal.classList.remove('hidden');
}

function closeReceiptModal() {
  document.getElementById('thermal-receipt-modal').classList.add('hidden');
}

// Order Form Submission (Create or Edit)
function handleOrderSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('order-edit-id')?.value;
  const customerName = document.getElementById('new-order-name').value.trim();
  const customerPhone = document.getElementById('new-order-phone').value.trim();
  const paymentMethod = document.getElementById('new-order-pay-method').value;
  const isPaid = document.getElementById('new-order-is-paid').checked;
  const notes = document.getElementById('new-order-notes').value.trim();
  const estimatedDateVal = document.getElementById('new-order-est-date').value;
  const estimatedDate = estimatedDateVal ? new Date(estimatedDateVal).toISOString() : new Date(Date.now() + 48 * 3600 * 1000).toISOString();
  const autoSendWA = document.getElementById('new-order-auto-wa').checked;

  const total = state.formItems.reduce((acc, i) => acc + i.subtotal, 0);

  if (editId) {
    const order = state.orders.find(o => o.id === editId);
    if (order) {
      order.customerName = customerName;
      order.customerPhone = customerPhone;
      order.items = JSON.parse(JSON.stringify(state.formItems));
      order.total = total;
      order.paymentMethod = paymentMethod;
      order.isPaid = isPaid;
      order.notes = notes;
      order.estimatedDate = estimatedDate;

      saveOrders();
      closeNewOrderModal();

      if (autoSendWA) {
        sendInvoiceWA(order.id);
      }
      return;
    }
  }

  // New Order Creation
  const newId = 'LND-' + Math.floor(1000 + Math.random() * 9000);
  const newOrder = {
    id: newId,
    customerName,
    customerPhone,
    items: JSON.parse(JSON.stringify(state.formItems)),
    total,
    status: 'pending',
    paymentMethod,
    isPaid,
    notes,
    createdAt: new Date().toISOString(),
    estimatedDate,
  };

  state.orders.unshift(newOrder);
  saveOrders();
  closeNewOrderModal();

  if (autoSendWA) {
    sendInvoiceWA(newId);
  }
}

// Modal Controls
function openNewOrderModal() {
  const titleEl = document.getElementById('order-modal-title');
  const badgeEl = document.getElementById('order-modal-badge');
  const subtitleEl = document.getElementById('order-modal-subtitle');
  const editIdEl = document.getElementById('order-edit-id');
  const btnTextEl = document.getElementById('order-submit-btn-text');

  if (titleEl) titleEl.textContent = 'Catat Transaksi Laundry Baru';
  if (badgeEl) badgeEl.textContent = 'Multi-Item';
  if (subtitleEl) subtitleEl.textContent = 'Dukungan beberapa jenis layanan dalam satu nota transaksi.';
  if (editIdEl) editIdEl.value = '';
  if (btnTextEl) btnTextEl.textContent = 'Simpan Transaksi';

  document.getElementById('new-order-form').reset();
  const autoWaEl = document.getElementById('new-order-auto-wa');
  if (autoWaEl) autoWaEl.checked = true;

  initOrderFormItems();
  
  const est = new Date(Date.now() + 48 * 3600 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('new-order-est-date').value = `${est.getFullYear()}-${pad(est.getMonth()+1)}-${pad(est.getDate())}T${pad(est.getHours())}:${pad(est.getMinutes())}`;

  document.getElementById('new-order-modal').classList.remove('hidden');
}

function openEditOrderModal(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const titleEl = document.getElementById('order-modal-title');
  const badgeEl = document.getElementById('order-modal-badge');
  const subtitleEl = document.getElementById('order-modal-subtitle');
  const editIdEl = document.getElementById('order-edit-id');
  const btnTextEl = document.getElementById('order-submit-btn-text');

  if (titleEl) titleEl.textContent = `Edit Transaksi #${order.id}`;
  if (badgeEl) badgeEl.textContent = 'Edit Mode';
  if (subtitleEl) subtitleEl.textContent = 'Perbarui nama pelanggan, nomor WA, rincian item layanan, tarif, status bayar, atau estimasi.';
  if (editIdEl) editIdEl.value = order.id;
  if (btnTextEl) btnTextEl.textContent = 'Simpan Perubahan';

  document.getElementById('new-order-name').value = order.customerName || '';
  document.getElementById('new-order-phone').value = order.customerPhone || '';
  document.getElementById('new-order-pay-method').value = order.paymentMethod || 'Tunai';
  document.getElementById('new-order-is-paid').checked = !!order.isPaid;
  document.getElementById('new-order-notes').value = order.notes || '';
  
  if (order.estimatedDate) {
    const est = new Date(order.estimatedDate);
    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('new-order-est-date').value = `${est.getFullYear()}-${pad(est.getMonth()+1)}-${pad(est.getDate())}T${pad(est.getHours())}:${pad(est.getMinutes())}`;
  }

  // Load existing items into state.formItems
  state.formItems = JSON.parse(JSON.stringify(order.items || []));
  if (state.formItems.length === 0) {
    state.formItems = [
      { serviceId: 'komplit-reg', name: 'Cuci Komplit Reguler (2 Hari)', qty: 1, unit: 'Kg', price: 0, subtotal: 0 }
    ];
  }
  renderFormItems();

  const autoWaEl = document.getElementById('new-order-auto-wa');
  if (autoWaEl) autoWaEl.checked = false;

  document.getElementById('new-order-modal').classList.remove('hidden');
}

function closeNewOrderModal() {
  document.getElementById('new-order-modal').classList.add('hidden');
}

function openSettingsModal() {
  document.getElementById('setting-name').value = state.settings.storeName;
  document.getElementById('setting-tagline').value = state.settings.tagline;
  document.getElementById('setting-address').value = state.settings.address;
  document.getElementById('setting-phone').value = state.settings.phone;
  document.getElementById('setting-footer').value = state.settings.footerNote;
  document.getElementById('settings-modal').classList.remove('hidden');
}

function closeSettingsModal() {
  document.getElementById('settings-modal').classList.add('hidden');
}

function handleSettingsSubmit(e) {
  e.preventDefault();
  const updated = {
    storeName: document.getElementById('setting-name').value.trim() || DEFAULT_SETTINGS.storeName,
    tagline: document.getElementById('setting-tagline').value.trim(),
    address: document.getElementById('setting-address').value.trim(),
    phone: document.getElementById('setting-phone').value.trim(),
    footerNote: document.getElementById('setting-footer').value.trim(),
  };
  saveSettings(updated);
  closeSettingsModal();
}

function renderApp() {
  renderStats();
  renderOrders();
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderHeader();
  renderApp();

  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderOrders();
  });

  document.getElementById('new-order-form').addEventListener('submit', handleOrderSubmit);
  document.getElementById('settings-form').addEventListener('submit', handleSettingsSubmit);
  document.getElementById('expense-form').addEventListener('submit', handleExpenseSubmit);

  // Check URL query parameters for public tracking: ?track=LND-1001
  const urlParams = new URLSearchParams(window.location.search);
  const trackId = urlParams.get('track');
  if (trackId) {
    openLiveTracking(trackId);
  }
});
