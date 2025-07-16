import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "VibeGuide",
  },
});

export interface GeneratedQuestion {
  id: string;
  question: string;
  type: string;
}

export interface DocumentContent {
  title: string;
  content: string;
}

// Generate intelligent questions based on project description
export async function generateQuestions(projectDescription: string): Promise<GeneratedQuestion[]> {
  try {
    const completion = await openai.chat.completions.create({
    model: process.env.MODEL_NAME || "anthropic/claude-sonnet-4",
    messages: [
      {
        role: "system",
        content: `You are an expert software development consultant. Based on a project description, generate 3-5 strategic questions that will help gather comprehensive requirements for creating detailed development documentation. 

        The questions should cover:
        1. User experience and personas
        2. Core features and MVP requirements
        3. Technical requirements and constraints
        4. Performance and scalability needs
        5. Security and compliance considerations

        IMPORTANT: Return ONLY a valid JSON array with no markdown formatting, code blocks, or additional text. The response must be pure JSON that can be parsed directly.

        Format:
        [
          {
            "id": "unique_id",
            "question": "Question text",
            "type": "Question category (e.g., User Experience, Core Features, Technical Requirements, Performance, Security)"
          }
        ]

        Make questions specific to the project domain and avoid generic questions.`
      },
      {
        role: "user",
        content: `Project Description: ${projectDescription}`
      }
    ],
    temperature: 0.7,
    max_tokens: 1500
  });

  const content = completion.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error("No response from AI");
  }

  try {
    // Extract JSON from markdown code blocks if present
    let jsonContent = content.trim();
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Parse the JSON response
    const questions = JSON.parse(jsonContent) as GeneratedQuestion[];
    
    // Validate and ensure proper structure
    return questions.map((q, index) => ({
      id: q.id || `question_${index + 1}`,
      question: q.question,
      type: q.type || "General"
    }));
  } catch (parseError) {
    console.error("Failed to parse AI response:", parseError);
    
    // Return fallback questions if parsing fails
    return [
      {
        id: "1",
        question: "What are the main user types or personas that will interact with your system?",
        type: "User Experience"
      },
      {
        id: "2", 
        question: "What are the core features and functionalities that must be included in the minimum viable product (MVP)?",
        type: "Core Features"
      },
      {
        id: "3",
        question: "Do you have any specific technology preferences, constraints, or existing systems that need to be integrated?",
        type: "Technical Requirements"
      },
      {
        id: "4",
        question: "What are your expected user volume and performance requirements (concurrent users, response times, etc.)?",
        type: "Performance"
      },
      {
        id: "5",
        question: "Are there any security, compliance, or data privacy requirements specific to your domain or region?",
        type: "Security & Compliance"
      }
    ];
  }
  } catch (apiError) {
    console.error("API call failed:", apiError);
    
    // Return fallback questions if API call fails
    return [
      {
        id: "1",
        question: "What are the main user types or personas that will interact with your system?",
        type: "User Experience"
      },
      {
        id: "2", 
        question: "What are the core features and functionalities that must be included in the minimum viable product (MVP)?",
        type: "Core Features"
      },
      {
        id: "3",
        question: "Do you have any specific technology preferences, constraints, or existing systems that need to be integrated?",
        type: "Technical Requirements"
      }
    ];
  }
}

// Generate specific document content
export async function generateDocument(
  documentType: string,
  projectDescription: string,
  requirements: { question: string; answer: string }[]
): Promise<DocumentContent> {
  
  const documentPrompts = {
    "user-journey": "Create a comprehensive User Journey Map document",
    "prd": "Create a detailed Product Requirements Document (PRD)",
    "frontend": "Create a Frontend Design Document with technical specifications",
    "backend": "Create a Backend Design Document with API and architecture details",
    "database": "Create a Database Design Document with schema and relationships"
  };

  const prompt = documentPrompts[documentType as keyof typeof documentPrompts] || "Create a development document";

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || "anthropic/claude-sonnet-4",
      messages: [
        {
          role: "system",
          content: `You are an expert software architect and technical writer. ${prompt} based on the project description and requirements provided.

          The document should be:
          - Comprehensive and detailed
          - Well-structured with clear sections
          - Professional and actionable
          - Include specific implementation details where relevant
          - Follow industry best practices
          - Be written in Markdown format

          Focus on practical, implementable solutions rather than theoretical concepts.`
        },
        {
          role: "user",
          content: `Project Description: ${projectDescription}

Requirements and Answers:
${requirements.map(req => `Q: ${req.question}\nA: ${req.answer}`).join('\n\n')}

Please generate the ${documentType} document.`
        }
      ],
      temperature: 0.5,
      max_tokens: 4000
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    return {
      title: getDocumentTitle(documentType),
      content: content
    };

  } catch (error) {
    console.error(`Error generating ${documentType} document:`, error);
    throw error;
  }
}

function getDocumentTitle(documentType: string): string {
  const titles = {
    "user-journey": "User Journey Map",
    "prd": "Product Requirements Document",
    "frontend": "Frontend Design Document",
    "backend": "Backend Design Document", 
    "database": "Database Design Document"
  };
  
  return titles[documentType as keyof typeof titles] || "Development Document";
}

// Generate all documents at once
export async function generateAllDocuments(
  projectDescription: string,
  requirements: { question: string; answer: string }[]
): Promise<DocumentContent[]> {
  const documentTypes = ["user-journey", "prd", "frontend", "backend", "database"];
  
  const documents = await Promise.all(
    documentTypes.map(type => generateDocument(type, projectDescription, requirements))
  );
  
  return documents;
}