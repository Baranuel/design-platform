import { authMiddleware, currentUser, redirectToSignIn, RedirectToUserProfile } from "@clerk/nextjs";

export default authMiddleware({

 async  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    } },

  publicRoutes: ["/"],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};