"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { ro } from "react-day-picker/locale";

export default function BookingCalendarClient() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [defaultMonth, setDefaultMonth] = useState<Date | null>(null);

  useEffect(() => {
    setDefaultMonth(new Date());
  }, []);

  if (!defaultMonth) {
    return null;
  }

  return (
    <Calendar
      mode="range"
      defaultMonth={defaultMonth}
      selected={range}
      onSelect={setRange}
      locale={ro}
    />
  );
}
