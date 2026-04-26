# Card Name — Framework Guide

Panduan ini menjelaskan struktur proyek **card-name-main** menggunakan bahasa yang sederhana. Proyek ini menggunakan **Vite + React + TypeScript + TailwindCSS** — tapi kamu tidak perlu paham semuanya sekaligus. Anggap ini sebagai peta untuk navigasi.

---

## 0. Apa Bedanya dari Versi Asli (card-name-new)?

| card-name-new (asli) | card-name-main (framework) |
|---|---|
| 1 file `index.html` | HTML dipecah jadi **komponen React** (.tsx) |
| 1 file `style.css` | CSS tetap di `index.css` (hampir sama) |
| 1 file `script.js` | Logic JavaScript ditanam di **dalam komponen** React |
| Buka langsung di browser | Perlu `npm run dev` untuk menjalankan |

**Intinya**: Kode yang sama, tapi dipecah ke file-file kecil supaya lebih mudah dikelola.

---

## 1. Cara Menjalankan

```bash
# 1. Buka terminal di folder card-name-main
# 2. Install dependencies (sekali saja)
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser di:
#    http://localhost:8080/
```

Setiap kali kamu save file, browser otomatis refresh (ini namanya **Hot Module Replacement / HMR**).

---

## 2. Struktur Folder

```
card-name-main/
├── index.html              ← Entry point HTML (jangan ubah)
├── package.json            ← Daftar dependencies & scripts
├── vite.config.ts          ← Konfigurasi Vite (jangan ubah)
├── tailwind.config.ts      ← Konfigurasi TailwindCSS
│
├── public/                 ← File statis (langsung diakses di browser)
│   ├── cursor/             ← SVG cursor custom
│   ├── skills/             ← Gambar skill notch (PNG)
│   ├── projects/           ← Banner proyek (JPG, untuk thumbnail)
│   ├── profile.jpg         ← Foto profil
│   └── ghibli.mp4          ← Video background
│
├── src/                    ← KODE UTAMA — kamu kerja di sini
│   ├── main.tsx            ← Titik masuk aplikasi
│   ├── App.tsx             ← Setup routing & providers
│   ├── index.css           ← SEMUA styling (mirror dari style.css asli)
│   │
│   ├── assets/             ← Gambar & SVG yang di-import di kode
│   │   ├── airbnb-logo.svg          ← Logo Airbnb (untuk card)
│   │   ├── airbnb-logo-2.svg        ← Logo Airbnb (untuk modal)
│   │   ├── Figma-logo.svg           ← Logo Figma (tool item)
│   │   ├── Figma-Dark logo.svg      ← Logo Figma gelap (notch dock)
│   │   ├── cursor-ai-code-icon 1.svg ← Cursor AI (notch dock)
│   │   └── ... (semua SVG & banner)
│   │
│   ├── components/         ← Komponen React
│   │   ├── ProfileCard.tsx ← ⭐ KOMPONEN UTAMA (semua UI card ada di sini)
│   │   ├── icons.tsx       ← Semua icon/logo sebagai komponen
│   │   └── ui/             ← Komponen UI library (jangan ubah)
│   │
│   ├── pages/              ← Halaman
│   │   ├── Index.tsx       ← Halaman utama (render ProfileCard)
│   │   └── NotFound.tsx    ← Halaman 404
│   │
│   ├── hooks/              ← Custom hooks React
│   └── lib/                ← Utilitas
│
├── docs/                   ← Dokumentasi desain
│   ├── design.md
│   ├── cursor.md
│   ├── tools.md
│   ├── skill.md
│   ├── project-modal.md
│   └── guide.md            ← File ini!
│
└── reff/                   ← Gambar referensi desain
```

---

## 3. File-File Penting (Yang Sering Kamu Ubah)

### ⭐ `src/components/ProfileCard.tsx` — Komponen Utama

Ini adalah **jantung** aplikasi. Semua yang kamu lihat di browser ada di file ini:

```
ProfileCard.tsx berisi:
├── Data skill & proyek (baris 30-76)
├── State management — notch, modal (baris 78-205)
├── JSX (HTML) — render semua section:
│   ├── Video + Sound toggle
│   ├── Profile picture + Social accounts
│   ├── Text (nama, deskripsi, lokasi)
│   ├── Skills badges
│   ├── Tools section
│   ├── Project section
│   ├── Action buttons (CV, Get in touch)
│   ├── Available banner
│   ├── Tools Notch snackbar
│   ├── Skill Notch snackbar
│   └── Project Modal
```

**Cara baca JSX**: JSX itu **HTML di dalam JavaScript**. Bedanya:
- `class` → `className`
- `onclick` → `onClick`
- Style inline pakai object: `style={{ color: 'red' }}`
- Variabel ditulis dalam `{ }`: `<span>{namaVariable}</span>`

### `src/components/icons.tsx` — Semua Icon

Setiap icon/logo adalah **komponen** terpisah:

```tsx
// Cara pakai di ProfileCard:
<FigmaLogo />              // Logo Figma kecil (di tool item)
<FigmaDarkLogo />          // Logo Figma gelap besar (di notch dock)
<AirbnbMark />             // Logo Airbnb (di profile card)
<AirbnbModalMark />        // Logo Airbnb variant (di project modal)
```

**Untuk menambah icon baru:**
1. Taruh file SVG di `src/assets/`
2. Import di `icons.tsx`: `import namaUrl from "@/assets/file.svg";`
3. Buat export: `export const NamaIcon = (props) => <img src={namaUrl} ... />`
4. Import di `ProfileCard.tsx` dan pakai: `<NamaIcon />`

### `src/index.css` — Semua Styling

