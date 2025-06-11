"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

// Static target date (replace with desired date)
// const TARGET_DATE = new Date("2025-12-20T00:00:00");
const now = new Date();
const TARGET_DATE = new Date(now.getFullYear(), now.getMonth(), 20, 0, 0, 0);

// Custom hook for countdown logic
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeRemaining(targetDate)
  );
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (isEnded) return;

    const timer = setInterval(() => {
      const newTime = calculateTimeRemaining(targetDate);
      setTimeLeft(newTime);

      if (newTime.total <= 0) {
        setIsEnded(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isEnded]);

  return { timeLeft, isEnded };
};

// Improved calculation function
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    total: timeDifference,
  };
};

// StatBox component - now more reusable
const StatBox = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center bg-white p-4 rounded-xl shadow-lg min-w-[80px]">
    <span className="text-3xl font-bold text-accent block">
      {value.toString().padStart(2, "0")}
    </span>
    <p className="text-gray-500 mt-1">{label}</p>
  </div>
);

const DealCountdown = () => {
  const { timeLeft, isEnded } = useCountdown(TARGET_DATE);

  return (
    <section className="py-16 bg-gradient-to-r from-brand-light to-secondary-light rounded-3xl my-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {isEnded ? (
              <>
                <h2 className="font-display text-4xl font-bold text-brand-dark">
                  Deal Has Ended
                </h2>
                <p className="text-xl text-gray-600">
                  This deal is no longer available. Check out our latest
                  promotions!
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl font-bold text-brand-dark">
                  Deal Of The Month
                </h2>
                <p className="text-xl text-gray-600">
                  Get ready for a shopping experience like never before with our
                  Deals of the Month! Every purchase comes with exclusive perks
                  and offers, making this month a celebration of savvy choices
                  and amazing deals. Don’t miss out! 🎁🛒
                </p>
                <div className="flex flex-wrap gap-4">
                  <StatBox label="Days" value={timeLeft.days} />
                  <StatBox label="Hours" value={timeLeft.hours} />
                  <StatBox label="Minutes" value={timeLeft.minutes} />
                  <StatBox label="Seconds" value={timeLeft.seconds} />
                </div>
              </>
            )}
            <div className="text-center pt-4">
              <Button
                asChild
                className="bg-brand-dark text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand transition-transform hover:scale-105"
              >
                <Link href="/search">
                  View Products <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative group flex justify-center">
            <Image
              src="/images/promo.jpg"
              alt="promotion"
              width={400}
              height={300}
              className="rounded-2xl shadow-2xl transform group-hover:rotate-2 transition duration-500 object-cover"
            />
            <div className="absolute -inset-4 bg-accent/20 rounded-2xl -z-10 transform group-hover:-rotate-2 transition duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealCountdown;
