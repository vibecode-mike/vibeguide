"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Users, 
  Palette, 
  Server, 
  Database, 
  CheckCircle,
  Loader2,
  Save,
  Share2
} from "lucide-react";
import { useRouter } from "next/navigation";

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

interface DocumentGenerationStepProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onPrevious: () => void;
}

interface GeneratedDocument {
  id: string;
  title: string;
  icon: React.ElementType;
  status: "pending" | "generating" | "completed" | "error";
  content: string;
  description: string;
}

const documentTypes: Omit<GeneratedDocument, "status" | "content">[] = [
  {
    id: "user-journey",
    title: "User Journey Map",
    icon: Users,
    description: "Visual representation of user interactions and experiences"
  },
  {
    id: "prd",
    title: "Product Requirements",
    icon: FileText,
    description: "Comprehensive specifications and feature requirements"
  },
  {
    id: "frontend",
    title: "Frontend Design",
    icon: Palette,
    description: "UI/UX specifications and component documentation"
  },
  {
    id: "backend",
    title: "Backend Design",
    icon: Server,
    description: "API specifications and system architecture"
  },
  {
    id: "database",
    title: "Database Design",
    icon: Database,
    description: "Database schemas and data modeling"
  }
];

// Generate documents using AI API
const generateDocuments = async (projectDescription: string, requirements: { question: string; answer: string }[]) => {
  try {
    const response = await fetch("/api/ai/generate-documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        projectDescription, 
        requirements 
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate documents");
    }

    const data = await response.json();
    return data.documents;
  } catch (error) {
    console.error("Error generating documents:", error);
    throw error;
  }
};

export function DocumentGenerationStep({ data, onUpdate, onPrevious }: DocumentGenerationStepProps) {
  const [documents, setDocuments] = useState<GeneratedDocument[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("user-journey");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Initialize documents
  useEffect(() => {
    const initialDocuments: GeneratedDocument[] = documentTypes.map(doc => ({
      ...doc,
      status: "pending",
      content: ""
    }));
    setDocuments(initialDocuments);
  }, []);

  // Start generation process
  useEffect(() => {
    if (documents.length > 0 && !isGenerating && documents.every(doc => doc.status === "pending")) {
      generateAllDocuments();
    }
  }, [documents, isGenerating]);

  const generateAllDocuments = async () => {
    setIsGenerating(true);
    
    try {
      // Generate all documents using AI API
      const generatedDocs = await generateDocuments(data.description, data.requirements);
      
      // Map the generated documents to our document structure
      setDocuments(prev => prev.map((doc, index) => ({
        ...doc,
        status: "completed",
        content: generatedDocs[index]?.content || "Document generation failed."
      })));
      
    } catch (error) {
      console.error("Failed to generate documents:", error);
      
      // Set error status for all documents
      setDocuments(prev => prev.map(doc => ({
        ...doc,
        status: "error"
      })));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveProject = async () => {
    setIsSaving(true);
    
    // Simulate saving to database
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    router.push("/projects");
  };

  const handleDownload = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc && doc.content) {
      const blob = new Blob([doc.content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title.toLowerCase().replace(/\s+/g, "-")}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadAll = () => {
    // In a real implementation, this would create a ZIP file
    alert("Batch download functionality would be implemented here");
  };

  const completedCount = documents.filter(doc => doc.status === "completed").length;
  const allCompleted = completedCount === documents.length;

  return (
    <div className="space-y-6">
      {/* Generation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            AI Document Generation
          </CardTitle>
          <CardDescription>
            Our AI is generating comprehensive development documentation based on your project requirements.
          </CardDescription>
          <div className="flex gap-2 mt-4">
            <Badge variant={allCompleted ? "default" : "secondary"}>
              {completedCount}/{documents.length} completed
            </Badge>
            {isGenerating && (
              <Badge variant="secondary" className="gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Generating...
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Document Tabs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Generated Documents</CardTitle>
            {allCompleted && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadAll} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download All
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              {documents.map((doc) => (
                <TabsTrigger 
                  key={doc.id} 
                  value={doc.id}
                  className="flex items-center gap-2"
                >
                  <doc.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{doc.title.split(" ")[0]}</span>
                  {doc.status === "completed" && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
                  {doc.status === "generating" && (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {documents.map((doc) => (
              <TabsContent key={doc.id} value={doc.id} className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <doc.icon className="h-5 w-5" />
                          {doc.title}
                        </CardTitle>
                        <CardDescription>{doc.description}</CardDescription>
                      </div>
                      {doc.status === "completed" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownload(doc.id)}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {doc.status === "pending" && (
                      <div className="text-center py-8 text-muted-foreground">
                        Waiting to generate...
                      </div>
                    )}
                    {doc.status === "generating" && (
                      <div className="flex items-center justify-center py-8 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Generating document...
                      </div>
                    )}
                    {doc.status === "error" && (
                      <div className="text-center py-8">
                        <div className="text-red-500 mb-4">Failed to generate document</div>
                        <Button variant="outline" size="sm" onClick={generateAllDocuments}>
                          Retry Generation
                        </Button>
                      </div>
                    )}
                    {doc.status === "completed" && (
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                          {doc.content}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation & Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onPrevious} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {allCompleted ? "All documents generated successfully!" : `Generating ${completedCount}/${documents.length}...`}
            </div>
            
            <Button 
              onClick={handleSaveProject}
              disabled={!allCompleted || isSaving}
              className="gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Project
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}