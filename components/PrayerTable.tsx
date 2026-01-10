"use client";

import { PrayerData } from '../lib/prayerTiming';

interface PrayerTableProps {
    data: PrayerData | null;
}

export default function PrayerTable({ data }: PrayerTableProps) {
    if (!data) return (
        <div className="flex h-full items-center justify-center text-islamic-gold animate-pulse text-2xl font-serif">
            Loading Prayer Times...
        </div>
    );

    const prayers = [
        { name: 'Fajr', time: data.fajr, key: 'Fajr' },
        { name: 'Sunrise', time: data.sunrise, key: 'Sunrise' },
        { name: 'Dhuhr', time: data.dhuhr, key: 'Dhuhr' },
        { name: 'Asr', time: data.asr, key: 'Asr' },
        { name: 'Maghrib', time: data.maghrib, key: 'Maghrib' },
        { name: 'Isha', time: data.isha, key: 'Isha' },
    ];

    /* Format time to 12-hour format with AM/PM */
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="w-full relative z-10 h-full flex flex-col justify-center">
            {/* Container Background */}
            <div className="absolute inset-0 bg-islamic-green-dark/80 backdrop-blur-md rounded-2xl border border-islamic-gold/20 shadow-2xl skew-y-0 text-clip"></div>

            <div className="relative p-4 md:p-6 space-y-2 md:space-y-4 h-full flex flex-col justify-around">

                <div className="flex flex-col gap-2 md:gap-3 xl:gap-4 flex-grow justify-center">
                    {prayers.map((prayer) => {
                        const isNext = data.nextPrayer === prayer.key;
                        const isSunrise = prayer.key === 'Sunrise';

                        return (
                            <div
                                key={prayer.name}
                                className={`
                                    relative flex items-center justify-between px-4 md:px-6 xl:px-8 py-3 md:py-4 xl:py-[2vh] rounded-xl border transition-all duration-500
                                    ${isNext
                                        ? 'bg-gradient-to-r from-islamic-gold/20 to-islamic-green-dark border-islamic-gold scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] z-10'
                                        : isSunrise
                                            ? 'bg-black/30 border-islamic-gold/10 opacity-70'
                                            : 'bg-black/40 border-islamic-gold/10 hover:bg-black/60 hover:border-islamic-gold/30'
                                    }
                                `}
                            >
                                {/* Left: Prayer Name */}
                                <div className="flex items-center space-x-4">
                                    <div className={`w-1.5 md:w-2 h-8 md:h-10 xl:h-[4vh] rounded-full ${isNext ? 'bg-islamic-gold shadow-glow-gold' : 'bg-islamic-green-dark border border-islamic-gold/20'}`}></div>
                                    <span className={`text-2xl md:text-3xl xl:text-[4vh] font-serif tracking-wider ${isNext ? 'text-islamic-gold drop-shadow-md' : isSunrise ? 'text-sand/60' : 'text-sand'}`}>
                                        {prayer.name}
                                    </span>
                                </div>

                                {/* Right: Time */}
                                <span className={`text-3xl md:text-4xl xl:text-[5vh] font-digital tracking-widest ${isNext ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : isSunrise ? 'text-sand/60' : 'text-white/90'}`}>
                                    {formatTime(prayer.time)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Next Prayer Info */}
                <div className="mt-2 md:mt-4 xl:mt-6 text-center border-t border-islamic-gold/20 pt-2 md:pt-4">
                    <p className="text-sand/70 text-base md:text-lg xl:text-2xl font-serif">
                        Next Prayer: <span className="text-islamic-gold font-bold mx-2">{data.nextPrayer}</span>
                        <span className="font-digital text-lg md:text-xl xl:text-3xl">{formatTime(data.nextPrayerTime)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
