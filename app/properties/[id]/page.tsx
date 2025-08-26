import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { redirect } from "next/navigation";

import DynamicMap from "@/components/properties/DynamicMapClient";
// import BookingCalendarClient from "@/components/properties/BookingCalendarClient";
import BookingWrapperLoader from "@/components/booking/BookingWrapperLoader";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { auth } from "@clerk/nextjs/server";

// const DynamicBookingWrapper = dynamic(
//   () => import("@/components/booking/BookingWrapper"),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="h-[200px] w-full" />,
//   }
// );

type Props = {
  params: Promise<{ id: string }>;
};

async function PropertyDetailsPage({ params }: Props) {
  const awaitedParams = await params;
  const property = await fetchPropertyDetails(awaitedParams.id);

  if (!property) {
    redirect("/");
  }

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const { firstName, profileImage } = property.profile;
  const { userId } = await auth();
  const isNotOwner = property.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>

          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>

        <div className="lg:col-span-4 flex flex-col items-center">
          {/* <BookingCalendarClient /> */}
          <BookingWrapperLoader
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReviews propertyId={property.id} />
    </section>
  );
}

export default PropertyDetailsPage;
