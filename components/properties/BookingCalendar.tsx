"use client";

import dynamic from "next/dynamic";

const BookingCalendarClient = dynamic(() => import("./BookingCalendarClient"), {
  ssr: false,
});

export default function BookingCalendar() {
  return <BookingCalendarClient />;
}
