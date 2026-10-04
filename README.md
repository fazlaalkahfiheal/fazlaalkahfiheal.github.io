# Portfolio — Fazla Al Kahfi

Portfolio pribadi untuk mahasiswa Ilmu Komputer. Dibuat dengan **HTML5, CSS3, dan JavaScript**
murni tanpa framework dan tanpa backend, sehingga bisa langsung dibuka dengan klik dua kali
pada `index.html`.

- **Nama:** Fazla Al Kahfi
- **Program Studi:** Ilmu Komputer
- **Universitas:** Universitas Yatsi Madani
- **Tahun:** 2026

## Menjalankan

Cukup buka `index.html` di browser. Tidak perlu server, build step, atau `npm install`.

```bash
# opsional: jalankan lewat server lokal bila perlu
python -m http.server 8000
# lalu buka http://localhost:8000
```

> Membuka langsung via `file://` sudah berfungsi penuh. Server lokal hanya berguna bila
> nanti Anda menambahkan modul JavaScript (`type="module"`) atau request API.

## Struktur Folder

```
portofolio_fazla/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── .gitignore
├── assets/
│   ├── profile.jpg
│   ├── cv.pdf
│   └── projects/
│       ├── sitani.png
│       ├── smartfit.png
│       ├── animasi-2d.png
│       └── arduino-security.png
└── README.md
```

## Struktur Halaman

| Section      | Isi                                                          |
| ------------ | ------------------------------------------------------------ |
| Navbar       | Logo "Fazla.", 6 menu, tombol CV, hamburger di mobile         |
| Hero         | Sapaan, nama, deskripsi, 2 tombol, foto lingkaran, meta singkat |
| Tentang Saya | Deskripsi dua kolom + kartu informasi + 3 statistik          |
| Keahlian Saya| 6 kartu keahlian: Web, Pemrograman, Basis Data, AI, Perangkat, IoT |
| Proyek       | 1 kartu besar + 3 kartu proyek dengan gambar dan tag teknologi |
| Pendidikan   | Timeline pendidikan 2023 — Sekarang                          |
| Kontak       | 3 kartu kontak (WhatsApp, Instagram, Email) + tombol Unduh CV  |
| Footer       | Copyright dengan tahun otomatis + ikon sosial                |

## Design System

Semua token warna, radius, dan font berada di `:root` pada bagian atas `style.css`.

| Token        | Nilai                        | Dipakai untuk            |
| ------------ | ---------------------------- | ------------------------ |
| `--bg`       | `#070b14`                    | Latar utama (dark mode)  |
| `--cyan`     | `#22d3ee`                    | Aksen utama, highlight   |
| `--blue`     | `#4f8cff`                    | Aksen sekunder           |
| `--violet`   | `#8b7cff`                    | Aksen tersier, gradient  |
| `--grad`     | linear gradient 120°         | Tombol, judul, statistik |
| `--line`     | `rgba(255,255,255,.09)`      | Border card              |
| `--surface`  | `rgba(255,255,255,.04)`      | Isi card (glassmorphism) |

**Font:** Space Grotesk (judul), Inter (isi), JetBrains Mono (label kecil).
Dimuat dari Google Fonts. Bila offline, browser akan memakai font sistem sebagai cadangan.

**Ikon:** Bootstrap Icons 1.11.3 via jsDelivr.

## Yang Perlu Anda Ganti

Data yang sudah terisi:

| Item                    | File                | Nilai                                  |
| ----------------------- | ------------------- | -------------------------------------- |
| Foto profil             | `assets/profile.jpg`| Foto asli                              |
| CV                      | `assets/cv.pdf`     | File CV Anda sendiri                   |
| Screenshot proyek       | `assets/projects/*.png` | Screenshot asli, format `.png`      |
| Link WhatsApp           | `index.html`        | `wa.me/6285692844770`                  |
| Link Instagram          | `index.html`        | `instagram.com/fazzheal`               |
| Alamat email            | `index.html`        | `mailto:fazlaalkahfi971@gmail.com`     |
| Link repository proyek  | `index.html`        | Belum ada — tombol menampilkan "Segera tersedia" |

### Menambahkan Link Repository Proyek

Repo proyek belum tersedia, jadi tiap kartu project menampilkan tombol non-klik
"Segera tersedia". Untuk mengaktifkannya, ganti satu `<span>` dengan `<a>`:

```html
<!-- sebelum -->
<span class="btn btn-outline btn-sm btn-disabled" aria-disabled="true">
  <i class="bi bi-hourglass-split" aria-hidden="true"></i> Segera tersedia
</span>

<!-- sesudah -->
<a href="https://github.com/fazlaalkahfiheal/nama-repo" class="btn btn-outline btn-sm"
   target="_blank" rel="noopener noreferrer">
  <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> Lihat Proyek
</a>
```

Kelas `btn-disabled` di `style.css` bisa dihapus setelah tidak ada tombol non-klik lagi.

