import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  ChevronDown,
  Home,
  Building2,
  Wrench,
  Cpu,
  LayoutGrid,
  ArrowRight,
  X,
  Factory,
  Users,
  Phone,
  Shield
} from "lucide-react";

const NavigationEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Apple-style scroll detection for navigation bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isActiveSection = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

  const mainNavItems = [
    { label: "Overview", href: "/", icon: LayoutGrid, description: "Complete NESS ecosystem" },
    { label: "Homeowners", href: "/homeowners", icon: Home, description: "NESS products for homes" },
    { label: "C&I", href: "/ci", icon: Building2, description: "POD & CUBE systems" },
    { label: "Installers", href: "/installers", icon: Wrench, description: "Partner with NESS" },
    { label: "Warranty", href: "/warranty", icon: Shield, description: "Trust that matters" },
    { label: "Technology", href: "/technology", icon: Cpu, description: "Innovation deep dive" }
  ];

  const companyItems = [
    { 
      label: "About Us", 
      href: "/company/about",
      description: "Our mission and vision"
    },
    { 
      label: "News", 
      href: "/company/news",
      description: "Latest updates and insights"
    }
  ];

  const supportItems = [
    { 
      label: "Knowledge Hub", 
      href: "/knowledge",
      description: "Learn about energy storage"
    },
    { 
      label: "Downloads", 
      href: "/downloads",
      description: "Specs, manuals, and resources"
    },
    { 
      label: "Support", 
      href: "/support/troubleshooting",
      description: "Get help with your system"
    }
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-border/20 shadow-lg' 
        : 'bg-background/80 backdrop-blur-sm'
      }
    `}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm -z-10 group-hover:blur-md transition-all"></div>
            </div>
            <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              NESS Energy
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  to={item.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(item.href)
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  {item.label}
                </Link>
                
                {/* Apple-style tooltip on hover */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-foreground text-background px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Company Dropdown */}
            <div className="relative group">
              <button className={`
                px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-all duration-200
                ${isActiveSection(["/company"])
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground group-hover:text-foreground group-hover:bg-muted/50"
                }
              `}>
                <span>Company</span>
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-xl border border-border/20 rounded-2xl p-3 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {companyItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      block p-3 rounded-xl transition-all duration-200 group/item
                      ${isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                      </div>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Support Dropdown */}
            <div className="relative group">
              <button className={`
                px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-all duration-200
                ${isActiveSection(["/knowledge", "/downloads", "/support"])
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground group-hover:text-foreground group-hover:bg-muted/50"
                }
              `}>
                <span>Support</span>
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-64 bg-background/95 backdrop-blur-xl border border-border/20 rounded-2xl p-3 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {supportItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      block p-3 rounded-xl transition-all duration-200 group/item
                      ${isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                      </div>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden lg:flex">
            <Link to="/contact/homeowner">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border/20">
                    <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-primary-foreground font-bold text-sm">N</span>
                      </div>
                      <span className="text-xl font-semibold">NESS Energy</span>
                    </Link>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-2">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-xl text-sm transition-colors hover:bg-muted/50 group"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-border/20">
                    <Link to="/contact/homeowner" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium">
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationEnhanced;