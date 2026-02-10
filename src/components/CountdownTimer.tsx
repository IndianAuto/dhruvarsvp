"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft: TimeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit = ({ value, label, color }: { value: number; label: string; color: string }) => (
        <div className="flex flex-col items-center mx-2">
            <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: color, fontFamily: 'var(--font-heading)' }}
            >
                {value}
            </div>
            <span className="text-xs md:text-sm font-bold mt-2 text-gray-500 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 my-8">
            <TimeUnit value={timeLeft.days} label="Days" color="#E31837" />
            <TimeUnit value={timeLeft.hours} label="Hours" color="#1A1A1A" />
            <TimeUnit value={timeLeft.minutes} label="Mins" color="#E31837" />
            <TimeUnit value={timeLeft.seconds} label="Secs" color="#FFC72C" />
        </div>
    );
}
