"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Clock from '../components/Clock';
import PrayerTable from '../components/PrayerTable';
import DateDisplay from '../components/DateDisplay';
import { getPrayerTimes, PrayerData, MASJID_CONFIG } from '../lib/prayerTiming';

export default function Home() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);

  // Background transition logic
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = [
    '/images/makkah.jpg',
    '/images/madinah.jpg'
  ];

  useEffect(() => {
    // Change background every 60 seconds
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fullscreen & Cursor Hiding Logic
  useEffect(() => {
    const enterFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    };

    let cursorTimer: NodeJS.Timeout;
    const handleMouseMove = () => {
      document.body.style.cursor = 'default';
      clearTimeout(cursorTimer);
      cursorTimer = setTimeout(() => {
        if (document.fullscreenElement) {
          document.body.style.cursor = 'none';
        }
      }, 3000); // Hide after 3s
    };

    window.addEventListener('click', enterFullscreen);
    window.addEventListener('touchstart', enterFullscreen);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('click', enterFullscreen);
      window.removeEventListener('touchstart', enterFullscreen);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(cursorTimer);
    };
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const data = getPrayerTimes(now);
      setPrayerData(data);
    };

    update(); // Initial
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // Audio Logic
  const [audioEnabled, setAudioEnabled] = useState(false);
  const playAdhan = () => {
    const audio = new Audio('/adhan.mp3');
    audio.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
  };

  useEffect(() => {
    if (!prayerData) return;

    const checkTime = () => {
      const now = new Date();
      const currentHm = now.getHours() + ':' + now.getMinutes();

      const pTimes = [
        prayerData.fajr,
        prayerData.dhuhr,
        prayerData.asr,
        prayerData.maghrib,
        prayerData.isha
      ];

      // Check if current time matches any prayer time (ignoring seconds)
      pTimes.forEach(time => {
        const pTimeHm = time.getHours() + ':' + time.getMinutes();
        if (pTimeHm === currentHm && now.getSeconds() === 0) {
          playAdhan();
        }
      });
    };

    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [prayerData]);

  // Enable audio on first interaction
  useEffect(() => {
    const enable = () => setAudioEnabled(true);
    window.addEventListener('click', enable);
    return () => window.removeEventListener('click', enable);
  }, []);

  return (
    <main className="h-screen w-full flex flex-col p-2 md:p-3 relative overflow-hidden bg-islamic-green-dark font-sans text-sand">

      {/* BACKGROUND & OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${backgrounds[bgIndex]}")` }}
          />
        </AnimatePresence>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green-dark via-islamic-green-dark/80 to-islamic-green-dark/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#022C22_100%)] opacity-80" />
      </div>

      {/* DECORATIVE FRAME BORDER */}
      <div className="absolute inset-2 border border-islamic-gold/20 rounded-[1.5rem] pointer-events-none z-50"></div>
      <div className="absolute inset-3 border border-islamic-gold/10 rounded-[1.3rem] pointer-events-none z-50"></div>

      {/* HEADER */}
      <header className="relative w-full z-10 flex justify-between items-start mb-2 shrink-0">
        <div className="glass px-6 py-2 md:py-3 rounded-br-3xl rounded-tl-2xl border-l-4 border-islamic-gold">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-islamic-gold tracking-widest uppercase shadow-black drop-shadow-lg leading-none">
            {MASJID_CONFIG.name}
          </h1>
          <p className="text-sand/60 text-xs md:text-sm tracking-[0.2em] font-light mt-1 uppercase flex flex-col md:block">
            <span>Prayer Timetable</span>
            <span className="md:ml-2 opacity-70 tracking-normal font-serif">اوقات نماز</span>
          </p>
        </div>

        {/* DATE DISPLAY */}
        {prayerData && (
          <DateDisplay
            hijri={prayerData.hijriDate}
            gregorian={prayerData.gregorianDate}
          />
        )}
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-4 z-10 items-stretch min-h-0 overflow-hidden">

        {/* LEFT COLUMN: CLOCK & HADITH */}
        <div className="lg:col-span-5 flex flex-col gap-2 md:gap-4 h-full justify-center min-h-0">
          <div className="flex-shrink-1 min-h-0 flex items-center justify-center">
            <Clock />
          </div>

          {/* Hadith / Message Box */}
          <div className="glass-card p-4 mx-4 md:mx-8 rounded-2xl text-center relative overflow-hidden group flex-shrink-0">
            <div className="absolute -left-10 -top-10 w-20 h-20 bg-islamic-gold/10 rounded-full blur-xl group-hover:bg-islamic-gold/20 transition-all duration-700"></div>
            <div className="absolute -right-10 -bottom-10 w-20 h-20 bg-islamic-gold/10 rounded-full blur-xl group-hover:bg-islamic-gold/20 transition-all duration-700"></div>

            <p className="text-lg md:text-xl text-sand font-serif italic leading-relaxed drop-shadow-md">
              "Indeed, prayer has been decreed upon the believers a decree of specified times."
            </p>
            <p className="text-lg md:text-xl text-sand font-serif leading-relaxed drop-shadow-md mt-2 opacity-80 direction-rtl">
              "بیشک نماز مومنوں پر مقررہ وقتوں میں فرض ہے"
            </p>

            <div className="mt-2 flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-islamic-gold/40"></div>
              <p className="text-xs text-islamic-gold uppercase tracking-widest font-bold">
                Surah An-Nisa 4:103 | سورۃ النساء ٤:١٠٣
              </p>
              <div className="h-px w-8 bg-islamic-gold/40"></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRAYER TABLE */}
        <div className="lg:col-span-7 h-full min-h-0">
          <PrayerTable data={prayerData} />
        </div>

      </div>

      {/* FOOTER / MARQUEE */}
      <footer className="w-full z-10 h-[5vh] min-h-[40px] mt-2 mb-1 shrink-0">
        <div className="glass h-full flex items-center rounded-xl overflow-hidden relative shadow-lg mx-4 border border-islamic-gold/10">
          <div className="bg-islamic-gold px-3 h-full flex items-center z-20 shadow-xl gap-2">
            <span className="text-islamic-green-dark font-bold uppercase tracking-widest text-xs md:text-sm">Notice</span>
            <span className="text-islamic-green-dark font-bold text-xs md:text-sm border-l border-islamic-green-dark/20 pl-2">اعلان</span>
          </div>
          <div className="marquee-container w-full py-1">
            <div className="marquee-content text-lg md:text-xl text-sand font-serif tracking-wider flex items-center gap-8">
              <span>PLEASE SWITCH OFF MOBILE PHONES ✦ MAINTAIN SILENCE IN THE MASJID ✦ JUMUAH KHUTBAH BEGINS AT 1:00 PM</span>
              <span className="font-sans opacity-90">✦ برائے مہربانی موبائل فون بند رکھیں ✦ مسجد میں خاموشی اختیار کریں ✦ جمعہ کا خطبہ 1:00 بجے شروع ہوگا ✦</span>
            </div>
          </div>
        </div>
      </footer>
      {/* <button
        onClick={playAdhan}
        className="absolute bottom-24 right-6 z-50 bg-islamic-gold/20 hover:bg-islamic-gold text-islamic-gold hover:text-islamic-green-dark border border-islamic-gold px-3 py-1 rounded-full text-xs transition-all backdrop-blur-md"
      >
        🔊 Test Adhan
      </button> */}
    </main>
  );
}
