import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter, TrendingUp, Users, MapPin, Clock, AlertTriangle, CheckCircle, Eye } from "lucide-react";

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
      title: "Large pothole on Main Street",
      category: "Pothole",
      location: "Main St & 1st Ave",
      status: "In Progress",
      priority: "High",
      date: "2024-01-15",
      assignedTo: "Public Works",
      description: "Deep pothole causing damage to vehicles",
      reporterContact: "john@email.com"
    },
    {
      id: "CIV-2024-001235",
      title: "Broken streetlight in park",
      category: "Streetlight",
      location: "Central Park, North Entrance",
      status: "Resolved",
      priority: "Medium",
      date: "2024-01-14",
      assignedTo: "Electrical Dept",
      description: "Streetlight flickering and unsafe at night",
      reporterContact: "sarah@email.com"
    },
    {
      id: "CIV-2024-001236",
      title: "Graffiti on city hall wall",
      category: "Graffiti",
      location: "City Hall, West Wall",
      status: "Pending",
      priority: "Low",
      date: "2024-01-13",
      assignedTo: "Maintenance",
      description: "Large graffiti tag on exterior wall",
      reporterContact: "mike@email.com"
    },
    {
      id: "CIV-2024-001237",
      title: "Overflowing trash bin",
      category: "Trash/Litter",
      location: "Bus Stop, Oak Avenue",
      status: "Urgent",
      priority: "High",
      date: "2024-01-15",
      assignedTo: "Sanitation",
      description: "Trash bin overflowing, attracting pests",
      reporterContact: "anna@email.com"
    }
  ];

  const departments = [
    { name: "Public Works", active: 12, completed: 45 },
    { name: "Sanitation", active: 8, completed: 23 },
    { name: "Electrical Dept", active: 3, completed: 18 },
    { name: "Maintenance", active: 15, completed: 31 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success text-success-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Pending": return "bg-muted text-muted-foreground";
      case "Urgent": return "bg-error text-error-foreground";
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

  const filteredIssues = issues.filter(issue => {
    if (filterStatus !== "all" && issue.status.toLowerCase() !== filterStatus) return false;
    if (filterCategory !== "all" && issue.category.toLowerCase() !== filterCategory) return false;
    if (filterPriority !== "all" && issue.priority.toLowerCase() !== filterPriority) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage and track civic issues</p>
            </div>
          </div>
          <Badge className="bg-primary text-primary-foreground">
            Administrator View
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">38</p>
                  <p className="text-sm text-muted-foreground">Active Issues</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">117</p>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">2.1</p>
                  <p className="text-sm text-muted-foreground">Avg Days to Resolve</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">1,203</p>
                  <p className="text-sm text-muted-foreground">Active Citizens</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issues List */}
          <div className="lg:col-span-2">
            <Card className="shadow-floating">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Issue Management
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Filters</span>
                  </div>
                </div>
                <CardDescription>Review and manage reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pothole">Pothole</SelectItem>
                      <SelectItem value="streetlight">Streetlight</SelectItem>
                      <SelectItem value="graffiti">Graffiti</SelectItem>
                      <SelectItem value="trash/litter">Trash/Litter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Issues List */}
                <div className="space-y-4">
                  {filteredIssues.map((issue) => (
                    <Card key={issue.id} className="border shadow-card hover:shadow-floating transition-civic">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-foreground">{issue.title}</h4>
                              <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                              <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {issue.location}
                              </p>
                              <p>ID: {issue.id} • {issue.date} • {issue.assignedTo}</p>
                              <p className="line-clamp-2">{issue.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Select defaultValue={issue.status.toLowerCase().replace(" ", "-")}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
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

          {/* Department Overview */}
          <div>
            <Card className="shadow-floating">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Department Performance
                </CardTitle>
                <CardDescription>Track departmental workload and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.name} className="p-4 bg-muted/30 rounded-lg">
                      <h6 className="font-semibold text-foreground mb-2">{dept.name}</h6>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Issues</span>
                          <span className="font-medium text-warning">{dept.active}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed This Month</span>
                          <span className="font-medium text-success">{dept.completed}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-civic" 
                            style={{ width: `${(dept.completed / (dept.completed + dept.active)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;