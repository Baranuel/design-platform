import { authMiddleware, redirectToSignIn, } from "@clerk/nextjs/server";


export default authMiddleware({

  async afterAuth(auth, req, evt) {

      // handle users who aren't authenticated
      if (!auth.userId && !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url });
      } 
    
    },
    
  apiRoutes: ["/api/(.*)"],
  publicRoutes: ["/"],

});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};