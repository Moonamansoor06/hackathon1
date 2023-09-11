import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/","./usertypes","/product","/studio","/cart"]
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};