import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "API is working",
    timestamp: new Date().toISOString(),
    env: {
      hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
      hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    }
  });
}