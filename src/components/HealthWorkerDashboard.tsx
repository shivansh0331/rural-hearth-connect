import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Plus, 
  Search, 
  BookOpen, 
  TrendingUp, 
  MapPin, 
  Phone,
  CheckCircle,
  AlertCircle,
  Calendar,
  Activity
} from "lucide-react";

export const HealthWorkerDashboard = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      age: 28,
      village: "Ramgarh",
      condition: "Pregnancy - 7 months",
      lastVisit: "2 days ago",
      priority: "high",
      phone: "+91 9876543210"
    },
    {
      id: 2,
      name: "Ram Kumar",
      age: 45,
      village: "Govindpur",
      condition: "Diabetes monitoring",
      lastVisit: "1 week ago",
      priority: "medium",
      phone: "+91 9876543211"
    },
    {
      id: 3,
      name: "Sunita Devi",
      age: 35,
      village: "Ramgarh",
      condition: "Hypertension",
      lastVisit: "3 days ago",
      priority: "medium",
      phone: "+91 9876543212"
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    village: "",
    phone: "",
    condition: ""
  });

  const trainingModules = [
    {
      title: "Basic Health Assessment",
      progress: 100,
      duration: "45 min",
      status: "completed"
    },
    {
      title: "Maternal Health Care",
      progress: 75,
      duration: "60 min",
      status: "in-progress"
    },
    {
      title: "Child Vaccination Schedule",
      progress: 100,
      duration: "30 min",
      status: "completed"
    },
    {
      title: "Emergency First Aid",
      progress: 40,
      duration: "90 min",
      status: "in-progress"
    },
    {
      title: "Digital Health Records",
      progress: 0,
      duration: "35 min",
      status: "not-started"
    }
  ];

  const healthAlerts = [
    {
      id: 1,
      type: "outbreak",
      message: "Dengue cases reported in nearby villages - increase surveillance",
      severity: "high",
      date: "Today"
    },
    {
      id: 2,
      type: "vaccination",
      message: "Polio vaccination drive scheduled for next week",
      severity: "medium",
      date: "Tomorrow"
    },
    {
      id: 3,
      type: "weather",
      message: "Heavy rains expected - prepare for waterborne diseases",
      severity: "medium",
      date: "2 days ago"
    }
  ];

  const addPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.village) {
      setPatients([...patients, {
        id: patients.length + 1,
        ...newPatient,
        age: parseInt(newPatient.age),
        lastVisit: "Today",
        priority: "medium"
      }]);
      setNewPatient({ name: "", age: "", village: "", phone: "", condition: "" });
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-secondary text-secondary-foreground rounded-full">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">ASHA Worker Dashboard</h1>
              <p className="text-xl text-muted-foreground">Empowering community health workers with digital tools</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">{patients.length}</div>
                <div className="text-sm text-muted-foreground">Active Patients</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-secondary">8</div>
                <div className="text-sm text-muted-foreground">Visits This Week</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success">95%</div>
                <div className="text-sm text-muted-foreground">Training Complete</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-warning">2</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="training">Training Modules</TabsTrigger>
            <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
            <TabsTrigger value="reports">Community Reports</TabsTrigger>
          </TabsList>

          {/* Patient Management */}
          <TabsContent value="patients">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add New Patient */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Patient
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Patient Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  />
                  <Input
                    placeholder="Village"
                    value={newPatient.village}
                    onChange={(e) => setNewPatient({...newPatient, village: e.target.value})}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  />
                  <Textarea
                    placeholder="Health Condition"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                    rows={2}
                  />
                  <Button onClick={addPatient} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </CardContent>
              </Card>

              {/* Patient List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Search patients..." />
                  </div>
                </div>

                {patients.map((patient) => (
                  <Card key={patient.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{patient.name}</h3>
                            <Badge 
                              variant={patient.priority === "high" ? "destructive" : "secondary"}
                            >
                              {patient.priority}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4" />
                              Age: {patient.age}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {patient.village}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {patient.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Last visit: {patient.lastVisit}
                            </div>
                          </div>
                          
                          <p className="mt-3 text-sm font-medium">{patient.condition}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Training Modules */}
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Training & Skill Development
                </CardTitle>
                <CardDescription>
                  Complete training modules to enhance your healthcare skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trainingModules.map((module, index) => (
                    <Card key={index} className="border border-border">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold mb-1">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">Duration: {module.duration}</p>
                          </div>
                          <Badge 
                            variant={
                              module.status === "completed" ? "secondary" :
                              module.status === "in-progress" ? "default" : "outline"
                            }
                          >
                            {module.status === "completed" ? "Completed" :
                             module.status === "in-progress" ? "In Progress" : "Not Started"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm font-medium">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                          
                          <Button 
                            variant={module.status === "completed" ? "outline" : "default"}
                            className="w-full mt-4"
                          >
                            {module.status === "completed" ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Review Module
                              </>
                            ) : module.status === "in-progress" ? (
                              <>
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Continue Learning
                              </>
                            ) : (
                              <>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Start Module
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Alerts */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Community Health Alerts
                </CardTitle>
                <CardDescription>
                  Stay updated with important health information for your area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthAlerts.map((alert) => (
                  <Card 
                    key={alert.id} 
                    className={`border-l-4 ${
                      alert.severity === "high" ? "border-l-emergency" : "border-l-warning"
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge 
                              variant={alert.severity === "high" ? "destructive" : "secondary"}
                            >
                              {alert.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{alert.date}</span>
                          </div>
                          <p className="font-medium">{alert.message}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Mark Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Reports */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Health Report</CardTitle>
                  <CardDescription>Generate reports for your assigned area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">25</div>
                      <div className="text-sm text-muted-foreground">Consultations</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Referrals</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">8</div>
                      <div className="text-sm text-muted-foreground">Follow-ups</div>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg">
                      <div className="text-2xl font-bold text-warning">3</div>
                      <div className="text-sm text-muted-foreground">Emergency Cases</div>
                    </div>
                  </div>
                  <Button className="w-full">
                    Generate Full Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Village Health Status</CardTitle>
                  <CardDescription>Overview of your assigned villages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Ramgarh", "Govindpur", "Maheshpur"].map((village) => (
                    <div key={village} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{village}</div>
                        <div className="text-sm text-muted-foreground">Population: 2,500</div>
                      </div>
                      <Badge variant="secondary">Good Health</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};