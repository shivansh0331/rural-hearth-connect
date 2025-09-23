import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Heart, 
  Users, 
  MapPin, 
  Shield, 
  Zap, 
  MessageCircle, 
  Stethoscope,
  AlertTriangle,
  Activity,
  Clock,
  Globe
} from "lucide-react";
import heroImage from "@/assets/rural-telemedicine-hero.jpg";
import { EmergencyResponse } from "@/components/EmergencyResponse";
import { AIConsultation } from "@/components/AIConsultation";
import { HealthWorkerDashboard } from "@/components/HealthWorkerDashboard";
import { DoctorNetwork } from "@/components/DoctorNetwork";
import { IVRSimulator } from "@/components/IVRSimulator";
import { USSDMenu } from "@/components/USSDMenu";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "emergency":
        return <EmergencyResponse />;
      case "consultation":
        return <AIConsultation />;
      case "health-workers":
        return <HealthWorkerDashboard />;
      case "doctors":
        return <DoctorNetwork />;
      case "ivr":
        return <IVRSimulator />;
      case "ussd":
        return <USSDMenu />;
      default:
        return <HomePage />;
    }
  };

  const HomePage = () => (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80" />
        
        <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground">
          <Badge className="mb-6 bg-secondary text-secondary-foreground px-6 py-2 text-lg">
            SDG 3: Good Health & Well-being
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Village Health
            <br />
            <span className="bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
              Whisperer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            AI-Powered Rural Telemedicine Platform providing 24/7 healthcare access 
            through voice technology, connecting villages to qualified doctors
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3"
              onClick={() => setActiveSection("emergency")}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Emergency Response
            </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => setActiveSection("ivr")}
              >
                <Phone className="mr-2 h-5 w-5" />
                IVR System (*108)
              </Button>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              24/7 Available
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Multi-language Support
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Voice & Text Access
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Rural Healthcare Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridging the healthcare gap in rural communities through innovative AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <AlertTriangle className="h-8 w-8" />,
                title: "Emergency First Response",
                description: "Immediate AI-guided first aid with automatic ambulance and hospital alerts",
                color: "emergency"
              },
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: "AI Voice Doctor",
                description: "Multi-dialect voice consultation with symptom triage and treatment recommendations",
                color: "primary"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Health Worker Network",
                description: "Empowering ASHA/ANM workers with digital tools and training modules",
                color: "secondary"
              },
              {
                icon: <Stethoscope className="h-8 w-8" />,
                title: "Doctor Integration",
                description: "Verified doctor network with specialty matching and availability tracking",
                color: "primary"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Preventive Care",
                description: "Community health alerts, vaccination reminders, and outbreak detection",
                color: "success"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Offline-First Design",
                description: "Works without internet, syncs when connection is available",
                color: "secondary"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/10 text-${feature.color} w-fit mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Channel Access */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Multiple Ways to Access Care
            </h2>
            <p className="text-xl text-muted-foreground">
              Designed for all technology levels - from basic phones to smartphones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-primary/20">
              <CardHeader>
                <Phone className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>IVR Voice Calls</CardTitle>
                <CardDescription>
                  Simple dial-in number for voice consultation in local languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setActiveSection("consultation")}
                >
                  Try Voice Consultation
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-secondary/20">
              <CardHeader>
                <Activity className="h-12 w-12 mx-auto text-secondary mb-4" />
                <CardTitle>USSD Menu System</CardTitle>
                <CardDescription>
                  Step-by-step menu navigation for keypad phones without internet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => setActiveSection("ussd")}
                >
                  Access USSD (*108#)
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-success/20">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-success mb-4" />
                <CardTitle>Mobile App & Web</CardTitle>
                <CardDescription>
                  Full-featured app with maps, video calls, and health records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => setActiveSection("doctors")}
                >
                  Open Web Platform
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Making Real Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "24/7", label: "Emergency Response" },
              { number: "15%", label: "Reduction in Maternal Deaths" },
              { number: "100+", label: "Villages Connected" },
              { number: "50+", label: "Languages Supported" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Village Health Whisperer</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Button 
                variant={activeSection === "home" ? "default" : "ghost"}
                onClick={() => setActiveSection("home")}
              >
                Home
              </Button>
              <Button 
                variant={activeSection === "emergency" ? "default" : "ghost"}
                onClick={() => setActiveSection("emergency")}
              >
                Emergency
              </Button>
              <Button 
                variant={activeSection === "ivr" ? "default" : "ghost"}
                onClick={() => setActiveSection("ivr")}
              >
                IVR System
              </Button>
              <Button 
                variant={activeSection === "ussd" ? "default" : "ghost"}
                onClick={() => setActiveSection("ussd")}
              >
                USSD Menu
              </Button>
              <Button 
                variant={activeSection === "consultation" ? "default" : "ghost"}
                onClick={() => setActiveSection("consultation")}
              >
                AI Consultation
              </Button>
              <Button 
                variant={activeSection === "health-workers" ? "default" : "ghost"}
                onClick={() => setActiveSection("health-workers")}
              >
                Health Workers
              </Button>
              <Button 
                variant={activeSection === "doctors" ? "default" : "ghost"}
                onClick={() => setActiveSection("doctors")}
              >
                Doctor Network
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;