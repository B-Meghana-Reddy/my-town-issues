import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Zap, AlertTriangle } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  priority: string;
  date: string;
  lat?: number;
  lng?: number;
}

interface GunturMapProps {
  issues?: Issue[];
}

const GunturMap = ({ issues = [] }: GunturMapProps) => {
  // Convert issues to map locations
  const issueLocations = issues
    .filter(issue => issue.lat && issue.lng)
    .map(issue => ({
      id: issue.id,
      lat: issue.lat!,
      lng: issue.lng!,
      type: issue.category.toLowerCase(),
      priority: issue.priority.toLowerCase(),
      title: issue.title,
      status: issue.status
    }));

  const getIssueColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-error";
      case "medium": return "bg-warning";  
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "pothole": return <AlertTriangle className="w-3 h-3" />;
      case "streetlight": return <Zap className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-right">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Navigation className="w-4 h-4 text-primary-foreground" />
              </div>
              Guntur City Map
            </CardTitle>
            <CardDescription className="mt-2">
              Real-time issue tracking across the city
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live View</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Map Container with Guntur Background */}
        <div className="relative w-full h-96 bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-lg border-2 border-muted/20 overflow-hidden">
          {/* Background Map Image */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="%23f8fafc"/><path d="M50 50 L350 50 L350 250 L50 250 Z" fill="none" stroke="%236b7280" stroke-width="2"/><text x="200" y="30" text-anchor="middle" fill="%23374151" font-size="14">Guntur City</text><path d="M80 80 Q150 120 220 100 T320 140" fill="none" stroke="%233b82f6" stroke-width="3"/><text x="80" y="75" fill="%23374151" font-size="10">Krishna River</text><rect x="150" y="120" width="30" height="20" fill="%2310b981"/><text x="165" y="145" text-anchor="middle" fill="%23374151" font-size="8">City Center</text></svg>')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {/* Issue Markers */}
          {issueLocations.map((issue) => (
            <div
              key={issue.id}
              className="absolute group cursor-pointer"
              style={{
                left: `${((issue.lng - 80.4300) * 2000) + 50}%`,
                top: `${((16.3100 - issue.lat) * 2000) + 50}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`w-6 h-6 ${getIssueColor(issue.priority)} rounded-full flex items-center justify-center text-white animate-pulse hover:scale-110 transition-spring shadow-floating`}>
                {getIssueIcon(issue.type)}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-background border border-border rounded-lg shadow-floating opacity-0 group-hover:opacity-100 transition-smooth whitespace-nowrap z-10">
                <p className="text-sm font-medium">{issue.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{issue.priority} Priority</p>
              </div>
            </div>
          ))}

          {/* City Center Marker */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow-lg animate-pulse">
              <MapPin className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground">
              Guntur Center
            </div>
          </div>

          {/* Overlay with grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        {/* Map Legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Low Priority</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>City Center</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 p-4 glass rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-error">{issueLocations.length}</p>
              <p className="text-xs text-muted-foreground">Active Issues</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{Math.max(12, issueLocations.length * 3)}</p>
              <p className="text-xs text-muted-foreground">Areas Covered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">98%</p>
              <p className="text-xs text-muted-foreground">Coverage</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GunturMap;