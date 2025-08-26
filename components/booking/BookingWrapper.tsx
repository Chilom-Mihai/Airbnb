"use client";

import { useProperty } from "@/utils/store";
import { Booking } from "@/utils/types";
import BookingContainer from "./BookingContainer";
import { useEffect } from "react";
import BookingCalendar2 from "./BookingCalendar2";

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  bookings: Booking[];
};
export default function BookingWrapper({
  propertyId,
  price,
  bookings,
}: BookingWrapperProps) {
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings,
    });
  }, []);
  return (
    <>
      <BookingCalendar2 />
      <BookingContainer />
    </>
  );
}
