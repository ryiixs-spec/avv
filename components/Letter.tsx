'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Sparkles } from 'lucide-react';

export default function Letter() {
  const paragraphVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-8 z-20">
      {/* Decorative Stamp on top corner of the card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute -top-3 right-8 sm:right-12 z-30 hidden sm:flex flex-col items-center justify-center w-18 h-22 p-2 bg-white/90 border-2 border-dashed border-sky-300 rounded-lg shadow-md rotate-[-4deg]"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-sky-800">AIR MAIL</span>
        <Feather className="w-5 h-5 text-sky-600 my-0.5" />
        <span className="text-[8px] text-sky-600">☁️ Cloud post</span>
      </motion.div>

      {/* Main Glassmorphic Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="glass-letter rounded-[28px] p-6 sm:p-10 md:p-12 relative overflow-hidden text-[#2C3E50]"
      >
        {/* Subtle decorative inner corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-sky-200/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-sky-200/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-sky-200/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-sky-200/60 rounded-br-lg pointer-events-none" />

        {/* Letter Heading / Greeting */}
        <motion.div
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-sky-950 font-semibold tracking-wide">
            hai Hai, kamu, sang pembaca...
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-300 to-pink-200 rounded-full mt-2" />
        </motion.div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg leading-[1.85] sm:leading-[1.9] font-sans font-normal text-slate-700">
          
          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            Terima kasih, ya. Jujur, aku sama sekali nggak menyangka kamu akan meluangkan waktu dan tenaga untuk menuliskan sesuatu seperti itu untukku. Sederhana mungkin, tapi entah kenapa tulisanmu justru berhasil membuatku tersenyum dan menambah semangatku. Hahaha. Terima kasih banyak, ya. Aku benar-benar menghargainya.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            Oh iya, kamu juga harus tetap semangat dalam mengajar dan mengejar cita-citamu. Semoga langkahmu selalu dimudahkan dan semoga wisudamu juga segera tiba. Jangan lupa, sebentar lagi ada event, kan? Jadi, semangat untuk sang ketua dekorasi. Aku yakin kamu bisa mengatasinya. <span className="font-medium text-sky-900 italic">You can handle it, and you can do it as a leader!</span>
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            Tetap semangat, ya.<br />
            Dan satu hal lagi... semoga kamu juga nggak pernah kehilangan semangat untuk terus menulis cerita itu. Entah cerita tersebut lahir dari pengalamanmu sendiri, dari imajinasi, atau mungkin sedikit dari keduanya, yang terpenting adalah kamu tetap menikmatinya.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            Menurutku, kamu punya sesuatu yang menarik dalam caramu bercerita. Kamu bisa membuat seseorang yang membaca seolah-olah ikut berjalan di dalam ceritamu, mengenal tokoh-tokohnya, merasakan suasananya, dan perlahan lupa bahwa mereka sebenarnya hanya sedang membaca.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            Jadi, teruslah menulis.<br />
            Karena mungkin, tanpa kamu sadari, ada seseorang di luar sana yang suatu hari akan menemukan dirinya sendiri di antara halaman-halaman yang kamu tulis.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="pt-2"
          >
            Sekali lagi, terima kasih untuk semuanya, ya.<br />
            Dan untuk kamu, sang penulis...<br />
            <span className="font-serif italic font-semibold text-sky-950 text-lg sm:text-xl">
              jangan berhenti bercerita.
            </span>
          </motion.p>
        </div>

        {/* Signature */}
        <motion.div
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-sky-100/80 flex flex-col items-end"
        >
          <p className="font-serif italic text-slate-500 text-sm sm:text-base">
            a brother,
          </p>
          <p className="font-handwriting text-3xl sm:text-4xl text-sky-950 font-bold tracking-wider mt-1 flex items-center gap-1.5">
            <span>&quot;- Rayy’s</span>
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300 inline" />
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
