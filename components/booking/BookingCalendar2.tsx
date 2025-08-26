"use client";
import { Calendar } from "@/components/ui/calendar";
import { useProperty } from "@/utils/store";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useToast } from "@/components/ui/use-toast";

import {
  defaultSelected,
  generateBlockedPeriods,
  generateDateRange,
  generateDisabledDates,
} from "@/utils/calendar";

function BookingCalendar2() {
  const currentDate = new Date();
  const bookings = useProperty((state) => state.bookings);
  const { toast } = useToast();

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  const unavailableDates = generateDisabledDates(blockedPeriods);
  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are booked. Please select again.",
        });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar2;
