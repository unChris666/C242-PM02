// // middleware.ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Jika permintaan adalah untuk file statis atau internal, biarkan berjalan normal
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // Jika URL saat ini bukan '/app/login', lakukan redirect
//   if (url.pathname !== '/login') {
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

  // Jika URL sudah '/app/login', biarkan proses berjalan normal
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

