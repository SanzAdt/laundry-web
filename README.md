# 🧺 LaundryFlow - POS & Notifikasi WhatsApp Laundry (MVP)

Aplikasi Web Point of Sales (POS) dan Notifikasi Otomatis WhatsApp untuk bisnis laundry kiloan/satuan. Didesain khusus untuk solo founder yang ingin memvalidasi produk ke pemilik laundry lokal dengan **biaya Rp 0**.

---

## 🌟 Fitur Utama

1. **Dashboard Kasir Cepat & Responsif**:
   - Tampilan optimal di layar HP Android/iOS kasir maupun laptop/tablet.
   - Ringkasan harian: Total Cucian Aktif, Siap Diambil, Timbangan Hari Ini (Kg), dan Omzet Hari Ini (Rp).
2. **Kirim Nota Masuk WhatsApp 1-Klik**:
   - Menghasilkan pesan nota rapi berformat WhatsApp yang langsung terbuka di aplikasi WhatsApp kasir.
   - Tanpa biaya langganan API WhatsApp resmi (menggunakan protokol `wa.me`).
3. **Notifikasi "Cucian Siap Diambil" 1-Klik**:
   - Begitu status cucian diubah ke "Siap Diambil", kasir bisa langsung klik 1 tombol untuk memberi tahu pelanggan bahwa pakaian mereka sudah bersih, wangi, dan siap diambil.
4. **Cetak Struk Thermal (58mm / 80mm)**:
   - Dukungan cetak struk mini untuk printer kasir thermal Bluetooth atau USB.
5. **Penyimpanan Lokal (Offline-First)**:
   - Data otomatis tersimpan di `localStorage` peramban, dilengkapi fitur Backup Data (JSON) dan Reset Demo.

---

## 🚀 Cara Menjalankan Aplikasi

### Cara 1: Langsung Buka di Browser (Paling Mudah)
Cukup buka file `index.html` langsung dengan klik dua kali di Windows Explorer, atau buka browser dan arahkan ke:
```
file:///C:/Users/MyLaptop/.gemini/antigravity/scratch/laundry-pos/index.html
```

### Cara 2: Menjalankan Server Lokal (Node.js)
Buka terminal PowerShell di folder ini, lalu jalankan:
```bash
npx serve .
```
Lalu buka peramban di `http://localhost:3000`.

---

## ☁️ Cara Deploy Gratis ke Vercel (1 Menit)

1. Buat akun gratis di [Vercel](https://vercel.com) (login pakai akun GitHub).
2. Buat repositori baru di GitHub Anda dan upload folder `laundry-pos` ini.
3. Di Vercel Dashboard, klik **"Add New Project"** $\rightarrow$ pilih repositori tersebut $\rightarrow$ klik **"Deploy"**.
4. Dalam 30 detik, aplikasi Anda sudah live dengan URL publik gratis seperti: `https://laundry-flow-anda.vercel.app`!

---

## 💬 Skrip WhatsApp untuk Demo ke Pemilik Laundry

Ketika menghubungi pemilik laundry di Google Maps:

> *"Halo Kak, salam kenal. Saya [Nama], software developer dari [Kota Anda].*  
> *Saya baru buat web kasir simpel khusus laundry yang bisa **kirim nota & notifikasi 'cucian sudah wangi & siap diambil' otomatis ke WhatsApp pelanggan** tanpa kertas nota lagi.*  
> *Saya mau bantu pasangkan di laundry Kakak **gratis 100%** buat bantu operasional di sana. Ini link demonya: [Link Vercel Anda]. Boleh dicoba-coba dulu Kak 🙏"*
