import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Palette, 
  Server, 
  Database, 
  Sparkles,
  Clock,
  Download
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "User Journey Maps",
    description: "Visualize user flows and interactions to understand your users' needs and pain points.",
    badge: "UX Design"
  },
  {
    icon: FileText,
    title: "Product Requirements",
    description: "Comprehensive PRDs with feature specifications, acceptance criteria, and user stories.",
    badge: "Documentation"
  },
  {
    icon: Palette,
    title: "Frontend Design",
    description: "Detailed UI/UX specifications, component libraries, and responsive design guidelines.",
    badge: "Frontend"
  },
  {
    icon: Server,
    title: "Backend Architecture",
    description: "API specifications, system architecture, and backend service documentation.",
    badge: "Backend"
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Complete database schemas, relationships, and data modeling documentation.",
    badge: "Database"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Intelligent document generation powered by Claude AI for accurate and comprehensive results.",
    badge: "AI"
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Generate weeks of documentation work in minutes with our intelligent AI assistant.",
    badge: "Productivity"
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Download individual documents or batch export as ZIP files for easy sharing.",
    badge: "Export"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to Start Building
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate comprehensive development documentation with AI assistance. 
            From concept to implementation, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}