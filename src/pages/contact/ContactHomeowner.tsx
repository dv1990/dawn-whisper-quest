import { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PerformanceImage } from "@/components/ui/performance-image";
import { Shield, Zap, Home, Star, CheckCircle, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/homeowner-hero-battery.webp";

// Lazy load heavy configurator with animations
const ConfiguratorSection = lazy(() => import("@/components/homeowner/ConfiguratorSection").then(m => ({ default: m.ConfiguratorSection })));
const ContactHomeowner = () => {
  const [showConfigurator, setShowConfigurator] = useState(false);

  return <Layout>
      {/* Full-Screen Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <PerformanceImage
            src={heroImage}
            alt="Premium NESS home battery system with sophisticated wall-mount design"
            className="w-full h-full"
            priority={true}
          />
          {/* Dark overlay for text readability - concentrated on left side only */}
          <div className="absolute inset-y-0 left-0 right-1/2 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
                <span className="text-sm font-medium text-primary">Premium Home Energy</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.9] text-foreground">
                  Your life doesn't<br />
                  <span className="text-primary font-light">pause</span><br />
                  when the power does
                </h1>
                
                <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                  The new luxury isn't a louder generator.<br />
                  It's silence.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 text-sm backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground">Live monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-sm backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-foreground">10ms response time</span>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  onClick={() => {
                    setShowConfigurator(true);
                    setTimeout(() => {
                      document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                  aria-label="Start the product selection process to find your perfect NESS system"
                >
                  Find Your Perfect System
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stat Cards */}
        

        

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Philosophical Promise Section */}
      <section className="py-32 md:py-48 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-8 leading-tight tracking-tight">
            Your child's exam. Your work deadline.<br />
            <span className="text-muted-foreground">None of it stops.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground/80 font-light leading-relaxed max-w-2xl mx-auto mb-16">
            Life's most important moments happen at home. Your energy system should be invisible, reliable, and effortlessly elegant.
          </p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <div className="space-y-2">
              <div className="text-4xl font-extralight text-primary">99.97%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extralight text-primary">10ms</div>
              <div className="text-sm text-muted-foreground">Switch Response</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extralight text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Homes Protected</div>
              <div className="text-xs text-muted-foreground/60">Across India since 2020</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extralight text-primary">15yr</div>
              <div className="text-sm text-muted-foreground">Warranty Period</div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalised Design Section - Lazy Loaded */}
      {showConfigurator && (
        <Suspense fallback={
          <div className="py-32 flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ConfiguratorSection />
        </Suspense>
      )}

      {/* Why NESS - Refined Trust Section */}
      <section className="py-32 md:py-48 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
              Why Homeowners Choose NESS
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Clean energy is the new luxury. Here's what makes NESS different.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Silent Guardian */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-light mb-4">Silent Guardian</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your neighbors won't know you have backup power. Zero noise. Zero emissions. Pure peace.
                </p>
              </div>
            </div>

            {/* Instant Response */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-light mb-4">Instant Response</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Switches in 10 milliseconds. Your Wi-Fi doesn't drop. Your calls stay connected. Life continues.
                </p>
              </div>
            </div>

            {/* Whole Home Coverage */}
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-light mb-4">Whole Home Coverage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Run everything—AC, refrigerator, Wi-Fi—for 24+ hours. Not just "essentials." Everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 tracking-tight">
              Trusted by discerning homeowners across India
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Star Rating */}
            <div className="text-center p-6">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
              </div>
              <div className="text-3xl font-light mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>

            {/* BIS Certification */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-light mb-2">BIS Certified</div>
              <div className="text-sm text-muted-foreground">Government Approved</div>
            </div>

            {/* Homes Protected */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-light mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Homes Protected</div>
              <div className="text-xs text-muted-foreground/60 mt-1">Since 2020</div>
            </div>
          </div>

          {/* Customer Testimonial */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-lg text-center text-muted-foreground leading-relaxed mb-4">
                "What made me choose NESS was the silence. My generator used to wake the neighborhood. Now, nobody even knows when the power goes out. It's been flawless for 18 months."
              </blockquote>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Rajesh Malhotra</p>
                <p className="text-xs text-muted-foreground">Villa Owner • Bangalore</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/">
              <Button variant="outline" size="lg" className="rounded-full px-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Explore All NESS Systems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>;
};
export default ContactHomeowner;