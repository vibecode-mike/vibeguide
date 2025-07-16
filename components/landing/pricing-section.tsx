import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Starter",
    price: "¥20",
    credits: "10 Projects",
    description: "Perfect for individual developers and small projects",
    features: [
      "10 AI-generated project documents",
      "All 5 document types included",
      "Download individual documents",
      "Basic support",
      "30-day document access"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "¥40",
    credits: "30 Projects",
    description: "Best for professional developers and teams",
    features: [
      "30 AI-generated project documents",
      "All 5 document types included",
      "Download individual documents",
      "Batch ZIP downloads",
      "Priority support",
      "90-day document access",
      "Project revision history"
    ],
    popular: true
  }
];

export function PricingSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no subscriptions.
            Pay only for what you use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingTiers.map((tier, index) => (
            <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
                <div className="text-lg font-semibold text-primary mb-2">
                  {tier.credits}
                </div>
                <CardDescription className="text-sm">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/auth/sign-up" className="block">
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include access to the same AI-powered documentation generation.
            <br />
            <Link href="/pricing" className="text-primary hover:underline">
              View detailed pricing comparison →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}