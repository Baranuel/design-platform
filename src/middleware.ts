import { authMiddleware, currentUser, RedirectToUserProfile } from "@clerk/nextjs";

export default authMiddleware({
 async afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
  },
  // "/" will be accessible to all users
  publicRoutes: ["/"],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};