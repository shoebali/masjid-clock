"use client";

import { Calendar, MoonStar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateDisplayProps {
    hijri: string;
    gregorian: string;
}

export default function DateDisplay({ hijri, gregorian }: DateDisplayProps) {
    return (
        <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
            {/* Hijri Date Pill */}
            <div className="glass px-4 py-2 rounded-xl flex items-center space-x-3 border-l-2 border-islamic-gold shadow-lg">
                <MoonStar className="w-5 h-5 text-islamic-gold shrink-0" />
                <div className="flex flex-col items-start leading-none">
                    <span className="text-lg md:text-xl font-bold text-islamic-gold font-serif">
                        {hijri}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-sand/60">
                        Hijri Date
                    </span>
                </div>
            </div>

            {/* Gregorian Date Pill */}
            <div className="flex items-center space-x-2 text-sand/80 px-2 opacity-80">
                <Calendar className="w-4 h-4 opacity-60 shrink-0" />
                <span className="text-base md:text-lg font-serif whitespace-nowrap">
                    {gregorian}
                </span>
            </div>
        </div>
    );
}
