import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  Volume2, 
  Phone, 
  Languages, 
  Heart,
  ThermometerSun,
  Activity,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AIConsultation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Namaste! I am your AI Voice Doctor. How can I help you today? You can speak in Hindi, English, or your local language.",
      timestamp: new Date(),
      severity: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [patientInfo, setPatientInfo] = useState({
    symptoms: [],
    severity: null,
    recommendation: null
  });
  
  const { toast } = useToast();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" }
  ];

  const commonSymptoms = [
    { name: "Fever", severity: "moderate", icon: <ThermometerSun className="h-4 w-4" /> },
    { name: "Headache", severity: "mild", icon: <Activity className="h-4 w-4" /> },
    { name: "Cough", severity: "mild", icon: <Heart className="h-4 w-4" /> },
    { name: "Chest Pain", severity: "high", icon: <Heart className="h-4 w-4" /> },
    { name: "Difficulty Breathing", severity: "high", icon: <Activity className="h-4 w-4" /> },
    { name: "Stomach Pain", severity: "moderate", icon: <Activity className="h-4 w-4" /> },
    { name: "Dizziness", severity: "moderate", icon: <Activity className="h-4 w-4" /> },
    { name: "Nausea", severity: "mild", icon: <Activity className="h-4 w-4" /> }
  ];

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Speak clearly about your symptoms",
      });
      
      // Simulate voice recognition
      setTimeout(() => {
        setIsRecording(false);
        const simulatedInput = "I have been having fever and headache for 2 days";
        handleAIResponse(simulatedInput);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleTextInput = () => {
    if (inputMessage.trim()) {
      handleAIResponse(inputMessage);
      setInputMessage("");
    }
  };

  const handleSymptomClick = (symptom) => {
    const message = `I am experiencing ${symptom.name.toLowerCase()}`;
    handleAIResponse(message);
  };

  const handleAIResponse = (userMessage) => {
    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: "user",
      content: userMessage,
      timestamp: new Date(),
      severity: null
    };
    
    setMessages(prev => [...prev, userMsg]);

    // Simulate AI processing and response
    setTimeout(() => {
      let aiResponse = "";
      let severity = "mild";
      let recommendation = "";

      if (userMessage.toLowerCase().includes("fever") && userMessage.toLowerCase().includes("headache")) {
        aiResponse = "I understand you have fever and headache for 2 days. This could be a viral infection. Let me ask a few more questions. Do you have body aches? Any throat pain?";
        severity = "moderate";
        recommendation = "Monitor symptoms, take paracetamol for fever, drink plenty of fluids";
      } else if (userMessage.toLowerCase().includes("chest pain")) {
        aiResponse = "Chest pain can be serious. Is the pain sharp or dull? Does it worsen with breathing? I recommend immediate consultation with a doctor.";
        severity = "high";
        recommendation = "Immediate doctor consultation required";
      } else if (userMessage.toLowerCase().includes("breathing")) {
        aiResponse = "Difficulty breathing is concerning. How long have you had this? Are you able to speak in full sentences? This requires urgent medical attention.";
        severity = "high";
        recommendation = "Emergency medical attention required";
      } else {
        aiResponse = "I understand your concern. Can you tell me more about when the symptoms started and their severity from 1-10?";
        severity = "mild";
        recommendation = "Continue monitoring symptoms";
      }

      const aiMsg = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
        severity
      };

      setMessages(prev => [...prev, aiMsg]);
      
      // Update patient info
      setPatientInfo({
        symptoms: userMessage.toLowerCase().includes("fever") ? ["fever", "headache"] : [],
        severity,
        recommendation
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-primary/5">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary text-primary-foreground rounded-full">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">AI Voice Consultation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Speak with our AI doctor in your preferred language for instant health guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Language & Quick Symptoms */}
          <div className="space-y-6">
            {/* Language Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Select Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={currentLanguage === lang.name ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setCurrentLanguage(lang.name)}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Symptoms */}
            <Card>
              <CardHeader>
                <CardTitle>Common Symptoms</CardTitle>
                <CardDescription>Click on a symptom for quick consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Button
                      key={symptom.name}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleSymptomClick(symptom)}
                    >
                      {symptom.icon}
                      <span className="ml-2">{symptom.name}</span>
                      <Badge 
                        variant={symptom.severity === "high" ? "destructive" : 
                                symptom.severity === "moderate" ? "secondary" : "outline"}
                        className="ml-auto"
                      >
                        {symptom.severity}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Assessment */}
            {patientInfo.severity && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Current Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Severity Level:</span>
                    <Badge 
                      variant={patientInfo.severity === "high" ? "destructive" : 
                              patientInfo.severity === "moderate" ? "secondary" : "outline"}
                      className="ml-2"
                    >
                      {patientInfo.severity}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Recommendation:</span>
                    <p className="text-sm text-muted-foreground mt-1">{patientInfo.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI Doctor Consultation</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Available 24/7
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Currently speaking in: <strong>{currentLanguage}</strong>
                </CardDescription>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === "ai" && (
                          <Button variant="ghost" size="sm">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="p-6 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your symptoms or health concerns..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTextInput()}
                  />
                  <Button onClick={handleTextInput} disabled={!inputMessage.trim()}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleVoiceInput}
                    className={isRecording ? "bg-emergency animate-pulse" : ""}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {isRecording ? "Listening... Speak now" : "Click microphone to speak or type your message"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};