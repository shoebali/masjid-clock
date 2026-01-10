"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null;

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Progress for the seconds ring (0 to 1)
    const progress = seconds / 60;
    const radius = 120; // Internal SVG units
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="relative flex items-center justify-center w-full h-full min-h-[300px]">
            {/* Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex items-center justify-center p-4"
            >
                {/* Exterior Decorative Rings */}
                <div className="absolute inset-0 rounded-full border border-islamic-gold/20 scale-105 animate-pulse-slow pl-1 pt-1" />
                <div className="absolute inset-4 rounded-full border border-islamic-gold/10 scale-90" />

                {/* SVG Progress Ring for Seconds */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" viewBox="0 0 300 300">
                    {/* Track */}
                    <circle
                        cx="150"
                        cy="150"
                        r={radius}
                        className="stroke-islamic-green-dark stroke-[4px] fill-transparent"
                    />
                    {/* Progress */}
                    <motion.circle
                        cx="150"
                        cy="150"
                        r={radius}
                        className="stroke-islamic-gold stroke-[4px] fill-transparent line-cap-round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset,
                        }}
                        transition={{ duration: 0.5, ease: "linear" }}
                    />
                </svg>

                {/* Inner Glass Disc */}
                <div className="absolute inset-[15%] rounded-full glass-card flex flex-col items-center justify-center z-10 shadow-2xl border border-islamic-gold/20">
                    {/* Subtle Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-islamic-gold via-transparent to-transparent"></div>

                    {/* Time Display */}
                    <div className="relative z-20 flex flex-col items-center">
                        <div className="flex items-baseline space-x-1 font-digital text-islamic-gold text-glow leading-none">
                            <span className="text-6xl md:text-7xl font-bold tracking-tighter">
                                {hours.toString().padStart(2, '0')}
                            </span>
                            <motion.span
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-4xl md:text-5xl -translate-y-2 opacity-80"
                            >
                                :
                            </motion.span>
                            <span className="text-6xl md:text-7xl font-bold tracking-tighter">
                                {minutes.toString().padStart(2, '0')}
                            </span>
                        </div>

                        {/* Second Counter (Digital underneath) */}
                        <div className="mt-1 text-islamic-gold/60 font-digital text-xl tracking-widest">
                            {seconds.toString().padStart(2, '0')}
                        </div>

                        <div className="text-xs text-sand/40 font-serif uppercase tracking-widest mt-2 border-t border-islamic-gold/20 pt-1 w-16 text-center">
                            Local
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
