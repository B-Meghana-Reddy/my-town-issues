import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Filter, Layers, Sparkles, TrendingUp, Navigation, Zap, Target, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IssueMapProps {
  onBack: () => void;
}

const IssueMap = ({ onBack }: IssueMapProps) => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("standard");

  // Mock data for map markers with more details
  const mapIssues = [
    { 
      id: 1, 
      lat: 40.7128, 
      lng: -74.0060, 
      type: "Pothole", 
      status: "In Progress", 
      priority: "High",
      title: "Large pothole on Main Street",
      reportedBy: "Sarah J.",
      date: "2 hours ago"
    },
    { 
      id: 2, 
      lat: 40.7589, 
      lng: -73.9851, 
      type: "Streetlight", 
      status: "Resolved", 
      priority: "Medium",
      title: "Broken streetlight in park",
      reportedBy: "Mike R.",
      date: "1 day ago"
    },
    { 
      id: 3, 
      lat: 40.7505, 
      lng: -73.9934, 
      type: "Graffiti", 
      status: "Pending", 
      priority: "Low",
      title: "Graffiti on building wall",
      reportedBy: "Alex K.",
      date: "3 days ago"
    },
    { 
      id: 4, 
      lat: 40.7282, 
      lng: -73.7949, 
      type: "Trash", 
      status: "Urgent", 
      priority: "High",
      title: "Overflowing trash bin",
      reportedBy: "Anna C.",
      date: "5 hours ago"
    },
    { 
      id: 5, 
      lat: 40.7410, 
      lng: -73.9897, 
      type: "Traffic Signal", 
      status: "In Progress", 
      priority: "High",
      title: "Malfunctioning traffic light",
      reportedBy: "David L.",
      date: "6 hours ago"
    },
  ];

  const mapStats = [
    { label: "Total Issues", value: 47, color: "primary", trend: "+3" },
    { label: "Resolved", value: 24, color: "success", trend: "+8" },
    { label: "In Progress", value: 15, color: "warning", trend: "+2" },
    { label: "Urgent", value: 8, color: "error", trend: "+1" },
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: "🗺️", count: 47 },
    { value: "pothole", label: "Potholes", icon: "🕳️", count: 12 },
    { value: "streetlight", label: "Streetlights", icon: "💡", count: 8 },
    { value: "graffiti", label: "Graffiti", icon: "🎨", count: 5 },
    { value: "trash", label: "Trash/Litter", icon: "🗑️", count: 15 },
    { value: "traffic", label: "Traffic", icon: "🚦", count: 7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success";
      case "In Progress": return "bg-warning";
      case "Pending": return "bg-muted";
      case "Urgent": return "bg-error pulse-primary";
      default: return "bg-muted";
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case "High": return "border-error border-4 animate-pulse";
      case "Medium": return "border-warning border-3";
      case "Low": return "border-success border-2";
      default: return "border-muted border";
    }
  };

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
                <h1 className="text-2xl font-bold gradient-text">Interactive Issue Map</h1>
                <p className="text-sm text-muted-foreground">Real-time visualization of community reports</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="glass border-primary/20">
                <Navigation className="w-3 h-3 mr-1" />
                Live View
              </Badge>
              <Button variant="outline" size="sm" className="hover-scale">
                <Target className="w-4 h-4 mr-2" />
                My Location
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Map Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {mapStats.map((stat, index) => (
            <Card 
              key={stat.label}
              className={`shadow-floating hover:shadow-glow-lg transition-spring hover-lift border-2 border-${stat.color}/20 slide-in-up`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-${stat.color} bg-${stat.color}/10`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Map Filters */}
          <div className="space-y-6">
            <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Smart Filters
                </CardTitle>
                <CardDescription>Customize your map view with advanced filtering options</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Issue Category</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="hover:border-primary/50 transition-civic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value} className="hover:bg-primary/10 transition-civic">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {category.count}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Status Filter</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="hover:border-primary/50 transition-civic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="urgent">Urgent Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">View Mode</label>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="hover:border-primary/50 transition-civic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="standard">Standard View</SelectItem>
                      <SelectItem value="satellite">Satellite View</SelectItem>
                      <SelectItem value="terrain">Terrain View</SelectItem>
                      <SelectItem value="heatmap">Heat Map</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Legend */}
            <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Map Legend
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4">Status Indicators</h4>
                  <div className="space-y-3">
                    {[
                      { color: "success", label: "Resolved", desc: "Issue completed" },
                      { color: "warning", label: "In Progress", desc: "Being worked on" },
                      { color: "muted", label: "Pending", desc: "Awaiting review" },
                      { color: "error", label: "Urgent", desc: "High priority" }
                    ].map((item, index) => (
                      <div 
                        key={item.color} 
                        className="flex items-center gap-3 hover-scale transition-smooth"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className={`w-4 h-4 bg-${item.color} rounded-full shadow-glow ${item.color === 'error' ? 'pulse-primary' : ''}`}></div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Priority Borders</h4>
                  <div className="space-y-3">
                    {[
                      { border: "border-error border-4", label: "High Priority", desc: "Thick red border" },
                      { border: "border-warning border-3", label: "Medium Priority", desc: "Medium orange border" },
                      { border: "border-success border-2", label: "Low Priority", desc: "Thin green border" }
                    ].map((item, index) => (
                      <div 
                        key={item.label} 
                        className="flex items-center gap-3 hover-scale transition-smooth"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className={`w-4 h-4 bg-muted rounded-full ${item.border}`}></div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Map Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-right">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary-foreground" />
                      </div>
                      Live Community Issue Map
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Interactive visualization of all reported issues. Click markers for detailed information.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="hover-lift group">
                    <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-spring" />
                    Fullscreen
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Enhanced Mock Map Area */}
                <div className="glass rounded-xl border-2 border-dashed border-border h-[500px] flex items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-civic">
                  {/* Enhanced Background Grid */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-civic">
                    <div className="grid grid-cols-12 grid-rows-8 h-full">
                      {Array.from({ length: 96 }).map((_, i) => (
                        <div key={i} className="border border-muted hover:border-primary/20 transition-civic"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Street lines to simulate map */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-0 right-0 h-1 bg-muted"></div>
                    <div className="absolute top-2/4 left-0 right-0 h-1 bg-muted"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-1 bg-muted"></div>
                    <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-muted"></div>
                    <div className="absolute top-0 bottom-0 left-2/4 w-1 bg-muted"></div>
                    <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-muted"></div>
                  </div>
                  
                  {/* Enhanced map markers with hover effects */}
                  {mapIssues.map((issue, index) => (
                    <div
                      key={issue.id}
                      className={`absolute rounded-full ${getStatusColor(issue.status)} ${getPriorityBorder(issue.priority)} cursor-pointer hover:scale-125 transition-spring flex items-center justify-center shadow-floating hover:shadow-glow-lg z-10 group`}
                      style={{
                        width: issue.priority === 'High' ? '32px' : '24px',
                        height: issue.priority === 'High' ? '32px' : '24px',
                        left: `${15 + (index * 18)}%`,
                        top: `${25 + (index * 12)}%`,
                      }}
                      title={`${issue.title} - ${issue.status} (${issue.priority} Priority)`}
                    >
                      <div className="w-2 h-2 bg-card rounded-full group-hover:scale-150 transition-spring"></div>
                      
                      {/* Hover tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-floating opacity-0 group-hover:opacity-100 transition-civic pointer-events-none whitespace-nowrap z-20">
                        <div className="text-xs font-semibold text-foreground">{issue.title}</div>
                        <div className="text-xs text-muted-foreground">{issue.reportedBy} • {issue.date}</div>
                      </div>
                    </div>
                  ))}

                  {/* Map center content */}
                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 hover-scale transition-spring">
                      <Layers className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Interactive Map Integration</h3>
                    <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
                      This area will display a fully interactive map (Google Maps, Mapbox, or OpenStreetMap) 
                      showing real-time issue locations with detailed information popups.
                    </p>
                    <div className="glass p-6 rounded-xl border-2 border-primary/20 max-w-lg mx-auto">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-primary">Ready for Integration</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Connect with your preferred mapping service to enable full GPS functionality, 
                        real-time tracking, and advanced geospatial features.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Map Controls */}
                <div className="flex items-center justify-between mt-6 p-4 glass rounded-lg">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="hover-lift">
                      <MapPin className="w-4 h-4 mr-2" />
                      Center Map
                    </Button>
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Layers className="w-4 h-4 mr-2" />
                      Toggle Layers
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Zoom:</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover-scale">+</Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover-scale">-</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMap;