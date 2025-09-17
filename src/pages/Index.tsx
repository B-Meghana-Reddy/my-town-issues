import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Users, TrendingUp, CheckCircle, AlertTriangle, Clock, UserCheck } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";
import ReportIssueForm from "@/components/ReportIssueForm";
import AdminDashboard from "@/components/AdminDashboard";
import IssueMap from "@/components/IssueMap";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'report' | 'admin' | 'map'>('home');
  const [userRole, setUserRole] = useState<'citizen' | 'admin'>('citizen');

  // Mock data for demonstration
  const stats = [
    { label: "Issues Reported", value: "2,847", icon: MapPin, color: "text-primary" },
    { label: "Issues Resolved", value: "2,156", icon: CheckCircle, color: "text-success" },
    { label: "Active Citizens", value: "1,203", icon: Users, color: "text-primary" },
    { label: "Avg Response Time", value: "3.2 days", icon: Clock, color: "text-warning" },
  ];

  const recentIssues = [
    { id: 1, type: "Pothole", location: "Main St & 1st Ave", status: "In Progress", priority: "High", date: "2 hours ago" },
    { id: 2, type: "Streetlight", location: "Park Ave", status: "Resolved", priority: "Medium", date: "1 day ago" },
    { id: 3, type: "Graffiti", location: "City Hall", status: "Pending", priority: "Low", date: "3 days ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success text-success-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Pending": return "bg-muted text-muted-foreground";
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

  if (currentView === 'report') {
    return <ReportIssueForm onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'map') {
    return <IssueMap onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CivicConnect</h1>
                <p className="text-sm text-muted-foreground">Community Issue Reporting</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {userRole === 'citizen' ? 'Citizen' : 'Administrator'}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUserRole(userRole === 'citizen' ? 'admin' : 'citizen')}
              >
                Switch to {userRole === 'citizen' ? 'Admin' : 'Citizen'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Building Better Communities Together
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Report civic issues, track progress, and help create positive change in your neighborhood
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => setCurrentView('report')}
              className="shadow-floating"
            >
              <Camera className="w-5 h-5" />
              Report an Issue
            </Button>
            <Button 
              variant="civic" 
              size="xl"
              onClick={() => setCurrentView('map')}
            >
              <MapPin className="w-5 h-5" />
              View Issue Map
            </Button>
            {userRole === 'admin' && (
              <Button 
                variant="success" 
                size="xl"
                onClick={() => setCurrentView('admin')}
              >
                <TrendingUp className="w-5 h-5" />
                Admin Dashboard
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-floating transition-civic">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Recent Issues</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated on the latest community issues and their resolution status
            </p>
          </div>
          <div className="grid gap-4 max-w-4xl mx-auto">
            {recentIssues.map((issue) => (
              <Card key={issue.id} className="shadow-card hover:shadow-floating transition-civic">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{issue.type}</h4>
                        <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                        <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {issue.location}
                        </span>
                        <span>{issue.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens making their communities better, one report at a time
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => setCurrentView('report')}
            className="bg-card text-card-foreground hover:bg-card/90"
          >
            <Camera className="w-5 h-5" />
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 CivicConnect. Building stronger communities through technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;