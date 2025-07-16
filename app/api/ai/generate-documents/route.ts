import { NextRequest, NextResponse } from "next/server";
import { generateAllDocuments } from "@/lib/ai";
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
    const { projectDescription, requirements } = body;

    if (!projectDescription || !requirements || !Array.isArray(requirements)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Filter out empty requirements
    const validRequirements = requirements.filter(
      req => req.question && req.answer && req.answer.trim().length > 0
    );

    if (validRequirements.length === 0) {
      return NextResponse.json(
        { error: "At least one requirement answer is required" },
        { status: 400 }
      );
    }

    // Generate all documents using AI
    const documents = await generateAllDocuments(projectDescription, validRequirements);

    return NextResponse.json({ documents });

  } catch (error) {
    console.error("Error generating documents:", error);
    return NextResponse.json(
      { error: "Failed to generate documents" },
      { status: 500 }
    );
  }
}