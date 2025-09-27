import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Locate, Settings, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  priority: string;
  date: string;
  description: string;
  lat?: number;
  lng?: number;
}

interface LiveMapProps {
  issues: Issue[];
  onIssueSelect?: (issue: Issue) => void;
  height?: string;
}

const LiveMap: React.FC<LiveMapProps> = ({ issues, onIssueSelect, height = "h-96" }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null);
  const issueMarkers = useRef<mapboxgl.Marker[]>([]);
  
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(true);
  
  const { toast } = useToast();

  // Guntur city coordinates as default center
  const gunturCenter: [number, number] = [80.4365, 16.3067];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: gunturCenter,
      zoom: 12,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: true
    });
    
    map.current.addControl(geolocateControl, 'top-right');

    map.current.on('load', () => {
      setIsMapReady(true);
      addIssueMarkers();
      
      toast({
        title: "Map Ready!",
        description: "Interactive map loaded successfully. You can now view issues and track your location.",
        duration: 3000,
      });
    });

    // Handle geolocation events
    geolocateControl.on('geolocate', (e) => {
      const { latitude, longitude } = e.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      setIsTrackingLocation(true);
      
      toast({
        title: "Location Found!",
        description: `Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        duration: 3000,
      });
    });

    geolocateControl.on('error', (e) => {
      console.error('Geolocation error:', e);
      toast({
        title: "Location Error",
        description: "Unable to get your location. Please check permissions and try again.",
        variant: "destructive",
        duration: 5000,
      });
    });
  };

  const addIssueMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    issueMarkers.current.forEach(marker => marker.remove());
    issueMarkers.current = [];

    issues.forEach((issue) => {
      if (issue.lat && issue.lng) {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'issue-marker';
        markerEl.style.cssText = `
          width: 30px;
          height: 30px;
          background: ${getStatusColor(issue.status)};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: white;
          transition: transform 0.2s ease;
        `;
        
        markerEl.innerHTML = getPriorityIcon(issue.priority);
        
        markerEl.addEventListener('mouseenter', () => {
          markerEl.style.transform = 'scale(1.2)';
        });
        
        markerEl.addEventListener('mouseleave', () => {
          markerEl.style.transform = 'scale(1)';
        });

        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([issue.lng, issue.lat])
          .addTo(map.current!);

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(`
          <div class="p-3 min-w-[250px]">
            <h3 class="font-bold text-lg mb-2">${issue.title}</h3>
            <div class="space-y-1 text-sm">
              <p><strong>Status:</strong> <span class="px-2 py-1 rounded text-xs" style="background: ${getStatusColor(issue.status)}; color: white;">${issue.status}</span></p>
              <p><strong>Priority:</strong> <span class="px-2 py-1 rounded text-xs" style="background: ${getPriorityColor(issue.priority)}; color: white;">${issue.priority}</span></p>
              <p><strong>Location:</strong> ${issue.location}</p>
              <p><strong>Category:</strong> ${issue.category}</p>
              <p><strong>Date:</strong> ${issue.date}</p>
              <p><strong>Description:</strong> ${issue.description}</p>
            </div>
            <button 
              onclick="window.selectIssue('${issue.id}')"
              class="mt-3 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
          </div>
        `);

        markerEl.addEventListener('click', () => {
          popup.addTo(map.current!);
        });

        // Store reference to marker
        issueMarkers.current.push(marker);
      }
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'resolved': return '#10b981';
      case 'in progress': return '#f59e0b';
      case 'pending': return '#6b7280';
      case 'urgent': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'high': return '!';
      case 'medium': return '⚠';
      case 'low': return '•';
      default: return '•';
    }
  };

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox public token to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      initializeMap(mapboxToken);
      setShowTokenInput(false);
      
      toast({
        title: "Map Initializing...",
        description: "Setting up your interactive map with live location tracking.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Invalid Token",
        description: "Please check your Mapbox token and try again.",
        variant: "destructive",
      });
    }
  };

  const centerOnUserLocation = () => {
    if (userLocation && map.current) {
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 16,
        duration: 2000
      });
    } else {
      toast({
        title: "Location Not Available",
        description: "Please enable location tracking first.",
        variant: "destructive",
      });
    }
  };

  const centerOnGuntur = () => {
    if (map.current) {
      map.current.flyTo({
        center: gunturCenter,
        zoom: 12,
        duration: 2000
      });
    }
  };

  // Global function for popup buttons
  useEffect(() => {
    (window as any).selectIssue = (issueId: string) => {
      const issue = issues.find(i => i.id === issueId);
      if (issue && onIssueSelect) {
        onIssueSelect(issue);
      }
    };

    return () => {
      delete (window as any).selectIssue;
    };
  }, [issues, onIssueSelect]);

  // Update markers when issues change
  useEffect(() => {
    if (isMapReady) {
      addIssueMarkers();
    }
  }, [issues, isMapReady]);

  // Cleanup
  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="shadow-floating border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary-foreground" />
            </div>
            Setup Live Map
          </CardTitle>
          <CardDescription>
            Enter your Mapbox public token to enable interactive mapping with live location tracking.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Get your free Mapbox token here →
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mapbox Public Token</label>
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-xs"
            />
          </div>
          <Button onClick={handleTokenSubmit} className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Initialize Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-floating border-2 border-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary-foreground" />
            </div>
            Live Issue Map
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={centerOnUserLocation}
              disabled={!userLocation}
              className="hover-lift"
            >
              <Locate className="w-4 h-4 mr-1" />
              My Location
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={centerOnGuntur}
              className="hover-lift"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Guntur
            </Button>
          </div>
        </div>
        <CardDescription>
          Interactive map showing all reported issues with live location tracking.
          {isTrackingLocation && (
            <span className="text-success ml-2">🟢 Location tracking active</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`relative ${height} w-full rounded-lg overflow-hidden border border-border`}>
          <div ref={mapContainer} className="absolute inset-0" />
          {!isMapReady && (
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 mx-auto animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Low Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>High Priority</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {issues.filter(i => i.lat && i.lng).length} of {issues.length} issues mapped
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMap;