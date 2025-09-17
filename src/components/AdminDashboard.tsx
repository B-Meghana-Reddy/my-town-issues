import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter, TrendingUp, Users, MapPin, Clock, AlertTriangle, CheckCircle, Eye, Sparkles, BarChart, Target, Zap, ArrowRight } from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Mock data for demonstration
  const issues = [
    {
      id: "CIV-2024-001234",
      title: "Large pothole causing vehicle damage",
      category: "Pothole",
      location: "Main St & 1st Ave",
      status: "In Progress",
      priority: "High",
      date: "2024-01-15",
      assignedTo: "Public Works",
      description: "Deep pothole causing damage to vehicles, needs immediate attention",
      reporterContact: "sarah.johnson@email.com",
      estimatedCompletion: "2024-01-17"
    },
    {
      id: "CIV-2024-001235",
      title: "Broken streetlight creating safety hazard",
      category: "Streetlight",
      location: "Central Park, North Entrance",
      status: "Resolved",
      priority: "Medium",
      date: "2024-01-14",
      assignedTo: "Electrical Dept",
      description: "Streetlight flickering and unsafe for pedestrians at night",
      reporterContact: "mike.rodriguez@email.com",
      estimatedCompletion: "Completed"
    },
    {
      id: "CIV-2024-001236",
      title: "Graffiti vandalism on public building",
      category: "Graffiti",
      location: "City Hall, West Wall",
      status: "Pending",
      priority: "Low",
      date: "2024-01-13",
      assignedTo: "Maintenance",
      description: "Large graffiti tag requiring professional cleaning",
      reporterContact: "anna.kim@email.com",
      estimatedCompletion: "2024-01-20"
    },
    {
      id: "CIV-2024-001237",
      title: "Overflowing waste bin attracting pests",
      category: "Trash/Litter",
      location: "Bus Stop, Oak Avenue",
      status: "Urgent",
      priority: "High",
      date: "2024-01-15",
      assignedTo: "Sanitation",
      description: "Trash bin overflowing for several days, creating health hazard",
      reporterContact: "robert.chen@email.com",
      estimatedCompletion: "2024-01-16"
    }
  ];

  const departments = [
    { 
      name: "Public Works", 
      active: 12, 
      completed: 45, 
      efficiency: 92,
      responseTime: "2.1 days",
      color: "primary"
    },
    { 
      name: "Sanitation", 
      active: 8, 
      completed: 23, 
      efficiency: 88,
      responseTime: "1.8 days",
      color: "success"
    },
    { 
      name: "Electrical Dept", 
      active: 3, 
      completed: 18, 
      efficiency: 95,
      responseTime: "1.2 days",
      color: "warning"
    },
    { 
      name: "Maintenance", 
      active: 15, 
      completed: 31, 
      efficiency: 85,
      responseTime: "3.1 days",
      color: "error"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success text-success-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Pending": return "bg-muted text-muted-foreground";
      case "Urgent": return "bg-error text-error-foreground pulse-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-error text-error-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDepartmentColor = (color: string) => {
    switch (color) {
      case "primary": return "text-primary bg-primary/10 border-primary/20";
      case "success": return "text-success bg-success/10 border-success/20";
      case "warning": return "text-warning bg-warning/10 border-warning/20";
      case "error": return "text-error bg-error/10 border-error/20";
      default: return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filterStatus !== "all" && issue.status.toLowerCase().replace(" ", "-") !== filterStatus) return false;
    if (filterCategory !== "all" && issue.category.toLowerCase().replace("/", "-") !== filterCategory) return false;
    if (filterPriority !== "all" && issue.priority.toLowerCase() !== filterPriority) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Enhanced Header */}
      <div className="glass border-b border-border sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="hover-lift group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-smooth" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Comprehensive issue management system</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-primary-foreground glass">
                <Sparkles className="w-3 h-3 mr-1" />
                Administrator View
              </Badge>
              <Button variant="outline" size="sm" className="hover-scale">
                <BarChart className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-floating hover:shadow-glow-lg transition-spring hover-lift border-2 border-warning/20 slide-in-left">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">38</p>
                  <p className="text-sm text-muted-foreground">Active Issues</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-warning" />
                    <span className="text-xs text-warning font-medium">+5 today</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-floating hover:shadow-glow-lg transition-spring hover-lift border-2 border-success/20 slide-in-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">117</p>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-xs text-success font-medium">98% completion</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-floating hover:shadow-glow-lg transition-spring hover-lift border-2 border-primary/20 slide-in-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">2.1</p>
                  <p className="text-sm text-muted-foreground">Avg Days to Resolve</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Target className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">-0.3 days</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-floating hover:shadow-glow-lg transition-spring hover-lift border-2 border-primary/20 slide-in-right">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">1,203</p>
                  <p className="text-sm text-muted-foreground">Active Citizens</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">+47 this week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Issues Management */}
          <div className="xl:col-span-2">
            <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-left">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary-foreground" />
                      </div>
                      Issue Management Center
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Monitor, assign, and track all reported community issues
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Advanced Filters</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Enhanced Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 glass rounded-lg">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="hover:border-primary/50 transition-civic">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="hover:border-primary/50 transition-civic">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pothole">Pothole</SelectItem>
                      <SelectItem value="streetlight">Streetlight</SelectItem>
                      <SelectItem value="graffiti">Graffiti</SelectItem>
                      <SelectItem value="trash-litter">Trash/Litter</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="hover:border-primary/50 transition-civic">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Enhanced Issues List */}
                <div className="space-y-4">
                  {filteredIssues.map((issue, index) => (
                    <Card 
                      key={issue.id} 
                      className="border-2 border-muted/20 hover:border-primary/20 shadow-card hover:shadow-floating transition-spring hover-lift group"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                                {issue.title}
                              </h4>
                              <Badge className={`${getStatusColor(issue.status)} hover-scale`}>
                                {issue.status}
                              </Badge>
                              <Badge className={`${getPriorityColor(issue.priority)} hover-scale`}>
                                {issue.priority}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="space-y-2">
                                <p className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span className="font-medium">Location:</span> {issue.location}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-medium">Reported:</span> {issue.date}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <p className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  <span className="font-medium">Assigned to:</span> {issue.assignedTo}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  <span className="font-medium">Expected:</span> {issue.estimatedCompletion}
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                              <span className="font-medium">ID:</span> {issue.id} • 
                              <span className="font-medium"> Description:</span> {issue.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <Button size="sm" variant="outline" className="hover-lift group min-w-[100px]">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-smooth" />
                            </Button>
                            <Select defaultValue={issue.status.toLowerCase().replace(" ", "-")}>
                              <SelectTrigger className="w-[120px] hover:border-primary/50 transition-civic">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="glass">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Department Performance */}
          <div className="space-y-6">
            <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Department Analytics
                </CardTitle>
                <CardDescription>Real-time performance metrics and workload distribution</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {departments.map((dept, index) => (
                    <div 
                      key={dept.name} 
                      className={`p-6 rounded-xl border-2 hover:shadow-floating transition-spring hover-lift ${getDepartmentColor(dept.color)}`}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h6 className="font-bold text-lg">{dept.name}</h6>
                        <Badge className={`${getDepartmentColor(dept.color)} border-2`}>
                          {dept.efficiency}% efficiency
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Issues</span>
                            <span className="font-bold text-warning">{dept.active}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Completed</span>
                            <span className="font-bold text-success">{dept.completed}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Response Time</span>
                            <span className="font-bold text-primary">{dept.responseTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Cases</span>
                            <span className="font-bold">{dept.active + dept.completed}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{Math.round((dept.completed / (dept.completed + dept.active)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-primary h-3 rounded-full transition-all duration-1000 ease-out shadow-inner-glow" 
                            style={{ width: `${(dept.completed / (dept.completed + dept.active)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-right glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full hover-lift group" variant="outline">
                  <BarChart className="w-4 h-4 mr-2 group-hover:scale-110 transition-spring" />
                  Generate Report
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-smooth" />
                </Button>
                <Button className="w-full hover-lift group" variant="outline">
                  <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-spring" />
                  Bulk Assignment
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-smooth" />
                </Button>
                <Button className="w-full hover-lift group" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2 group-hover:scale-110 transition-spring" />
                  Priority Review
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;