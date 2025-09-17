import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Filter, Layers } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IssueMapProps {
  onBack: () => void;
}

const IssueMap = ({ onBack }: IssueMapProps) => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for map markers
  const mapIssues = [
    { id: 1, lat: 40.7128, lng: -74.0060, type: "Pothole", status: "In Progress", priority: "High" },
    { id: 2, lat: 40.7589, lng: -73.9851, type: "Streetlight", status: "Resolved", priority: "Medium" },
    { id: 3, lat: 40.7505, lng: -73.9934, type: "Graffiti", status: "Pending", priority: "Low" },
    { id: 4, lat: 40.7282, lng: -73.7949, type: "Trash", status: "Urgent", priority: "High" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-success";
      case "In Progress": return "bg-warning";
      case "Pending": return "bg-muted";
      case "Urgent": return "bg-error";
      default: return "bg-muted";
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case "High": return "border-error border-2";
      case "Medium": return "border-warning border-2";
      case "Low": return "border-success border-2";
      default: return "border-muted border";
    }
  };

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
              <h1 className="text-3xl font-bold text-foreground">Issue Map</h1>
              <p className="text-muted-foreground">Interactive map of reported civic issues</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Filters */}
          <div>
            <Card className="shadow-floating">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Map Filters
                </CardTitle>
                <CardDescription>Filter issues by category and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pothole">Potholes</SelectItem>
                      <SelectItem value="streetlight">Streetlights</SelectItem>
                      <SelectItem value="graffiti">Graffiti</SelectItem>
                      <SelectItem value="trash">Trash/Litter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Resolved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-warning rounded-full"></div>
                      <span className="text-sm text-muted-foreground">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-error rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Urgent</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Priority Borders</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded-full border-error border-2"></div>
                      <span className="text-sm text-muted-foreground">High Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded-full border-warning border-2"></div>
                      <span className="text-sm text-muted-foreground">Medium Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded-full border-success border-2"></div>
                      <span className="text-sm text-muted-foreground">Low Priority</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-floating">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  City Issue Map
                </CardTitle>
                <CardDescription>
                  Interactive map showing all reported issues. Click on markers for details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mock Map Area */}
                <div className="bg-gradient-background rounded-lg border-2 border-dashed border-border h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Background pattern to simulate map */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-muted"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock map markers */}
                  {mapIssues.map((issue, index) => (
                    <div
                      key={issue.id}
                      className={`absolute w-6 h-6 rounded-full ${getStatusColor(issue.status)} ${getPriorityBorder(issue.priority)} cursor-pointer hover:scale-110 transition-civic flex items-center justify-center shadow-floating`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`,
                      }}
                      title={`${issue.type} - ${issue.status} (${issue.priority} Priority)`}
                    >
                      <div className="w-2 h-2 bg-card rounded-full"></div>
                    </div>
                  ))}

                  <div className="text-center z-10">
                    <Layers className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground max-w-md">
                      This would display a real interactive map (like Google Maps or Mapbox) showing all reported issues with clickable markers.
                    </p>
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        💡 Integration Ready: Connect with Mapbox or Google Maps API for full functionality
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-2xl font-bold text-success">24</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="text-2xl font-bold text-warning">12</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg border border-muted">
                    <div className="text-2xl font-bold text-muted-foreground">8</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-error/10 rounded-lg border border-error/20">
                    <div className="text-2xl font-bold text-error">3</div>
                    <div className="text-sm text-muted-foreground">Urgent</div>
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