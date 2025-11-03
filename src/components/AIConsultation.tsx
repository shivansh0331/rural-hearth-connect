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
  Clock,
  VolumeX,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "./VoiceProvider";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

export const AIConsultation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Namaste! I am your AI Medical Assistant. How can I help you today? You can speak in Hindi, English, or your local language to describe your symptoms.",
      timestamp: new Date(),
      severity: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    symptoms: [],
    severity: null,
    recommendation: null
  });
  
  const { toast } = useToast();
  const { speakText, isPlaying, stopSpeech, currentLanguage, setCurrentLanguage } = useVoice();
  const recognition = useRef<SpeechRecognition | null>(null);
  const conversationHistory = useRef<Array<{role: string, content: string}>>([]);

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
    if (!isListening && recognition.current) {
      setIsListening(true);
      const langMap: Record<string, string> = {
        "English": "en-US",
        "हिंदी (Hindi)": "hi-IN",
        "বাংলা (Bengali)": "bn-BD",
        "తెలుగు (Telugu)": "te-IN",
        "தமிழ் (Tamil)": "ta-IN",
        "मराठी (Marathi)": "mr-IN",
        "ગુજરાતી (Gujarati)": "gu-IN"
      };
      recognition.current.lang = langMap[currentLanguage] || "en-US";
      recognition.current.start();
      
      toast({
        title: "Listening...",
        description: "Speak clearly about your symptoms",
      });
    } else if (isListening && recognition.current) {
      recognition.current.stop();
      setIsListening(false);
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

  const handleAIResponse = async (userMessage: string) => {
    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: "user",
      content: userMessage,
      timestamp: new Date(),
      severity: null
    };
    
    setMessages(prev => [...prev, userMsg]);
    conversationHistory.current.push({ role: "user", content: userMessage });
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('medical-consultation', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory.current
        }
      });

      if (error) throw error;

      // Create placeholder for AI response
      const aiMsgId = messages.length + 2;
      let aiResponse = "";
      let severity = "mild";

      const streamUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/medical-consultation`;
      const response = await fetch(streamUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.current
        })
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get AI response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              aiResponse += content;
              
              // Update or create AI message
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg?.type === "ai" && lastMsg.id === aiMsgId) {
                  return prev.map(msg => 
                    msg.id === aiMsgId 
                      ? { ...msg, content: aiResponse }
                      : msg
                  );
                }
                return [...prev, {
                  id: aiMsgId,
                  type: "ai",
                  content: aiResponse,
                  timestamp: new Date(),
                  severity
                }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Determine severity from response
      const lowerResponse = aiResponse.toLowerCase();
      if (lowerResponse.includes("emergency") || lowerResponse.includes("urgent") || lowerResponse.includes("immediately")) {
        severity = "high";
      } else if (lowerResponse.includes("doctor") || lowerResponse.includes("clinic") || lowerResponse.includes("consult")) {
        severity = "moderate";
      }

      // Update final message with severity
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, severity }
            : msg
        )
      );

      // Extract recommendation
      let recommendation = "Follow the advice provided";
      if (severity === "high") {
        recommendation = "Seek immediate medical attention";
      } else if (severity === "moderate") {
        recommendation = "Consult a doctor soon";
      }

      setPatientInfo({
        symptoms: [userMessage.slice(0, 50)],
        severity,
        recommendation
      });

      conversationHistory.current.push({ role: "assistant", content: aiResponse });
      
    } catch (error) {
      console.error("AI consultation error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
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
                      {message.type === "ai" ? (
                        <div className="prose prose-sm max-w-none leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
                              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="font-medium leading-relaxed">
                          {message.content}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === "ai" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => speakText(message.content)}
                            disabled={isPlaying}
                          >
                            {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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
                  <Button onClick={handleTextInput} disabled={!inputMessage.trim() || isProcessing}>
                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={handleVoiceInput}
                    disabled={!recognition.current || isProcessing}
                    className={isListening ? "bg-emergency animate-pulse" : ""}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {isListening ? "Listening... Speak now" : 
                   !recognition.current ? "Voice recognition not supported" :
                   "Click microphone to speak or type your message"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};