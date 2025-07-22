"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Globe,
  Search,
  ArrowRight,
  ChevronDown,
  BarChart3,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Top Banner */}
      <div className="bg-muted/50 border-b px-4 py-2 text-center text-sm text-muted-foreground">
        Powered by World Bank Open Data API. Real-time economic insights.
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <span className="font-semibold text-lg">World Bank Explorer</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/countries">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">
              Now in early access
            </p>

            <h1 className="text-primary text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              The economic data
              <br />
              <span className="text-muted-foreground">
                {`you've been waiting for.`}
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/countries">
                <Button size="lg" className="text-base px-8">
                  Explore Countries
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Fast, comprehensive, reliable.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm">See what makes us different</span>
          <ChevronDown className="h-4 w-4 animate-bounce group-hover:animate-none" />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Comprehensive economic insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access real-time data from 200+ countries with powerful search and
              visualization tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  Find any country instantly by name, region, or ISO code with
                  intelligent filtering.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Historical Trends</CardTitle>
                <CardDescription>
                  Analyze up to 20 years of economic data with clean,
                  interactive visualizations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Data</CardTitle>
                <CardDescription>
                  {`Always up-to-date information directly from the World Bank's`}
                  official API.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Years of Data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2</div>
              <div className="text-sm text-muted-foreground">
                Key Indicators
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Reliable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Essential economic indicators
            </h2>
            <p className="text-xl text-muted-foreground">
              Focus on the metrics that matter most for economic analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Population Data</h3>
                  <p className="text-muted-foreground">
                    Total population by country
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Track demographic trends and population growth across all
                countries with historical data spanning decades.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">GDP per Capita</h3>
                  <p className="text-muted-foreground">
                    Economic output per person
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Analyze economic prosperity and living standards with GDP per
                capita data in current US dollars.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start exploring today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant access to comprehensive economic data from countries
            around the world.
          </p>
          <Link href="/countries">
            <Button size="lg" className="text-base px-8">
              Browse Countries
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Globe className="h-5 w-5" />
              <span className="font-semibold">World Bank Explorer</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://datahelpdesk.worldbank.org/knowledgebase/articles/889392"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                API Documentation
              </a>
              <span>Powered by World Bank Open Data</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
