import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favorites(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
  "/admin(.*)", // Adăugăm ruta admin
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Protejăm toate rutele din isProtectedRoute
  if (isProtectedRoute(req)) {
    if (!userId) {
      return redirectToSignIn(); // redirect la login dacă nu e logat
    }

    // Protecție admin specifică
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const adminId = process.env.ADMIN_USER_ID;
      if (userId !== adminId) {
        // dacă nu e admin, redirecționează la home
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
