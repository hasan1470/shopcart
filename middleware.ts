import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextMiddleware } from 'next/server';
import { DEMO_MODE } from './lib/demo-mode';

const middleware: NextMiddleware = DEMO_MODE ? () => NextResponse.next() : clerkMiddleware();
export default middleware;

export const config = { matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'] };
