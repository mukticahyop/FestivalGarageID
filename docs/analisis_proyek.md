# Analisis Proyek: Festival Garage ID

Dokumen ini berisi penjelasan mengenai fitur utama, teknologi (*tech stack*) yang digunakan, dan pelacakan data menggunakan Google Analytics pada proyek **Festival Garage ID**.

---

## 1. Fitur Utama Proyek

Festival Garage ID dirancang sebagai diler virtual modern yang memudahkan pengguna mendapatkan mobil langka dalam game **Forza Horizon 6 (FH6)**. Berikut adalah fitur-fitur utama yang diimplementasikan:

*   **Hero Section** ([Hero.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/Hero.tsx))
    *   Teks tagline dinamis yang berubah secara berkala (*Tanpa Grinding, Proses Cepat, 100% Aman*).
    *   Desain estetika modern bertema Jepang dengan tombol Call to Action (CTA) instan menuju WhatsApp dan Katalog.
*   **Trust Bar (Statistik Kepercayaan)** ([TrustBar.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/TrustBar.tsx))
    *   Menampilkan bukti kepuasan pelanggan secara ringkas seperti *100+ Transaksi Sukses*, *Respon < 5 Menit*, dan *Rating 5.0*.
*   **Katalog Mobil Terintegrasi** ([Catalog.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/Catalog.tsx))
    *   Menampilkan mobil langka FH6 beserta informasi tahun rilis, harga, tag edisi khusus (Seasonal, Unicorn, Tuner, Rare), dan status (*Ready* / *Limited*).
    *   Sistem penyaringan (filter) dinamis berdasarkan ketersediaan stok (*Semua*, *Ready*, *Limited*) dengan efek spring animasi.
*   **Panduan Cara Kerja** ([HowItWorks.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/HowItWorks.tsx))
    *   Penjelasan 3 langkah mudah: Pilih Mobil $\rightarrow$ Bayar $\rightarrow$ Mobil Masuk Garasi, untuk memberikan pemahaman bertransaksi yang aman kepada pelanggan baru.
*   **FAQ Accordion (Tanya Jawab)** ([Faq.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/Faq.tsx))
    *   Daftar pertanyaan yang sering diajukan mengenai keamanan akun, durasi transaksi, opsi pembayaran, dan pengerjaan pre-order.
*   **Tombol Navigasi Responsif & Kontak Terintegrasi**
    *   Navigasi desktop dan menu mobile ([Header.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/Header.tsx)) yang melacak posisi scroll layar pengguna secara dinamis.
    *   *Floating Action Button (FAB)* WhatsApp ([Footer.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/components/Footer.tsx)) di sudut bawah layar untuk memudahkan kontak admin kapan saja.

---

## 2. Teknologi (*Tech Stack*) yang Digunakan

Komponen teknologi utama yang membentuk website ini didefinisikan dalam berkas [package.json](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/package.json):

*   **Next.js** (v`16.2.10`): Framework utama berbasis React dengan optimalisasi server-side rendering, routing (App Router), dan penanganan aset.
*   **React** (v`19.2.4`): Library UI untuk membangun arsitektur komponen yang reaktif.
*   **TypeScript**: Menambahkan static typing ke JavaScript untuk mengurangi bug selama proses pengembangan.
*   **Framer Motion** (v`12.42.2`): Pustaka animasi tangguh untuk transisi state UI yang mulus (dynamic text swap, tab underlines, FAQ expand/collapse).
*   **Vanilla CSS** ([globals.css](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/app/globals.css)): Gaya desain murni menggunakan variabel CSS guna menjaga fleksibilitas dan visual bertema gelap (*dark mode aesthetics*) yang berkinerja tinggi.
*   **Google Analytics Integration** (`@next/third-parties/google`): Integrasi Google Analytics 4 (GA4) secara instan melalui tag bawaan Next.js.
*   **Outfit Font**: Tipografi modern berbobot tebal yang dimuat langsung dari Google Fonts melalui modul `next/font/google`.

---

## 3. Data yang Dikumpulkan oleh Google Analytics

Pelacakan Analytics diaktifkan secara global melalui file pembungkus utama [layout.tsx](file:///d:/Amikom/SEM%206/Digital%20Bussiness/festival-garage-id/src/app/layout.tsx). Selain metadata standar GA4 (tipe perangkat, browser, kota/negara akses kasar, durasi kunjungan), sistem juga melacak interaksi penting (**Custom Events**) pengguna menggunakan fungsi `sendGAEvent`:

### A. Custom Events yang Dilacak

| Nama Event | Pemicu (Interaksi Pengguna) | Parameter Tambahan | Tujuan Pelacakan |
| :--- | :--- | :--- | :--- |
| **`whatsapp_click`** | Pengguna menekan tombol redirect ke WhatsApp. | **`location`**: Posisi tombol diklik (`hero_cta`, `header_desktop`, `header_mobile`, `footer_socials`, `floating_action_button`, `cta_card`, `catalog_view_all`, atau `catalog_item`).<br>**`car_name`** *(opsional)*: Nama mobil yang dipesan. | Menganalisis tombol CTA mana yang paling efektif menghasilkan konversi chat. |
| **`social_click`** | Pengguna menekan tautan ke media sosial eksternal. | **`platform`**: Nama medsos (`instagram` atau `tiktok`).<br>**`location`**: Posisi tombol diklik (`footer_socials` atau `cta_card`). | Mengetahui ketertarikan pengguna terhadap profil sosial media brand. |
| **`catalog_filter`** | Pengguna menyaring produk mobil di katalog. | **`filter_type`**: Kategori filter yang dipilih (`ALL`, `READY`, atau `LIMITED`). | Memantau seberapa sering pengguna berinteraksi dengan saringan produk. |
| **`faq_open`** | Pengguna menekan / memperluas daftar FAQ untuk membaca jawaban. | **`faq_question`**: Teks pertanyaan lengkap yang dibuka. | Mengidentifikasi keraguan utama calon pembeli sebelum melakukan pemesanan. |

### B. Manfaat Pelacakan
Dengan kombinasi event di atas, pemilik bisnis dapat menganalisis:
1.  **Tingkat Konversi**: Membandingkan jumlah total pengunjung dengan jumlah klik ke WhatsApp (`whatsapp_click`).
2.  **Popularitas Produk**: Mengidentifikasi mobil Forza mana yang paling banyak diminati berdasarkan klik pada item katalog (`car_name`).
3.  **Hambatan Pembelian**: Menganalisis FAQ yang paling sering dibuka (`faq_open`) untuk terus memperjelas informasi produk dan menekan keraguan pembeli.
