import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Clock, Download } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with real data from database
const mockProjects = [
  {
    id: "1",
    name: "E-commerce Mobile App",
    description: "Full-stack mobile application for online shopping with payment integration",
    createdAt: "2024-01-15",
    status: "completed",
    documentsCount: 5
  },
  {
    id: "2", 
    name: "Task Management System",
    description: "Web-based project management tool with team collaboration features",
    createdAt: "2024-01-10",
    status: "completed",
    documentsCount: 5
  },
  {
    id: "3",
    name: "Social Media Dashboard",
    description: "Analytics dashboard for social media management and content scheduling",
    createdAt: "2024-01-05",
    status: "in_progress",
    documentsCount: 3
  }
];

export default function ProjectsPage() {
  const headerActions = (
    <Link href="/projects/new">
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </Link>
  );

  return (
    <DashboardLayout 
      title="My Projects" 
      description="Manage your AI-generated development documentation projects"
      headerActions={headerActions}
    >
      {mockProjects.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="p-4 bg-muted/30 rounded-full mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Get started by creating your first AI-generated development documentation project.
          </p>
          <Link href="/projects/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Project
            </Button>
          </Link>
        </div>
      ) : (
        // Projects grid
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                    <Badge 
                      variant={project.status === "completed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {project.status === "completed" ? "Complete" : "In Progress"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{project.documentsCount} docs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load more button */}
          <div className="flex justify-center pt-6">
            <Button variant="outline">Load More Projects</Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}