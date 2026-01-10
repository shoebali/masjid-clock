import {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    SunnahTimes,
    Prayer,
    Qibla,
} from 'adhan';
import moment from 'moment';
import 'moment-hijri';

// Default Configuration - CHANGE THESE FOR YOUR MASJID
export const MASJID_CONFIG = {
    name: "Masjid Al-Noor",
    // Default to New Delhi, India for now based on timezone 
    location: {
        lat: 28.6139,
        lng: 77.2090,
    },
    calculationMethod: CalculationMethod.Karachi(), // Common in South Asia
    madhab: 'hanafi', // 'shafi' or 'hanafi'
    hijriOffset: 0, // Adjust usually +/- 1 or 2 days
};

export interface PrayerData {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
    nextPrayer: string;
    nextPrayerTime: Date;
    hijriDate: string;
    gregorianDate: string;
}

export function getPrayerTimes(date: Date = new Date()): PrayerData {
    const coordinates = new Coordinates(
        MASJID_CONFIG.location.lat,
        MASJID_CONFIG.location.lng
    );

    const params = MASJID_CONFIG.calculationMethod;
    params.madhab = MASJID_CONFIG.madhab === 'hanafi' ? 'hanafi' : 'shafi';

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    // Hijri Date
    const m = moment(date);
    // @ts-ignore
    m.locale('en-US');
    const hijriDate = m.format('iD iMMMM iYYYY'); // iD = day, iMMMM = month, iYYYY = year
    const gregorianDate = m.format('dddd, D MMMM YYYY');

    // Next Prayer Logic
    const next = prayerTimes.nextPrayer();
    let nextPrayerName = '';
    let nextPrayerTime = new Date();

    switch (next) {
        case Prayer.Fajr:
            nextPrayerName = 'Fajr';
            nextPrayerTime = prayerTimes.fajr;
            break;
        case Prayer.Sunrise:
            nextPrayerName = 'Sunrise';
            nextPrayerTime = prayerTimes.sunrise;
            break;
        case Prayer.Dhuhr:
            nextPrayerName = 'Dhuhr';
            nextPrayerTime = prayerTimes.dhuhr;
            break;
        case Prayer.Asr:
            nextPrayerName = 'Asr';
            nextPrayerTime = prayerTimes.asr;
            break;
        case Prayer.Maghrib:
            nextPrayerName = 'Maghrib';
            nextPrayerTime = prayerTimes.maghrib;
            break;
        case Prayer.Isha:
            nextPrayerName = 'Isha';
            nextPrayerTime = prayerTimes.isha;
            break;
        case Prayer.None:
            // If none, it means we are after Isha, so next is Fajr tomorrow
            nextPrayerName = 'Fajr';
            // Calculate for tomorrow
            const tomorrow = new Date(date);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowPrayers = new PrayerTimes(coordinates, tomorrow, params);
            nextPrayerTime = tomorrowPrayers.fajr;
            break;
    }

    return {
        fajr: prayerTimes.fajr,
        sunrise: prayerTimes.sunrise,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
        nextPrayer: nextPrayerName,
        nextPrayerTime: nextPrayerTime,
        hijriDate,
        gregorianDate,
    };
}
