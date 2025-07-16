import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span>VibeGuide</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered development documentation platform for programming beginners and professionals.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projects/new" className="hover:text-foreground transition-colors">
                  Create Project
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  My Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 VibeGuide. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <Link 
                href="https://supabase.com" 
                target="_blank" 
                className="font-medium hover:text-foreground transition-colors"
              >
                Supabase
              </Link>
              {" & "}
              <Link 
                href="https://anthropic.com" 
                target="_blank" 
                className="font-medium hover:text-foreground transition-colors"
              >
                Claude AI
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}