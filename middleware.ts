import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/","./usertypes","/product","/studio"]
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};