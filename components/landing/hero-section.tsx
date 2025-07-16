import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-muted-foreground mb-6">
          <Zap className="w-4 h-4" />
          AI-Powered Development Documentation
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Transform Ideas into
          <br />
          Complete Development Plans
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Generate comprehensive project documentation with AI assistance. From user journey maps to database designs, 
          get everything you need to start building your next project.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/projects/new">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Pricing
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-muted-foreground">
          <p>✨ Generate 5 comprehensive documents in minutes</p>
        </div>
      </div>
    </section>
  );
}