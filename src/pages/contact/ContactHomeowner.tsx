import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PerformanceImage } from "@/components/ui/performance-image";
import { Link } from "react-router-dom";
import { Shield, Zap, Home, Star, CheckCircle, Users, ArrowRight, Sun, Battery, Settings } from "lucide-react";
import heroImage from "@/assets/homeowner-hero-battery.webp";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets/ness-pod-product.png";
import nessProProduct from "@/assets/ness-pro-product.png";

type EnergySetup = 'new-solar' | 'existing-solar' | 'backup-only' | 'custom' | null;
const ContactHomeowner = () => {
  console.log('[ContactHomeowner] Component mounted');
  
  const [step, setStep] = useState<'intro' | 'selector' | 'product' | 'summary'>('intro');
  const [selectedSetup, setSelectedSetup] = useState<EnergySetup>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  console.log('[ContactHomeowner] Current step:', step, 'Selected setup:', selectedSetup);

  const handleSetupSelect = (setup: EnergySetup) => {
    console.log('[ContactHomeowner] Setup selected:', setup);
    setIsTransitioning(true);
    setSelectedSetup(setup);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
      console.log('[ContactHomeowner] Transitioned to product step');
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