File ini **hampir identik** dengan `style.css` asli. Bedanya:
- Ada 3 baris TailwindCSS di atas (`@tailwind base/components/utilities`)
- Ada `:root` CSS variables untuk Tailwind (baris 7-39)
- Sisanya 100% sama — kamu bisa edit persis seperti di versi asli

---

## 4. Konsep Penting

### Import & Export

```tsx
// === File A: icons.tsx ===
export const FigmaLogo = () => <img src={...} />;  // "menyediakan"

// === File B: ProfileCard.tsx ===
import { FigmaLogo } from "./icons";                // "mengambil"
<FigmaLogo />                                       // "menggunakan"
```

### Props (Properti)

Props = data yang dikirim ke komponen, seperti **atribut HTML**:

```tsx
// Definisi di icons.tsx:
export const FigmaLogo = ({ width = 16, height = 16 }) => (
  <img src={...} width={width} height={height} />
);

// Penggunaan di ProfileCard.tsx:
<FigmaLogo />                    // default: 16x16
<FigmaLogo width={80} height={80} />  // custom: 80x80
```

### State (useState)

State = variabel yang kalau berubah, tampilan ikut berubah:

```tsx
const [muted, setMuted] = useState(true);  // muted dimulai true

// Kalau dipanggil setMuted(false), React otomatis:
// 1. Update nilai muted
// 2. Re-render komponen
// 3. Tampilan berubah
```

### useEffect

Effect = kode yang jalan di **waktu tertentu**:

```tsx
useEffect(() => {
  // Kode ini jalan saat komponen pertama kali muncul
  window.addEventListener("scroll", onScroll);
  
  return () => {
    // Kode ini jalan saat komponen dihapus (cleanup)
    window.removeEventListener("scroll", onScroll);
  };
}, []); // [] = jalan sekali saja
```

### useRef

Ref = referensi langsung ke elemen DOM (seperti `document.getElementById`):

```tsx
const videoRef = useRef(null);

// Di JSX:
<video ref={videoRef} ... />

// Di logic:
videoRef.current.muted = false;  // Akses langsung ke <video>
```

---

## 5. Perbedaan `public/` vs `src/assets/`

| `public/` | `src/assets/` |
|---|---|
| File **tidak diproses** oleh Vite | File **diproses** (optimized, hashed) |
| Diakses via URL langsung: `/profile.jpg` | Di-import di kode: `import x from "@/assets/file.svg"` |
| Cocok untuk: video, font, gambar besar | Cocok untuk: SVG, logo, icon |
| Tidak bisa di-tree-shake | Hanya yang di-import yang masuk bundle |

**Contoh:**
```tsx
// public/profile.jpg → akses langsung
<img src="/profile.jpg" />

// src/assets/figma-logo.svg → harus import dulu
import figmaUrl from "@/assets/figma-logo.svg";
<img src={figmaUrl} />
```

---

## 6. Cara Menambah / Mengubah Konten

### Mengubah teks / link
Edit langsung di `ProfileCard.tsx` — cari teks yang ingin diubah.

### Menambah skill badge baru
Di `ProfileCard.tsx`, cari bagian skill-container dan tambah `<span>`:
```tsx
<span className="skill-item skill-red">UI/UX Design</span>
<span className="skill-item skill-yellow">Ai Agent</span>
<span className="skill-item skill-green">Product Design</span>
// Tambah di sini:
<span className="skill-item skill-red">New Skill</span>
```

### Menambah proyek baru di modal
Tambah entry baru di array `projectData` di `ProfileCard.tsx`:
```tsx
{
  banner: newBannerImport,    // Import banner image
  Icon: NewProjectIcon,       // Import icon component
  title: "Project Title",
  desc: "Project description",
  href: "https://link-to-project",
},
```

### Mengubah warna / ukuran / spacing
Edit di `src/index.css` — cari class yang relevan. Nama-nama class sama persis dengan versi asli.

---

## 7. Perintah Terminal Penting

| Perintah | Fungsi |
|---|---|
| `npm install` | Install semua dependencies |
| `npm run dev` | Jalankan dev server (localhost:8080) |
| `npm run build` | Build untuk production (folder `dist/`) |
| `npm run preview` | Preview hasil build |
| `npx tsc --noEmit` | Cek error TypeScript tanpa build |

---

## 8. Jangan Ubah File-File Ini

| File / Folder | Alasan |
|---|---|
| `src/components/ui/` | Library shadcn/ui — auto-generated |
| `src/hooks/use-toast.ts` | Hook dari shadcn/ui |
| `src/integrations/` | Konfigurasi Supabase |
| `src/lib/` | Utility functions |
| `node_modules/` | Dependencies (auto-generated) |
| `vite.config.ts` | Konfigurasi build |
| `tailwind.config.ts` | Konfigurasi Tailwind |
| `tsconfig*.json` | Konfigurasi TypeScript |

---

## 9. Tips Debugging

1. **Buka DevTools** (F12) → Console tab → lihat error merah
2. **React Error**: Biasanya typo di nama komponen atau lupa import
3. **CSS tidak berubah**: Coba hard refresh (Ctrl+Shift+R)
4. **Port sudah dipakai**: Kill proses lama atau ubah port di `vite.config.ts`

---

## 10. Ringkasan Pemetaan File

| Versi Asli (card-name-new) | Framework (card-name-main) |
|---|---|
| `view/index.html` | `src/components/ProfileCard.tsx` |
| `view/style.css` | `src/index.css` |
| `view/script.js` | Logic di dalam `ProfileCard.tsx` (hooks & state) |
| `resource/` (gambar) | `src/assets/` + `public/` |
| `cursor/` | `public/cursor/` |
| `docs/` | `docs/` |
| `reff/` | `reff/` |
