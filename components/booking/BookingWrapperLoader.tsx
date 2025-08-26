"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const DynamicBookingWrapper = dynamic(() => import("./BookingWrapper"), {
  ssr: false,
  loading: () => <Skeleton className="h-[200px] w-full" />,
});

type Props = {
  propertyId: string;
  price: number;
  bookings: { checkIn: Date; checkOut: Date }[];
};

export default function BookingWrapperLoader(props: Props) {
  return <DynamicBookingWrapper {...props} />;
}
