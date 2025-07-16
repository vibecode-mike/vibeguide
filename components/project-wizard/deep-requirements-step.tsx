"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Brain, CheckCircle, Loader2 } from "lucide-react";

interface ProjectData {
  description: string;
  requirements: {
    question: string;
    answer: string;
  }[];
  generatedQuestions: {
    id: string;
    question: string;
    type: string;
  }[];
}

interface DeepRequirementsStepProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Generate questions using AI API
const generateQuestions = async (description: string) => {
  try {
    const response = await fetch("/api/ai/generate-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectDescription: description }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    
    // Fallback to default questions
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
};

export function DeepRequirementsStep({ 
  data, 
  onUpdate, 
  onNext, 
  onPrevious 
}: DeepRequirementsStepProps) {
  const [questions, setQuestions] = useState(data.generatedQuestions);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Initialize answers from existing data
  useEffect(() => {
    const existingAnswers: Record<string, string> = {};
    data.requirements.forEach(req => {
      const question = questions.find(q => q.question === req.question);
      if (question) {
        existingAnswers[question.id] = req.answer;
      }
    });
    setAnswers(existingAnswers);
  }, [data.requirements, questions]);

  // Generate questions when component mounts using AI API
  useEffect(() => {
    if (questions.length === 0) {
      setIsGenerating(true);
      generateQuestions(data.description)
        .then((generatedQuestions) => {
          setQuestions(generatedQuestions);
          onUpdate({ generatedQuestions });
        })
        .catch((error) => {
          console.error("Failed to generate questions:", error);
          // Use fallback questions if API fails
          const fallbackQuestions = [
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
          setQuestions(fallbackQuestions);
          onUpdate({ generatedQuestions: fallbackQuestions });
        })
        .finally(() => {
          setIsGenerating(false);
        });
    }
  }, [data.description, questions.length, onUpdate]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    const requirements = questions.map(q => ({
      question: q.question,
      answer: answers[q.id] || ""
    }));
    
    onUpdate({ requirements });
    onNext();
  };

  const answeredCount = Object.values(answers).filter(answer => answer.trim().length > 0).length;
  const canProceed = answeredCount >= Math.ceil(questions.length * 0.6); // At least 60% answered

  if (isGenerating) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI is analyzing your project...</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Our AI is generating personalized questions based on your project description to gather detailed requirements.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Deep Requirements Analysis
          </CardTitle>
          <CardDescription>
            Answer these AI-generated questions to help us create comprehensive documentation. 
            You need to answer at least {Math.ceil(questions.length * 0.6)} out of {questions.length} questions.
          </CardDescription>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">
              {answeredCount}/{questions.length} answered
            </Badge>
            <Badge variant={canProceed ? "default" : "secondary"}>
              {canProceed ? "Ready to proceed" : "More answers needed"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id} className={index === currentQuestionIndex ? "ring-2 ring-primary/20" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {question.type}
                    </Badge>
                    {answers[question.id]?.trim() && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <CardTitle className="text-base leading-relaxed">
                    {index + 1}. {question.question}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Provide a detailed answer..."
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                rows={3}
                className="resize-none"
                onFocus={() => setCurrentQuestionIndex(index)}
              />
              <div className="text-xs text-muted-foreground mt-2">
                {answers[question.id]?.length || 0} characters
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onPrevious} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {answeredCount} of {questions.length} questions answered
            </div>
            
            <Button 
              onClick={handleNext} 
              disabled={!canProceed}
              className="gap-2"
            >
              Generate Documents
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}