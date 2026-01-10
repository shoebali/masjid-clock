"use client";

interface DateDisplayProps {
    hijri: string;
    gregorian: string;
}

export default function DateDisplay({ hijri, gregorian }: DateDisplayProps) {
    return (
        <div className="flex flex-col items-end justify-center space-y-1">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-right">
                    <div className="text-2xl md:text-3xl xl:text-[4vh] font-bold text-islamic-gold drop-shadow-md font-serif tracking-wide border-b border-islamic-gold/20 pb-1">
                        {hijri}
                    </div>
                    <div className="text-xs md:text-sm xl:text-[1.5vh] text-sand/60 uppercase tracking-widest font-light mt-1">
                        Hijri Date
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-islamic-gold/30 to-transparent my-1"></div>

            <div className="flex items-center justify-end space-x-3">
                <div className="text-right">
                    <div className="text-lg md:text-xl xl:text-[3vh] font-bold text-sand/90 drop-shadow-md font-serif">
                        {gregorian}
                    </div>
                    <div className="text-[10px] md:text-xs xl:text-[1.2vh] text-sand/40 uppercase tracking-widest font-light">
                        Gregorian Date
                    </div>
                </div>
            </div>
        </div>
    );
}
