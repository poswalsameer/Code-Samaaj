// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { cookies } from 'next/headers';

// const publicRoutes = ['/', '/signup', '/login'];

// export async function middleware(request: NextRequest) {

//     const cookieStore = await cookies();  // Correct way to access cookies
//     const authToken = cookieStore.get('authToken'); 

//     // Check if the user is trying to access a public route
//     const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

//     //agar public route hai and auth token bhi hai
//     if( isPublicRoute && authToken ){
//         return NextResponse.next();
//     }

//     //agar public route hai but auth token nahi hai
//     else if( isPublicRoute && !authToken ){
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     //agar public route NAHI hai but auth token hai
//     else if( !isPublicRoute && authToken ){
//         return NextResponse.next();
//     }

//     //public route bhi nahi hai and auth token bhi nahi hai
//     else{
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

// }

// // Define the routes where the middleware should be applied
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all pages except certain paths
// };


export const value: number = 2;
