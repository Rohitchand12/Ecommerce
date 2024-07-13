import { NextResponse } from "next/server";

const excludeAuth = ["/login","/signup"]
export function middleware(request) {
    console.log("middleware running");
  const isAuthenticated = request.cookies.get("isAuth")?.value;
  const currentPath = request.nextUrl.pathname;
  console.log("going to -->", currentPath);
  if(isAuthenticated) {
    if(excludeAuth.includes(currentPath)){
        console.log("user authenticated redirecting from ", currentPath, " to /login");
        return NextResponse.redirect(new URL("/",request.url));
      }
  }
  else{
    if(!excludeAuth.includes(currentPath)){
      return NextResponse.redirect(new URL("/login",request.url)); // if not authenticated redirect to login page
    }
  }
  return NextResponse.next(); // if authenticated continue with the request
}

export const config = {
  matcher: ["/cart", "/checkout","/login","/signup"],
};
