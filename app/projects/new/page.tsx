"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ProjectDescriptionStep } from "@/components/project-wizard/project-description-step";
import { DeepRequirementsStep } from "@/components/project-wizard/deep-requirements-step";
import { DocumentGenerationStep } from "@/components/project-wizard/document-generation-step";

type WizardStep = "description" | "requirements" | "generation";

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

const steps = [
  {
    id: "description" as WizardStep,
    title: "Describe Project",
    description: "Tell us about your project idea"
  },
  {
    id: "requirements" as WizardStep,
    title: "Deep Requirements",
    description: "Answer AI-generated questions"
  },
  {
    id: "generation" as WizardStep,
    title: "Create Documents",
    description: "Generate and review documentation"
  }
];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>("description");
  const [projectData, setProjectData] = useState<ProjectData>({
    description: "",
    requirements: [],
    generatedQuestions: []
  });

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const updateProjectData = (updates: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "description":
        return (
          <ProjectDescriptionStep
            data={projectData}
            onUpdate={updateProjectData}
            onNext={handleNext}
          />
        );
      case "requirements":
        return (
          <DeepRequirementsStep
            data={projectData}
            onUpdate={updateProjectData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "generation":
        return (
          <DocumentGenerationStep
            data={projectData}
            onUpdate={updateProjectData}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Create New Project" description="Generate AI-powered development documentation">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>AI Document Generator</CardTitle>
              </div>
              <Badge variant="secondary">
                Step {currentStepIndex + 1} of {steps.length}
              </Badge>
            </div>
            
            <Progress value={progress} className="mb-4" />
            
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex-1 text-center ${
                    index < steps.length - 1 ? "border-r border-muted" : ""
                  }`}
                >
                  <div className={`text-sm font-medium ${
                    step.id === currentStep ? "text-primary" : 
                    index < currentStepIndex ? "text-muted-foreground" : "text-muted-foreground/50"
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-xs mt-1 ${
                    step.id === currentStep ? "text-primary/70" : 
                    index < currentStepIndex ? "text-muted-foreground/70" : "text-muted-foreground/40"
                  }`}>
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Step Content */}
        <div className="min-h-[600px]">
          {renderStepContent()}
        </div>

        {/* Navigation Footer */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {currentStepIndex + 1} of {steps.length} steps
              </div>
              
              <Button
                onClick={handleNext}
                disabled={currentStepIndex === steps.length - 1}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}