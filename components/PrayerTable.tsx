"use client";

import { PrayerData } from '../lib/prayerTiming';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Sunrise, Sunset, CloudSun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface PrayerTableProps {
    data: PrayerData | null;
}

export default function PrayerTable({ data }: PrayerTableProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!data || !mounted) return (
        <div className="flex h-full items-center justify-center text-islamic-gold animate-pulse text-2xl font-serif">
            Loading...
        </div>
    );

    const prayers = [
        { name: 'Fajr', urdu: 'فجر', time: data.fajr, key: 'Fajr', icon: CloudSun },
        { name: 'Sunrise', urdu: 'طلوع', time: data.sunrise, key: 'Sunrise', icon: Sunrise },
        { name: 'Dhuhr', urdu: 'ظہر', time: data.dhuhr, key: 'Dhuhr', icon: Sun },
        { name: 'Asr', urdu: 'عصر', time: data.asr, key: 'Asr', icon: Sun },
        { name: 'Maghrib', urdu: 'مغرب', time: data.maghrib, key: 'Maghrib', icon: Sunset },
        { name: 'Isha', urdu: 'عشاء', time: data.isha, key: 'Isha', icon: Moon },
    ];

    /* Format time to 12-hour format with AM/PM */
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 50 } }
    };

    return (
        <div className="w-full relative z-10 h-full flex flex-col justify-center">
            {/* Glass Container */}
            <div className="absolute inset-0 glass-card rounded-3xl skew-y-0 text-clip"></div>

            <div className="relative p-3 md:p-5 h-full flex flex-col justify-between overflow-hidden">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-2 flex-grow justify-center min-h-0"
                >
                    {prayers.map((prayer) => {
                        const isNext = data.nextPrayer === prayer.key;
                        const isSunrise = prayer.key === 'Sunrise';
                        const Icon = prayer.icon;

                        return (
                            <motion.div
                                key={prayer.name}
                                variants={itemVariants}
                                className={cn(
                                    "relative flex items-center justify-between px-4 md:px-6 py-2 rounded-xl border transition-all duration-500",
                                    isNext
                                        ? "bg-gradient-to-r from-islamic-gold/20 to-islamic-green-dark border-islamic-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] scale-[1.01] z-10"
                                        : "bg-black/20 border-white/5 hover:bg-black/40",
                                    isSunrise && !isNext && "opacity-60"
                                )}
                            >
                                {/* Active Indicator Bar */}
                                {isNext && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-islamic-gold rounded-l-xl shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                                    />
                                )}

                                {/* Left: Icon & Name */}
                                <div className="flex items-center space-x-4">
                                    <div className={cn("p-1.5 rounded-full flex-shrink-0", isNext ? "bg-islamic-gold/20 text-islamic-gold" : "bg-white/5 text-sand/50")}>
                                        <Icon size={isNext ? 24 : 20} />
                                    </div>
                                    <div className="flex items-baseline space-x-3">
                                        <span className={cn(
                                            "text-xl md:text-2xl xl:text-3xl font-serif tracking-wider leading-none",
                                            isNext ? "text-islamic-gold font-bold drop-shadow-sm" : "text-sand"
                                        )}>
                                            {prayer.name}
                                        </span>
                                        <span className={cn(
                                            "text-lg font-serif opacity-70 font-light",
                                            isNext ? "text-islamic-gold" : "text-sand/50"
                                        )}>
                                            {prayer.urdu}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Time */}
                                <span className={cn(
                                    "text-2xl md:text-3xl xl:text-4xl font-digital tracking-widest text-right min-w-[120px]",
                                    isNext ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-white/80"
                                )}>
                                    {formatTime(prayer.time)}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Footer Next Prayer Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-2 border-t border-islamic-gold/10 pt-2 shrink-0"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="text-sand/60 text-base md:text-lg font-serif text-center md:text-left flex items-center gap-2">
                            <span>Upcoming</span>
                            <span className="text-sand/40">/</span>
                            <span className="font-sans">اگلی نماز</span>:
                            <span className="text-islamic-gold font-bold mx-1">{data.nextPrayer}</span>
                            <span className="font-digital text-lg">{formatTime(data.nextPrayerTime)}</span>
                        </div>

                        {/* Countdown Timer */}
                        <Countdown targetDate={data.nextPrayerTime} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function Countdown({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("Now");
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
            );
        };

        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="glass px-4 py-1 rounded-lg border border-islamic-gold/20 flex items-center space-x-2">
            <span className="text-xs uppercase text-sand/50 tracking-wider">Starts in</span>
            <span className="font-digital text-xl xl:text-2xl text-islamic-gold text-glow">
                {timeLeft}
            </span>
        </div>
    );
}
