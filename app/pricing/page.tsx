import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Starter",
    price: "¥20",
    credits: "10 Projects",
    pricePerProject: "¥2 per project",
    description: "Perfect for individual developers and small projects",
    features: [
      "10 AI-generated project documents",
      "All 5 document types included",
      "User Journey Maps",
      "Product Requirements Document (PRD)",
      "Frontend Design Document",
      "Backend Design Document", 
      "Database Design Document",
      "Download individual documents",
      "Basic email support",
      "30-day document access"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "¥40",
    credits: "30 Projects",
    pricePerProject: "¥1.33 per project",
    description: "Best for professional developers and teams",
    features: [
      "30 AI-generated project documents",
      "All 5 document types included",
      "User Journey Maps",
      "Product Requirements Document (PRD)",
      "Frontend Design Document",
      "Backend Design Document",
      "Database Design Document",
      "Download individual documents",
      "Batch ZIP downloads",
      "Priority email support",
      "90-day document access",
      "Project revision history",
      "Advanced AI customization"
    ],
    popular: true
  }
];

const documentTypes = [
  {
    title: "User Journey Maps",
    description: "Visual representation of user interactions and experiences throughout your application"
  },
  {
    title: "Product Requirements Document (PRD)",
    description: "Comprehensive specifications including features, user stories, and acceptance criteria"
  },
  {
    title: "Frontend Design Document",
    description: "UI/UX specifications, component libraries, and responsive design guidelines"
  },
  {
    title: "Backend Design Document", 
    description: "API specifications, system architecture, and backend service documentation"
  },
  {
    title: "Database Design Document",
    description: "Complete database schemas, relationships, and data modeling documentation"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-muted-foreground mb-6">
              <Sparkles className="w-4 h-4" />
              Simple & Transparent Pricing
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Choose Your Plan
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              No hidden fees, no subscriptions. Pay only for what you use.
              Each credit generates a complete set of 5 development documents.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg ring-2 ring-primary/10' : ''}`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground gap-1 px-4 py-1">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-5xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground ml-2">one-time</span>
                    </div>
                    <div className="text-lg font-semibold text-primary mb-1">
                      {tier.credits}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {tier.pricePerProject}
                    </div>
                    <CardDescription className="text-sm">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/auth/sign-up" className="block">
                      <Button 
                        className={`w-full gap-2 ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        variant={tier.popular ? "default" : "outline"}
                        size="lg"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Document Types Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                What You Get With Each Project
              </h2>
              <p className="text-lg text-muted-foreground">
                Every project credit generates a complete set of 5 comprehensive development documents
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((doc, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {doc.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do credits work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each credit allows you to generate one complete project with 5 comprehensive documents. 
                    Credits never expire and can be used at your own pace.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I download the documents?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! You can download individual documents or batch export as ZIP files. 
                    Professional plan includes additional export options.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What AI model powers the generation?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We use Claude Sonnet 4, one of the most advanced AI models, to ensure 
                    high-quality, accurate, and comprehensive documentation generation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}