> Catatan: gambar project berformat `.png`. Kalau kamu ganti ke format lain,
> pastikan nama file di `index.html` ikut disesuaikan. Kalau file gambar dihapus,
> halaman **tidak akan rusak** — `onerror="this.remove()"` + CSS gradient
> membuat fallback transparan tetap tampil rapi.

## Menyesuaikan Konten

### Skill

Tambah atau hapus `<li>` di dalam `.skill-tags`. Tak perlu orderly atau nilai persentase:

```html
<li><i class="bi bi-filetype-rust" aria-hidden="true"></i> Rust</li>
```

### Project

Duplikat satu `<article class="project-card">`. Pastikan nama file gambar ada di
`assets/projects/`.

### Warna Aksen

Ganti satu blok ini di `:root`, seluruh aksen website ikut berubah:

```css
--cyan: #22d3ee;
--blue: #4f8cff;
```

## Fungsi JavaScript

`script.js` sengaja dibuat ramping, hanya menangani:

1. Tahun footer otomatis
2. Efek navbar saat halaman di-scroll
3. Buka/tutup navbar mobile + tutup otomatis saat klik di luar
4. Smooth scrolling dengan kompensasi tinggi navbar
5. Reveal animation saat section masuk viewport (`IntersectionObserver`)
6. Active navigation highlighting
7. Spotlight effect pada kartu kontak

Tidak ada dependency, tidak ada `fetch`, tidak ada storage.

## Responsive

| Breakpoint | Perilaku                                                            |
| ---------- | ------------------------------------------------------------------- |
| ≥1200px    | Hero 2 kolom, skills 3 kolom, 3 project dalam 1 baris              |
| ≤991px     | Hero 1 kolom dan rata tengah, navbar jadi hamburger, skills 2 kolom |
| ≤767px     | Semua grid 1 kolom, timeline & card dirapatkan padding lebih rapat  |
| ≤400px     | Tombol hero full-width, avatar mengecil, typography turun 1 poin    |

Sudah diuji pada 1920, 1440, 1366, 768, 430, 390, dan 360 px.

## Accessibility

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `ol`/`dl`
- `skip-link` untuk lompat ke konten utama
- `aria-label` pada tombol icon dan link social
- `aria-expanded` + `aria-controls` pada hamburger
- Alt text deskriptif pada semua gambar
- Fokus keyboard terlihat, `prefers-reduced-motion` dihormati
- Kontras teks memenuhi WCAG AA

## SEO

Sudah diatur di `<head>`:

- `<title>`, `meta description`, `keywords`, `author`
- Open Graph lengkap (`og:title`, `og:description`, `og:url`, `og:image`, `og:locale`)
- Twitter Card (`summary`)
- `<link rel="canonical">`
- JSON-LD `schema.org/Person` (nama, afiliasi, email, `sameAs`, `knowsAbout`)
- Favicon SVG inline

File pendukung crawler di root repo:

| File           | Fungsi                                              |
| -------------- | --------------------------------------------------- |
| `robots.txt`   | Mengizinkan crawling + menunjuk ke sitemap         |
| `sitemap.xml`  | Peta URL untuk Google Search Console                |
| `.nojekyll`    | Mematikan Jekyll agar file/raw tidak dilewati       |

Semua URL di dalam file ini memakai domain `https://fazlaalkahfiheal.github.io`.
Kalau nama repository berubah, sesuaikan juga `canonical`, `og:url`, `robots.txt`,
dan `sitemap.xml`.

## Deploy ke GitHub Pages

Domain publish: `https://fazlaalkahfiheal.github.io`

Karena repo ini berisi HTML statis di root, cukup publish langsung dari branch —
tidak perlu build step.

1. Push repo ke GitHub
2. **Settings → Pages → Source: Deploy from a branch**
3. Pilih branch `master`, folder `/ (root)`
4. Tunggu ±1 menit sampai URL aktif

## Mendaftarkan ke Google Search Console

Supaya situs muncul di pencarian Google:

1. Buka <https://search.google.com/search-console>
2. **Add property → URL prefix** → masukkan `https://fazlaalkahfiheal.github.io`
3. Verifikasi pakai **HTML tag**: salin `<meta>` yang diberikan, lalu tempel ke
   dalam `<head>` pada `index.html`, lalu push ulang
4. **Sitemaps** → masukkan `sitemap.xml` → Submit
5. **URL Inspection** → tempel URL situs → **Request Indexing**

Perkiraan indeks: 3–7 hari setelah sitemap diterima, bisa lebih lama untuk situs baru.

## Catatan

- Belum ada pengalaman kerja formal, sertifikat, atau prestasi yang dicantumkan —
  Sengaja seluruh isi berfokus pada project, skill, pendidikan, dan proses belajar — tanpa data yang tidak diberikan.
- Tombol repository project masih non-klik karena repo-nya belum dipublikasikan.
- Screenshot project masih `.png` berukuran besar (±3,3 MB total);_optimasi ke WebP/JPG
  masih bisa dilakukan bila halaman terasa lambat.