import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VoiceProvider } from "@/components/VoiceProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthSelection from "./pages/AuthSelection";
import PatientAuth from "./pages/auth/PatientAuth";
import DoctorAuth from "./pages/auth/DoctorAuth";
import HospitalAuth from "./pages/auth/HospitalAuth";
import AshaWorkerAuth from "./pages/auth/AshaWorkerAuth";
import RelativeAuth from "./pages/auth/RelativeAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <VoiceProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthSelection />} />
              <Route path="/auth/patient" element={<PatientAuth />} />
              <Route path="/auth/doctor" element={<DoctorAuth />} />
              <Route path="/auth/hospital" element={<HospitalAuth />} />
              <Route path="/auth/asha-worker" element={<AshaWorkerAuth />} />
              <Route path="/auth/relative" element={<RelativeAuth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </VoiceProvider>
  </QueryClientProvider>
);

export default App;
