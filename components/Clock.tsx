"use client";

import { useState, useEffect } from 'react';

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date()); // Set initial client-side time
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null; // Prevent mismatch by not rendering on server

    // Format time as HH:MM:SS
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center justify-center p-4 xl:p-8 relative w-full">
            {/* Decorative Outer Ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-islamic-gold/20 scale-95 animate-pulse"></div>

            {/* Main Clock Container */}
            <div className="w-[35vh] h-[35vh] max-w-[80vw] max-h-[80vw] xl:w-[25vw] xl:h-[25vw] rounded-full border-4 border-islamic-gold bg-islamic-green-dark shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md transition-all duration-300">

                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none"></div>

                {/* Islamic Pattern Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-islamic-gold via-transparent to-transparent"></div>

                <div className="z-10 flex flex-col items-center">
                    {/* Time Display */}
                    <div className="flex items-baseline space-x-1 font-digital leading-none select-none text-islamic-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                        <span className="text-5xl md:text-7xl xl:text-[8cqw] font-bold tracking-wider">
                            {hours}:{minutes}
                        </span>
                        <span className="text-2xl md:text-3xl xl:text-[3cqw] text-islamic-gold/70 font-light w-[35px] md:w-[45px] xl:w-[4cqw]">
                            {seconds}
                        </span>
                    </div>

                    {/* Label */}
                    <div className="mt-2 md:mt-4 text-sm md:text-xl xl:text-2xl font-serif text-sand uppercase tracking-[0.3em] border-t border-islamic-gold/30 pt-2 w-24 md:w-32 xl:w-48 text-center">
                        Local Time
                    </div>
                </div>
            </div>
        </div>
    );
}
