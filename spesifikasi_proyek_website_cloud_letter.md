# ☁️ Thank You — Interactive Cloud Letter Website

## 1. Project Overview
Buat sebuah website personal, sederhana, dreamy, dan interaktif yang diakses melalui QR Code.

**Konsep Website:**
```
QR CODE
   ↓
Vercel Website
   ↓
Opening Screen
   ↓
💌 User klik amplop
   ↓
🎵 Musik mulai dimainkan
   ↓
✨ "thank youu for ur sweet word for me."
   ↓
☁️ Transition ke dunia langit
   ↓
🏔️ Gunung cartoon/anime
   ↓
☁️ Awan bergerak
   ↓
📖 Surat / pesan terima kasih
   ↓
🌅 Sunset
   ↓
❤️ Final message
```

Website harus terasa seperti **sebuah surat kecil yang ditemukan di atas awan**, bukan seperti website corporate atau dashboard.

---

## 2. Core Experience
Ketika user scan QR Code, user masuk ke halaman pertama yang sangat sederhana.

**Background:**
- Sky blue
- Soft clouds
- Soft glow
- Sedikit floating particles (tidak terlalu ramai)

Di tengah terdapat sebuah amplop digital.
```
                 ☁️

           ☁️          ☁️

              💌

         tap to open

              ☁️
```

Amplop harus terlihat seperti surat personal.
Ketika user melakukan click/tap:
1. Amplop terbuka.
2. Surat sedikit keluar dari amplop.
3. Ada efek glow.
4. Musik mulai diputar (`audio.play()`).
5. Intro text muncul.
6. Screen melakukan transisi.
7. User masuk ke halaman utama.

---

## 3. Music
- **Judul lagu:** About You
- **File lokasi:** `/public/audio/about-you.mp3`

### Aturan Audio:
- Musik **harus** mulai setelah user melakukan klik/tap pada amplop. Jangan pernah mencoba autoplay sebelum interaksi user.
- Parameter Audio:
  - Loop: `true`
  - Volume: `0.25 - 0.40`
  - Tidak restart ketika pindah section/scroll.
  - Memiliki mute/unmute control di pojok kanan bawah.

**UI Music Controller (Pojok Kanan Bawah):**
```
┌───────────────┐
│ 🎵 About You  │
│ 🔊            │
└───────────────┘
```
*(Pada tampilan mobile, buat ukuran lebih kecil & minimalis).*

---

## 4. Opening Envelope Component (`Envelope.tsx`)
**State:** `closed` | `opening` | `opened`

- **Saat Idle:** 💌
- **Saat Hover:** scale sedikit, `translateY(-5px)`, glow, shadow lebih kuat.
- **Saat Click:** `closed` → `opening` → `opened` (Durasi: ~700–1000ms).
- Gunakan **Framer Motion** atau CSS Animation.

---

## 5. Intro Text (`Intro.tsx`)
Setelah envelope dibuka, tampilkan teks:
> **thank youu for ur sweet word for me.**

**Style:**
- Lowercase
- Warna putih dengan soft glow
- Centered

**Animasi Transition:**
`opacity: 0, translateY(20px), blur` → `opacity: 1, translateY(0), blur: 0`

Setelah ~2–3 detik, teks akan *fade out* dan bertransisi ke halaman utama.

---

## 6. Main Page Theme
- **Tema Utama:** ABOVE THE CLOUDS
- **Palette Warna:**
  - Sky Blue: `#87CEEB`
  - Light Sky: `#BDEBFF`
  - Cloud: `#FFFFFF`
  - Soft Blue: `#DDF5FF`
  - Mountain Blue: `#477D91`
  - Mountain Green: `#547B68`
  - Sunset Orange: `#F6B48F`
  - Sunset Pink: `#E8A6A6`

Background menggunakan landscape cartoon/anime (bukan foto realistis).

---

## 7. Sky Background Structure
Gunakan layered background dengan susunan z-index/order:
1. Sky Gradient
2. Sun Glow
3. Far Clouds
4. Far Mountains
5. Middle Mountains
6. Foreground Mountains
7. Foreground Clouds
8. Letter Card

**Base Sky Gradient:**
```css
background: linear-gradient(to bottom, #75C8F5 0%, #A9DFF7 50%, #E7F8FF 100%);
```

---

## 8. Sun
- Sun berada di belakang awan.
- Matahari lembut menggunakan soft yellow, blur, glow, dan opacity.
- Gunakan elemen SVG atau CSS Radial Gradient.

---

## 9. Cloud System Component (`Clouds.tsx`)
Layer Awan:
1. **Background Clouds:** Kecil, Opacity 0.3, Bergerak lambat.
2. **Middle Clouds:** Medium, Opacity 0.5–0.8, Bergerak horizontal.
3. **Foreground Clouds:** Besar, Blur halus, Opacity 0.8–1.0, Bergerak perlahan.

**Durasi Pergerakan (Random Delay):**
- Cloud A: 35s
- Cloud B: 45s
- Cloud C: 55s
- Cloud D: 65s

---

## 10. Cloud Design
- Dibuat menggunakan CSS / SVG vector (bukan emoji).
- Bentuk terbuat dari gabungan beberapa rounded circles hingga membentuk awan gaya anime/cartoon.

---

## 11. Mountains Component (`Mountains.tsx`)
Minimal 3 layer gunung cartoon/anime:
- **Far Mountain:** `#9FC3CE`, Opacity `0.4`
- **Middle Mountain:** `#6F9FA8`
- **Front Mountain:** `#4E7C69`

