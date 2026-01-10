"use client";

import { useEffect, useState } from 'react';
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
    // Attempt fullscreen on any interaction
    const enterFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    };

    // Hide cursor after inactivity
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
    window.addEventListener('keydown', enterFullscreen);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('click', enterFullscreen);
      window.removeEventListener('touchstart', enterFullscreen);
      window.removeEventListener('keydown', enterFullscreen);
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

    // Update every minute to check for "Next Prayer" changes
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-screen w-full flex flex-col p-2 md:p-4 relative overflow-hidden bg-islamic-green-dark">

      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backgrounds.map((bg, index) => (
          <div
            key={bg}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[3000ms] ${index === bgIndex ? 'opacity-50' : 'opacity-0'}`}
            // Use fixed 100% dimensions to avoid layout shifts
            style={{ backgroundImage: `url("${bg}")` }}
          ></div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green-dark/80 via-transparent to-islamic-green-dark/90"></div>
      </div>

      {/* DECORATIVE FRAME BORDER */}
      <div className="absolute inset-2 border-2 border-islamic-gold/30 rounded-3xl pointer-events-none z-50 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]"></div>

      {/* HEADER */}
      <header className="w-full flex justify-between items-center py-2 px-6 mb-2 z-10 border-b border-islamic-gold/20 bg-islamic-green-dark/40 backdrop-blur-sm rounded-t-2xl mx-auto max-w-[98%] flex-shrink-0 h-[10vh] min-h-[60px]">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-islamic-gold tracking-widest uppercase shadow-black drop-shadow-lg font-serif leading-none">
            {MASJID_CONFIG.name}
          </h1>
          <p className="text-sand/80 text-xs md:text-sm xl:text-base uppercase tracking-widest font-light border-l-2 border-islamic-gold pl-3 mt-1">
            Automatic Prayer Times
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
      {/* flex-1 and min-h-0 are critical for nested scrolling/flex scaling */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 z-10 max-w-[98%] mx-auto items-stretch min-h-0 overflow-hidden pb-2">

        {/* LEFT COLUMN: CLOCK & HADITH */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full py-2 gap-2">

          {/* Clock Container - Flex grow to take available space */}
          <div className="flex-1 flex items-center justify-center min-h-0 aspect-square mx-auto relative">
            <Clock />
          </div>

          {/* Hadith / Message Box - Fixed height shrinkable */}
          <div className="bg-islamic-green-dark/60 p-4 rounded-xl border border-islamic-gold/30 text-center shadow-lg backdrop-blur-md relative overflow-hidden group flex-shrink-0 min-h-[15vh]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-islamic-gold/40 rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-islamic-gold/40 rounded-br-xl"></div>

            <div className="flex flex-col justify-center h-full">
              <p className="text-lg md:text-xl xl:text-2xl text-sand font-serif leading-tight italic drop-shadow-md px-2">
                "Indeed, prayer has been decreed upon the believers a decree of specified times."
              </p>
              <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent mx-auto my-3"></div>
              <p className="text-xs md:text-sm text-islamic-gold uppercase tracking-widest font-bold">
                Surah An-Nisa 4:103
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRAYER TABLE */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full min-h-0">
          <PrayerTable data={prayerData} />
        </div>

      </div>

      {/* FOOTER / MARQUEE */}
      <footer className="w-full z-10 flex-shrink-0 h-[6vh] min-h-[40px] mb-2">
        <div className="bg-islamic-green-dark border-y border-islamic-gold/30 h-full flex items-center mx-4 rounded-full shadow-lg overflow-hidden relative px-4">
          <div className="absolute inset-0 bg-islamic-gold/5 pointer-events-none"></div>
          <div className="marquee-container w-full">
            <div className="marquee-content text-lg md:text-xl xl:text-2xl text-sand font-serif tracking-wider whitespace-nowrap">
              ✦ PLEASE SWITCH OFF MOBILE PHONES ✦ MAINTAIN SILENCE IN THE MASJID ✦ JUMUAH KHUTBAH BEGINS AT 1:00 PM ✦ CHECKS AND BALANCES ✦
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
