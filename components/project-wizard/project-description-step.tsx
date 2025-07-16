"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

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

interface ProjectDescriptionStepProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
}

const projectExamples = [
  {
    title: "E-commerce Mobile App",
    description: "A mobile application for online shopping with user authentication, product catalog, shopping cart, and payment integration."
  },
  {
    title: "Task Management System",
    description: "A web-based project management tool with team collaboration features, task assignments, deadline tracking, and progress visualization."
  },
  {
    title: "Social Media Dashboard",
    description: "An analytics dashboard for social media management with content scheduling, performance metrics, and multi-platform integration."
  }
];

export function ProjectDescriptionStep({ data, onUpdate, onNext }: ProjectDescriptionStepProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState(data.description);

  const handleNext = () => {
    if (description.trim().length >= 20) {
      onUpdate({ description: description.trim() });
      onNext();
    }
  };

  const isValid = description.trim().length >= 20;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Describe Your Project
          </CardTitle>
          <CardDescription>
            Tell us about your project idea. The more details you provide, the better we can generate comprehensive documentation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name (Optional)</Label>
            <Input
              id="project-name"
              placeholder="e.g., E-commerce Mobile App"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Project Description <Badge variant="destructive" className="text-xs">Required</Badge>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail. Include the purpose, main features, target users, and any specific requirements you have in mind..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>
                {description.length < 20 ? (
                  <>Minimum 20 characters required ({20 - description.length} more)</>
                ) : (
                  <>Perfect! {description.length} characters</>
                )}
              </span>
              <span>{description.length}/1000</span>
            </div>
          </div>

          <Button 
            onClick={handleNext} 
            disabled={!isValid}
            className="w-full gap-2"
            size="lg"
          >
            Generate AI Questions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Examples Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            Need Inspiration?
          </CardTitle>
          <CardDescription>
            Here are some example project descriptions to help you get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectExamples.map((example, index) => (
              <div 
                key={index}
                className="p-4 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => setDescription(example.description)}
              >
                <h4 className="font-medium mb-2">{example.title}</h4>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}