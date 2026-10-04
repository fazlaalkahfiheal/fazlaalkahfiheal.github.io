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
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── profile.jpg
│   ├── cv.pdf
│   └── projects/
│       ├── sitani.jpg
│       ├── smartfit.jpg
│       ├── arduino-security.jpg
│       └── animasi-2d.jpg
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

Placeholder di repo ini sengaja dibuat netral supaya tidak ada data fiktif.
Ganti bagian berikut dengan data asli Anda:

| Item                    | File                | Nilai sekarang                     |
| ----------------------- | ------------------- | ---------------------------------- |
| Foto profil             | `assets/profile.jpg`| Foto asli (sudah terisi)          |
| CV                      | `assets/cv.pdf`     | File CV Anda sendiri              |
| Screenshot proyek      | `assets/projects/*.jpg` | Placeholder — ganti dengan tangkapan layar |
| Link WhatsApp           | `index.html`        | `href="#"`                         |
| Link Instagram          | `index.html`        | `href="#"`                         |
| Alamat email            | `index.html`        | `href="mailto:"`                   |
| Link repository proyek | `index.html`        | `href="#"`                         |

Format link yang bisa dipakai:

```
WhatsApp   https://wa.me/628XXXXXXXXX
Instagram  https://instagram.com/username
```

> Catatan: gambar hanya boleh berformat `.jpg` (huruf kecil). Kalau memakai `.png`,
> pastikan nama file di `index.html` ikut disesuaikan, atau konversi dulu:
> `python -c "from PIL import Image; im=Image.open('foto.png').convert('RGB'); im.thumbnail((720,720)); im.save('assets/profile.jpg', quality=90, optimize=True)"`

Mengganti gambar cukup dengan menaruh file dengan nama yang sama di folder yang sama.
Kalau file gambar dihapus, halaman **tidak akan rusak** — `onerror="this.remove()"` +
CSS gradient membuat fallback transparan tetap tampil rapi.

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

Title, meta description, keywords, Open Graph, dan favicon SVG inline sudah diatur di
`<head>`.

## Catatan

Belum ada pengalaman kerja formal, sertifikat, atau prestasi yang dicantumkan —
 Sengaja seluruh isi berfokus pada project, skill, pendidikan, dan proses belajar — tanpa data yang tidak diberikan.