Tambahkan detail halus seperti kabut, siluet pohon kecil, atau highlight lembut.

---

## 12. Parallax
Saat user scroll, elemen bergerak dengan kecepatan berbeda:
- Sky: `0%`
- Cloud: `10%`
- Far Mountain: `20%`
- Middle Mountain: `30%`
- Front Mountain: `40%`
- Letter: `Normal scroll`

*Gunakan CSS `transform` untuk optimasi performa. Desktop bisa didukung mouse parallax halus.*

---

## 13. Letter Card (`Letter.tsx`)
Kartu pesan dengan nuansa *old letter + cloud + modern glassmorphism*.

**CSS Style:**
```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.8);
border-radius: 28px;
box-shadow: 0 30px 80px rgba(50, 100, 130, 0.15);
```

---

## 14. Letter Text
Isi pesan di dalam surat:

```text
hai Hai, kamu, sang pembaca...

Terima kasih, ya. Jujur, aku sama sekali nggak menyangka kamu akan meluangkan waktu dan tenaga untuk menuliskan sesuatu seperti itu untukku. Sederhana mungkin, tapi entah kenapa tulisanmu justru berhasil membuatku tersenyum dan menambah semangatku. Hahaha. Terima kasih banyak, ya. Aku benar-benar menghargainya.

Oh iya, kamu juga harus tetap semangat dalam mengajar dan mengejar cita-citamu. Semoga langkahmu selalu dimudahkan dan semoga wisudamu juga segera tiba. Jangan lupa, sebentar lagi ada event, kan? Jadi, semangat untuk sang ketua dekorasi. Aku yakin kamu bisa mengatasinya. You can handle it, and you can do it as a leader!

Tetap semangat, ya.
Dan satu hal lagi... semoga kamu juga nggak pernah kehilangan semangat untuk terus menulis cerita itu. Entah cerita tersebut lahir dari pengalamanmu sendiri, dari imajinasi, atau mungkin sedikit dari keduanya, yang terpenting adalah kamu tetap menikmatinya.

Menurutku, kamu punya sesuatu yang menarik dalam caramu bercerita. Kamu bisa membuat seseorang yang membaca seolah-olah ikut berjalan di dalam ceritamu, mengenal tokoh-tokohnya, merasakan suasananya, dan perlahan lupa bahwa mereka sebenarnya hanya sedang membaca.

Jadi, teruslah menulis.
Karena mungkin, tanpa kamu sadari, ada seseorang di luar sana yang suatu hari akan menemukan dirinya sendiri di antara halaman-halaman yang kamu tulis.

Sekali lagi, terima kasih untuk semuanya, ya.
Dan untuk kamu, sang penulis...
jangan berhenti bercerita.

a brother,
"- Rayy’s
```

---

## 15. Typography & Animation
- **Heading / Signature:** `Playfair Display` atau `Caveat`
- **Body:** `Nunito` atau `Inter` (line-height: ~1.8)
- **Scroll Reveal:** Setiap paragraf muncul bertahap (*fade in* + *slide up*) saat di-scroll.

---

## 16. Floating Elements & Interactions
- **Particles (`Particles.tsx`):** 10–20 titik bintang/cahaya (`✦`, `·`, `✧`) bergerak melayang halus.
- **Birds (`Birds.tsx`):** Siluet burung terbang horizontal (` opacity: 0.25–0.5`).
- **Interactive Cloud:** Jika awan diklik (`role="button"`), memunculkan pesan acak seperti:
  - *"keep going ☁️"*
  - *"you got this."*
  - *"don't forget to smile."*
  - *"keep writing."*
  - *"one step at a time."*
  - *"you can do it."*
- **Interactive Stars:** Bintang jika diklik memunculkan teks kecil: *"another little wish for you."*

---

## 17. Scroll Stage & Sunset Transition
Seiring user melakukan scroll ke bawah, gradien warna langit berubah secara halus:
- **Stage 1 (Opening):** Bright Blue (`#75C8F5`)
- **Stage 2:** Soft Blue (`#A9DFF7`)
- **Stage 3:** Warm Blue (`#C4DDF0`)
- **Stage 4 (Sunset):** Sunset Orange & Pink (`#F4C3A2`)
- **Stage 5 (Final):** Soft Dusk (`#7886A8`)

---

## 18. Final Message (`FinalMessage.tsx`)
Bagian paling bawah halaman:

```text
        ☁️

     and once again...

        thank you.

           ♡

      keep writing.
      keep dreaming.
      keep going.

        — Rayy’s
```

---

## 19. Project Structure
```text
project/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Envelope.tsx
│   ├── Intro.tsx
│   ├── SkyScene.tsx
│   ├── Clouds.tsx
│   ├── Mountains.tsx
│   ├── Letter.tsx
│   ├── Particles.tsx
│   ├── Birds.tsx
│   ├── MusicPlayer.tsx
│   └── FinalMessage.tsx
│
├── public/
│   ├── audio/
│   │   └── about-you.mp3
│   └── favicon.ico
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 20. Technical & Accessibility Requirements
1. **Accessibility:**
   - Gunakan `aria-label` untuk kontrol audio (`aria-label="Toggle background music"`).
   - Dukung `prefers-reduced-motion` untuk mematikan animasi berat jika dibutuhkan.
2. **Performance:** Animasi diutamakan menggunakan CSS `transform` & `opacity` (target 60fps).
3. **Deployment:** Statis / SSR ringan via Vercel tanpa butuh database/backend.