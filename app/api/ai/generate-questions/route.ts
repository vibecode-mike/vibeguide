import { NextRequest, NextResponse } from "next/server";
import { generateQuestions } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { projectDescription } = body;

    if (!projectDescription || projectDescription.trim().length < 20) {
      return NextResponse.json(
        { error: "Project description must be at least 20 characters long" },
        { status: 400 }
      );
    }

    // Generate questions using AI
    const questions = await generateQuestions(projectDescription);

    return NextResponse.json({ questions });

  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}