import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PerformanceImage } from "@/components/ui/performance-image";
import { Link } from "react-router-dom";
import { Shield, Zap, Home, Star, CheckCircle, Users, ArrowRight, Sun, Battery, Settings } from "lucide-react";
import heroImage from "@/assets/homeowner-hero-battery.webp";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets-webp/ness-pod-product.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";

// Lazy load below-the-fold sections
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));
const PhilosophicalSection = lazy(() => import("@/components/homeowner/PhilosophicalSection").then(m => ({ default: m.PhilosophicalSection })));
const BelowFoldSections = lazy(() => import("@/components/homeowner/BelowFoldSections").then(m => ({ default: m.BelowFoldSections })));

type EnergySetup = 'new-solar' | 'existing-solar' | 'backup-only' | 'custom' | null;
const ContactHomeowner = () => {
  const [step, setStep] = useState<'intro' | 'selector' | 'product' | 'summary'>('intro');
  const [selectedSetup, setSelectedSetup] = useState<EnergySetup>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSetupSelect = (setup: EnergySetup) => {
    setIsTransitioning(true);
    setSelectedSetup(setup);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
    }, 600);
  };

  const handleBackToSelector = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep('selector');
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToProduct = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
    }, 300);
  };

  const getProductForSetup = () => {
    switch (selectedSetup) {
      case 'new-solar':
        return {
          name: 'NESS AIO',
          tagline: 'Own your sunlight.',
          description: 'The all-in-one hybrid system that learns your energy rhythm and slashes monthly bills.',
          image: nessHeroProduct,
          badge: 'Perfect for new solar installations',
          savings: 4000,
          backupHours: '8-12',
          installation: '1 day',
        };
      case 'existing-solar':
        return {
          name: 'NESS AC Brick',
          tagline: 'Never waste another ray.',
          description: 'Unlock backup power and use your solar energy even during outages.',
          image: nessPodProduct,
          badge: 'Installed in under 3 hours',
          savings: 2450,
          backupHours: '6-8',
          installation: '3 hours',
        };
      case 'backup-only':
        return {
          name: 'NESS UPS',
          tagline: "Because power shouldn't skip a beat.",
          description: 'High-fidelity power for gamers, audiophiles, and professionals who demand perfection.',
          image: nessProProduct,
          badge: '2 units ≈ 10 kWh ≈ 8 hours of essentials',
          savings: 1800,
          backupHours: '8-10',
          installation: '2 hours',
        };
      default:
        return {
          name: 'Battery Integration',
          tagline: 'Freedom to integrate.',
          description: 'Connect NESS batteries to your existing inverter ecosystem.',
          image: nessPodProduct,
          badge: 'Works with Victron, Studer, Solis & more',
          savings: 2200,
          backupHours: '6-10',
          installation: '4 hours',
        };
    }
  };

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
                    setStep('selector');
                    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Lazy load below-the-fold sections */}
      <Suspense fallback={<div className="min-h-[400px] bg-gradient-to-b from-background to-muted/20" />}>
        <LazySection>
          <PhilosophicalSection />
        </LazySection>
      </Suspense>

      {/* Personalised Design Section - Cinematic Selector */}
      <section id="configurator" className="py-20 md:py-32 relative overflow-hidden">
        {/* Premium Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        
        <div className="relative min-h-screen bg-gradient-to-b from-background/50 via-background/80 to-background">
          <AnimatePresence mode="wait">
            {/* STEP 0: Opening Scene */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="min-h-screen flex items-center justify-center px-6"
              >
                <div className="text-center space-y-12 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="space-y-8"
                  >
                    <div className="relative w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse blur-sm"></div>
                    </div>
                    <h2 className="text-6xl sm:text-7xl md:text-8xl font-extralight tracking-[-0.03em] text-foreground leading-[0.95]">
                      Choose your NESS
                    </h2>
                    <p className="text-xl sm:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
                      Because every home deserves intelligent energy.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => setStep('selector')}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-7 rounded-full text-lg font-medium shadow-[0_0_40px_rgba(0,200,83,0.3)] hover:shadow-[0_0_60px_rgba(0,200,83,0.5)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Begin the product selection process"
                    >
                      Begin
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: Energy Setup Selector */}
            {step === 'selector' && (
              <motion.div
                key="selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="min-h-screen py-20 px-6"
              >
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-6"
                  >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.6)]"></div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Step 1 of 3</p>
                    </div>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground tracking-[-0.02em] leading-[1.1]">
                      Your Energy Setup
                    </h2>
                    <p className="text-xl sm:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
                      How does your home get its power today?
                    </p>
                  </motion.div>

                  {isTransitioning && (
                    <div className="flex justify-center mb-12">
                      <div className="relative">
                        <div className="w-12 h-12 border-2 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                    {/* Card 1: New Solar */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -12 }}
                      onClick={() => handleSetupSelect('new-solar')}
                      onKeyDown={(e) => e.key === 'Enter' && handleSetupSelect('new-solar')}
                      tabIndex={0}
                      role="button"
                      aria-label="Select new solar installation option"
                      className="group cursor-pointer relative bg-gradient-to-br from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-[2rem] p-10 border border-border/40 hover:border-amber-500/40 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:ring-offset-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(251,146,60,0.15)]"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative space-y-8">
                        <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(251,146,60,0.12)] group-hover:shadow-[0_12px_32px_rgba(251,146,60,0.25)]">
                          <Sun className="w-9 h-9 text-amber-500 drop-shadow-[0_2px_8px_rgba(251,146,60,0.3)]" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-light text-foreground tracking-tight">Planning new solar</h3>
                          <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                            I'm setting up solar soon and want an all-in-one system.
                          </p>
                        </div>
                        <div className="pt-2 flex items-center gap-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 2: Existing Solar */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -12 }}
                      onClick={() => handleSetupSelect('existing-solar')}
                      onKeyDown={(e) => e.key === 'Enter' && handleSetupSelect('existing-solar')}
                      tabIndex={0}
                      role="button"
                      aria-label="Select existing solar with backup option"
                      className="group cursor-pointer relative bg-gradient-to-br from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-[2rem] p-10 border border-border/40 hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,200,83,0.15)]"
                    >
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative space-y-8">
                        <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-primary/20 via-emerald-500/15 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(0,200,83,0.12)] group-hover:shadow-[0_12px_32px_rgba(0,200,83,0.25)]">
                          <Zap className="w-9 h-9 text-primary drop-shadow-[0_2px_8px_rgba(0,200,83,0.3)]" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-light text-foreground tracking-tight">Already have solar</h3>
                          <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                            I have solar panels on my roof and need backup power.
                          </p>
                        </div>
                        <div className="pt-2 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 3: Backup Only */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -12 }}
                      onClick={() => handleSetupSelect('backup-only')}
                      onKeyDown={(e) => e.key === 'Enter' && handleSetupSelect('backup-only')}
                      tabIndex={0}
                      role="button"
                      aria-label="Select backup power only option"
                      className="group cursor-pointer relative bg-gradient-to-br from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-[2rem] p-10 border border-border/40 hover:border-blue-500/40 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]"
                    >
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative space-y-8">
                        <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(59,130,246,0.12)] group-hover:shadow-[0_12px_32px_rgba(59,130,246,0.25)]">
                          <Battery className="w-9 h-9 text-blue-500 drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)]" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-light text-foreground tracking-tight">Need backup only</h3>
                          <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                            I just want reliable backup power during outages.
                          </p>
                        </div>
                        <div className="pt-2 flex items-center gap-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 4: Custom */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      whileHover={{ scale: 1.03, y: -12 }}
                      onClick={() => handleSetupSelect('custom')}
                      onKeyDown={(e) => e.key === 'Enter' && handleSetupSelect('custom')}
                      tabIndex={0}
                      role="button"
                      aria-label="Select custom inverter integration option"
                      className="group cursor-pointer relative bg-gradient-to-br from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-[2rem] p-10 border border-border/40 hover:border-purple-500/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:ring-offset-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)]"
                    >
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative space-y-8">
                        <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_24px_rgba(168,85,247,0.12)] group-hover:shadow-[0_12px_32px_rgba(168,85,247,0.25)]">
                          <Settings className="w-9 h-9 text-purple-500 drop-shadow-[0_2px_8px_rgba(168,85,247,0.3)]" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-light text-foreground tracking-tight">Other / Custom</h3>
                          <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                            I have my own inverter setup (Victron, Studer, etc.).
                          </p>
                        </div>
                        <div className="pt-2 flex items-center gap-2 text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Product Revelation */}
            {step === 'product' && selectedSetup && (
              <motion.div
                key="product"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="min-h-screen py-20 px-6 flex items-center"
              >
                <div className="max-w-6xl mx-auto w-full">
                  {(() => {
                    const product = getProductForSetup();
                    return (
                      <div className="space-y-16">
                        {/* Back Button */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-start"
                        >
                          <button
                            onClick={handleBackToSelector}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                            aria-label="Go back to energy setup selection"
                          >
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Back to options</span>
                          </button>
                        </motion.div>
                        {/* Product Image */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.8 }}
                          className="max-w-2xl mx-auto"
                        >
                          <PerformanceImage
                            src={product.image}
                            alt={product.name}
                            className="w-full drop-shadow-2xl"
                            priority={true}
                          />
                        </motion.div>

                        {/* Product Details */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="text-center space-y-8"
                        >
                          <div className="space-y-4">
                            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground tracking-tight">
                              {product.name}
                            </h2>
                            <p className="text-2xl sm:text-3xl text-primary font-light">
                              {product.tagline}
                            </p>
                            <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                              {product.description}
                            </p>
                          </div>

                          <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                            <p className="text-sm text-primary font-medium">{product.badge}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button
                              size="lg"
                              onClick={() => setStep('summary')}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-full text-lg font-medium shadow-[0_0_40px_rgba(0,200,83,0.3)] hover:shadow-[0_0_60px_rgba(0,200,83,0.5)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              See Details & Pricing
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={handleBackToSelector}
                              className="border-2 border-border/50 hover:border-primary/50 px-10 py-6 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              View Other Options
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Summary Screen */}
            {step === 'summary' && selectedSetup && (
              <motion.div
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="min-h-screen py-20 px-6 flex items-center"
              >
                <div className="max-w-5xl mx-auto w-full">
                  {(() => {
                    const product = getProductForSetup();
                    return (
                      <div className="space-y-12">
                        {/* Back Button */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-start"
                        >
                          <button
                            onClick={handleBackToProduct}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                            aria-label="Go back to product details"
                          >
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Back</span>
                          </button>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center space-y-4"
                        >
                          <p className="text-sm uppercase tracking-widest text-primary">Step 3 of 3 • Your Perfect Match</p>
                          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground">
                            {product.name}
                          </h2>
                        </motion.div>

                        {/* Summary Card */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-card/80 backdrop-blur-xl rounded-3xl p-12 border border-border/50 shadow-2xl"
                        >
                          <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center space-y-2">
                              <p className="text-sm text-muted-foreground uppercase tracking-wider">Estimated Savings*</p>
                              <p className="text-4xl font-light text-primary">₹ {product.savings.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">per month</p>
                            </div>
                            <div className="text-center space-y-2">
                              <p className="text-sm text-muted-foreground uppercase tracking-wider">Backup Time</p>
                              <p className="text-4xl font-light text-primary">{product.backupHours}</p>
                              <p className="text-xs text-muted-foreground">hours</p>
                            </div>
                            <div className="text-center space-y-2">
                              <p className="text-sm text-muted-foreground uppercase tracking-wider">Installation</p>
                              <p className="text-4xl font-light text-primary">{product.installation}</p>
                              <p className="text-xs text-muted-foreground">professional setup</p>
                            </div>
                          </div>

                          <div className="border-t border-border/30 pt-8 space-y-4 text-center">
                            <p className="text-muted-foreground">
                              Smart monitoring included • 15-year warranty • Expert support
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                              *Based on typical 5kW system with 8 hours daily grid outage. Actual savings vary by usage and location.
                            </p>
                          </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                          <Button
                            size="lg"
                            onClick={() => (window.location.href = '/contact/homeowner')}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-7 rounded-full text-lg font-medium shadow-[0_0_40px_rgba(0,200,83,0.3)] hover:shadow-[0_0_60px_rgba(0,200,83,0.5)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Get Instant Quote
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => (window.location.href = '/contact')}
                            className="border-2 border-border/50 hover:border-primary/50 px-12 py-7 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Talk to Expert
                          </Button>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-center"
                        >
                          <button
                            onClick={() => {
                              setSelectedSetup(null);
                              setStep('intro');
                            }}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                          >
                            Start over
                          </button>
                        </motion.div>

                        {/* Tagline */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-center space-y-2 pt-8"
                        >
                          <p className="text-lg text-muted-foreground font-light">
                            NESS — Clean energy, beautifully built.
                          </p>
                          <p className="text-sm text-muted-foreground/60">
                            Engineered in India. Designed for life.
                          </p>
                        </motion.div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lazy load below-the-fold sections */}
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <LazySection>
          <BelowFoldSections />
        </LazySection>
      </Suspense>
    </Layout>;
  };
export default ContactHomeowner;