import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Users, TrendingUp, CheckCircle, AlertTriangle, Clock, UserCheck, Sparkles, ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";
import ReportIssueForm from "@/components/ReportIssueForm";
import AdminDashboard from "@/components/AdminDashboard";
import IssueMap from "@/components/IssueMap";

export interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  priority: string;
  date: string;
  reportedBy?: string;
  assignedTo?: string;
  description: string;
  reporterContact?: string;
  estimatedCompletion?: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'report' | 'admin' | 'map'>('home');
  const [userRole, setUserRole] = useState<'citizen' | 'admin'>('citizen');
  
  // Shared issues state
  const [issues, setIssues] = useState<Issue[]>([
    { 
      id: "CIV-2024-001234", 
      title: "Large pothole causing vehicle damage", 
      category: "Pothole", 
      location: "Main St & 1st Ave", 
      status: "In Progress", 
      priority: "High", 
      date: "2024-01-15",
      reportedBy: "Sarah J.",
      assignedTo: "Public Works",
      description: "Deep pothole causing damage to vehicles, needs immediate attention",
      reporterContact: "sarah.johnson@email.com",
      estimatedCompletion: "2024-01-17",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      lat: 16.3067,
      lng: 80.4365
    },
    { 
      id: "CIV-2024-001235", 
      title: "Broken streetlight creating safety hazard", 
      category: "Streetlight", 
      location: "Central Park, North Entrance", 
      status: "Resolved", 
      priority: "Medium", 
      date: "2024-01-14",
      reportedBy: "Mike R.",
      assignedTo: "Electrical Dept",
      description: "Streetlight flickering and unsafe for pedestrians at night",
      reporterContact: "mike.rodriguez@email.com",
      estimatedCompletion: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      lat: 16.3100,
      lng: 80.4400
    },
    { 
      id: "CIV-2024-001236", 
      title: "Graffiti vandalism on public building", 
      category: "Graffiti", 
      location: "City Hall, West Wall", 
      status: "Pending", 
      priority: "Low", 
      date: "2024-01-13",
      reportedBy: "Alex K.",
      assignedTo: "Maintenance",
      description: "Large graffiti tag requiring professional cleaning",
      reporterContact: "anna.kim@email.com",
      estimatedCompletion: "2024-01-20",
      lat: 16.3050,
      lng: 80.4350
    },
  ]);

  const addNewIssue = (newIssue: Issue) => {
    setIssues(prevIssues => [newIssue, ...prevIssues]);
  };

  const updateIssueStatus = (issueId: string, newStatus: string) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1).replace("-", " ") }
          : issue
      )
    );

    // Show notification when issue is resolved
    if (newStatus === "resolved") {
      // In a real app, this would send notifications to users
      console.log(`Issue ${issueId} has been resolved - User notification sent`);
    }
  };

  // Mock data for demonstration
  const stats = [
    { 
      label: "Issues Reported", 
      value: "2,847", 
      icon: MapPin, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: "+12%"
    },
    { 
      label: "Issues Resolved", 
      value: "2,156", 
      icon: CheckCircle, 
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      trend: "+8%"
    },
    { 
      label: "Active Citizens", 
      value: "1,203", 
      icon: Users, 
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: "+15%"
    },
    { 
      label: "Avg Response Time", 
      value: "3.2 days", 
      icon: Clock, 
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      trend: "-0.5d"
    },
  ];

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays === 0) return "Today";
    return `${diffDays} days ago`;
  }
  // Use the first 3 issues for recent issues display
  const recentIssues = issues.slice(0, 3).map(issue => ({
    id: issue.id,
    type: issue.category,
    location: issue.location,
    status: issue.status,
    priority: issue.priority,
    date: formatDate(issue.date),
    reportedBy: issue.reportedBy || "Anonymous"
  }));

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
    return (
      <ReportIssueForm 
        onBack={() => setCurrentView('home')} 
        onIssueSubmitted={addNewIssue}
      />
    );
  }

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        onBack={() => setCurrentView('home')} 
        issues={issues}
        onStatusUpdate={updateIssueStatus}
      />
    );
  }

  if (currentView === 'map') {
    return <IssueMap onBack={() => setCurrentView('home')} issues={issues} />;
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Enhanced Header with Glass Effect */}
      <header className="sticky top-0 z-50 glass border-b border-border shadow-floating backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 slide-in-left">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow hover-scale">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">CivicConnect</h1>
                <p className="text-sm text-muted-foreground">Community Issue Reporting</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 slide-in-right">
              <div className="flex items-center space-x-2 glass px-3 py-2 rounded-lg">
                <UserCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {userRole === 'citizen' ? 'Citizen View' : 'Administrator'}
                </span>
              </div>
              <Button 
                variant="civic" 
                size="sm"
                onClick={() => setUserRole(userRole === 'citizen' ? 'admin' : 'citizen')}
                className="hover-lift"
              >
                <Zap className="w-4 h-4 mr-2" />
                Switch to {userRole === 'citizen' ? 'Admin' : 'Citizen'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-foreground/30 rounded-full float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary-foreground/20 rounded-full float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-primary-foreground/25 rounded-full float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <div className="slide-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 glass rounded-full px-6 py-2 mb-8 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Building Better Communities Together
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Make Your <span className="text-white">Voice</span> Heard
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed">
              Report civic issues, track progress in real-time, and help create positive change in your neighborhood with our advanced community platform
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center slide-in-up">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => setCurrentView('report')}
              className="group shadow-floating hover:shadow-glow-lg transform hover:scale-105 transition-spring"
            >
              <Camera className="w-6 h-6 mr-3 group-hover:rotate-12 transition-smooth" />
              Report an Issue
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button 
              variant="civic" 
              size="xl"
              onClick={() => setCurrentView('map')}
              className="group hover-lift"
            >
              <MapPin className="w-6 h-6 mr-3 group-hover:bounce transition-spring" />
              Explore Issue Map
            </Button>
            {userRole === 'admin' && (
              <Button 
                variant="success" 
                size="xl"
                onClick={() => setCurrentView('admin')}
                className="group hover-lift pulse-primary"
              >
                <TrendingUp className="w-6 h-6 mr-3 group-hover:scale-110 transition-spring" />
                Admin Dashboard
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-card/50 glass">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 slide-in-up">
            <h3 className="text-3xl font-bold text-foreground mb-4">Platform Impact</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time statistics showing the positive impact of community engagement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className={`text-center shadow-floating hover:shadow-glow-lg transition-spring hover-lift ${stat.bgColor} ${stat.borderColor} border-2 group`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-inner-glow group-hover:scale-110 transition-spring`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-foreground mb-2 group-hover:scale-105 transition-smooth">{stat.value}</h3>
                  <p className="text-muted-foreground mb-3">{stat.label}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stat.color} ${stat.bgColor}`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Issues Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 slide-in-up">
            <h3 className="text-4xl font-bold text-foreground mb-6">Recent Community Reports</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Stay updated on the latest community issues and their resolution status. Every report makes a difference.
            </p>
          </div>
          <div className="grid gap-6 max-w-5xl mx-auto">
            {recentIssues.map((issue, index) => (
              <Card 
                key={issue.id} 
                className="shadow-floating hover:shadow-glow-lg transition-spring hover-lift group border-l-4 border-primary/50 hover:border-primary"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                          {issue.type}
                        </h4>
                        <Badge className={`${getStatusColor(issue.status)} hover-scale`}>
                          {issue.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(issue.priority)} hover-scale`}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground gap-6 flex-wrap">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {issue.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {issue.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Reported by {issue.reportedBy}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover-lift group"
                        onClick={() => setCurrentView('map')}
                      >
                        View on Map
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover-glow"
                        onClick={() => {
                          // Toggle follow functionality - store in localStorage for demo
                          const followedIssues = JSON.parse(localStorage.getItem('followedIssues') || '[]');
                          const isFollowing = followedIssues.includes(issue.id);
                          if (isFollowing) {
                            const updated = followedIssues.filter((id: string) => id !== issue.id);
                            localStorage.setItem('followedIssues', JSON.stringify(updated));
                          } else {
                            followedIssues.push(issue.id);
                            localStorage.setItem('followedIssues', JSON.stringify(followedIssues));
                          }
                        }}
                      >
                        {JSON.parse(localStorage.getItem('followedIssues') || '[]').includes(issue.id) ? 'Unfollow' : 'Follow'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setCurrentView('map')}
              className="group hover-lift"
            >
              View All Issues on Map
              <MapPin className="w-5 h-5 ml-2 group-hover:bounce transition-spring" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-8 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-primary-foreground/20"></div>
            ))}
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="slide-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 glass rounded-full px-6 py-2 mb-8 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Join the Movement
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Make a Real Difference?
            </h3>
            <p className="text-xl opacity-95 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of engaged citizens making their communities better, one report at a time. 
              Your voice matters, and together we build stronger neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => setCurrentView('report')}
                className="group bg-card text-card-foreground hover:bg-card/90 shadow-floating hover:shadow-glow-lg transform hover:scale-105 transition-spring"
              >
                <Camera className="w-6 h-6 mr-3 group-hover:rotate-12 transition-smooth" />
                Start Reporting Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button 
                variant="civic" 
                size="xl"
                onClick={() => setCurrentView('map')}
                className="group glass hover-lift"
              >
                <MapPin className="w-6 h-6 mr-3 group-hover:bounce transition-spring" />
                Explore Your Area
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-card/80 glass border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-bold gradient-text">CivicConnect</h4>
              </div>
              <p className="text-muted-foreground">
                Empowering communities through technology and civic engagement.
              </p>
            </div>
            <div className="text-center">
              <h5 className="font-semibold text-foreground mb-4">Quick Links</h5>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="hover-glow">Report Issue</Button>
                <Button variant="ghost" size="sm" className="hover-glow">View Map</Button>
                <Button variant="ghost" size="sm" className="hover-glow">Track Reports</Button>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h5 className="font-semibold text-foreground mb-4">Connect</h5>
              <p className="text-muted-foreground mb-4">
                Stay updated with community improvements
              </p>
              <Button variant="outline" size="sm" className="hover-lift">
                Get Notifications
              </Button>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 CivicConnect. Building stronger communities through innovation and collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;