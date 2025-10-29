import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Star, CheckCircle, Users, ArrowRight, Sun, Battery, Settings } from "lucide-react";
import nessPodProduct from "@/assets-webp/ness-pod-product.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import nessHeroProduct from "@/assets/ness-hero-product.webp";

type EnergySetup = 'new-solar' | 'existing-solar' | 'backup-only' | 'custom' | null;

export const ConfiguratorSection = () => {
  const [step, setStep] = useState<'intro' | 'selector' | 'product' | 'summary'>('intro');
  const [selectedSetup, setSelectedSetup] = useState<EnergySetup>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSetupSelect = (setup: EnergySetup) => {
    setIsTransitioning(true);
    setSelectedSetup(setup);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
    }, 400);
  };

  const handleBackToSelector = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep('selector');
      setIsTransitioning(false);
    }, 200);
  };

  const handleBackToProduct = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep('product');
      setIsTransitioning(false);
    }, 200);
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

  const product = getProductForSetup();

  return (
    <section id="configurator" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="relative min-h-screen bg-gradient-to-b from-background/50 via-background/80 to-background">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen flex items-center justify-center px-6"
            >
              <div className="text-center space-y-12 max-w-4xl mx-auto">
                <div className="space-y-8">
                  <div className="relative w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-extralight tracking-[-0.03em] text-foreground leading-[0.95]">
                    Choose your NESS
                  </h2>
                  <p className="text-xl sm:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Because every home deserves intelligent energy.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setStep('selector')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-7 rounded-full text-lg font-medium shadow-xl transition-all duration-300"
                >
                  Begin
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'selector' && (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen py-20 px-6"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-6">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Step 1 of 3</p>
                  </div>
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-foreground tracking-[-0.02em] leading-[1.1]">
                    Your Energy Setup
                  </h2>
                  <p className="text-xl sm:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
                    How does your home get its power today?
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                  {[
                    { setup: 'new-solar', icon: Sun, color: 'amber', title: 'Planning new solar', desc: "I'm setting up solar soon and want an all-in-one system." },
                    { setup: 'existing-solar', icon: Battery, color: 'primary', title: 'Have existing solar', desc: 'I have solar panels and want to add backup power.' },
                    { setup: 'backup-only', icon: Shield, color: 'blue', title: 'Backup only', desc: 'No solar yet, just reliable backup power for now.' },
                    { setup: 'custom', icon: Settings, color: 'purple', title: 'Custom integration', desc: 'I have an existing inverter and want NESS batteries.' }
                  ].map(({ setup, icon: Icon, color, title, desc }, i) => (
                    <div
                      key={setup}
                      onClick={() => handleSetupSelect(setup as EnergySetup)}
                      className="group cursor-pointer relative bg-card backdrop-blur-xl rounded-3xl p-10 border border-border hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <div className="space-y-8">
                        <div className={`w-20 h-20 rounded-2xl bg-${color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-9 h-9 text-${color}-500`} />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-light text-foreground tracking-tight">{title}</h3>
                          <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">{desc}</p>
                        </div>
                        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'product' && (
            <motion.div
              key="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen py-20 px-6 flex items-center"
            >
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Perfect Match</p>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-extralight text-foreground mb-4">{product.name}</h2>
                  <p className="text-2xl text-muted-foreground font-light">{product.tagline}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/20">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-8">
                    <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                      <span className="text-sm text-primary">{product.badge}</span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                    
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Annual Savings</span>
                        <span className="font-medium">₹{product.savings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Backup Time</span>
                        <span className="font-medium">{product.backupHours} hours</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">Installation</span>
                        <span className="font-medium">{product.installation}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button onClick={() => setStep('summary')} className="flex-1">
                        Get Quote
                      </Button>
                      <Button onClick={handleBackToSelector} variant="outline">
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen py-20 px-6"
            >
              <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-5xl font-extralight">Perfect! Here's Your Setup</h2>
                  <p className="text-xl text-muted-foreground">You've selected the {product.name}</p>
                </div>

                <div className="bg-card rounded-3xl p-8 space-y-6 border border-border">
                  <h3 className="text-2xl font-light">Next Steps</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Free Consultation</h4>
                        <p className="text-sm text-muted-foreground">Speak with our energy experts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Custom Quote</h4>
                        <p className="text-sm text-muted-foreground">Get a detailed proposal for your home</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Professional Installation</h4>
                        <p className="text-sm text-muted-foreground">Installed in {product.installation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg">Request Quote</Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={handleBackToProduct}>
                    Back
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
