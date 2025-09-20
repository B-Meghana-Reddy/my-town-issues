import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, MapPin, Upload, CheckCircle, Sparkles, Target, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportIssueFormProps {
  onBack: () => void;
}

const ReportIssueForm = ({ onBack }: ReportIssueFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    priority: "medium",
    photo: null as File | null,
    photoUrl: "" as string,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: "pothole", label: "Pothole", icon: "🕳️" },
    { value: "streetlight", label: "Streetlight", icon: "💡" },
    { value: "traffic", label: "Traffic Signal", icon: "🚦" },
    { value: "graffiti", label: "Graffiti", icon: "🎨" },
    { value: "trash", label: "Trash/Litter", icon: "🗑️" },
    { value: "water", label: "Water Issue", icon: "💧" },
    { value: "sidewalk", label: "Sidewalk Damage", icon: "🛤️" },
    { value: "tree", label: "Tree/Vegetation", icon: "🌳" },
    { value: "noise", label: "Noise Complaint", icon: "🔊" },
    { value: "other", label: "Other", icon: "📝" }
  ];

  const priorities = [
    { value: "low", label: "Low Priority", desc: "Minor inconvenience", color: "text-success" },
    { value: "medium", label: "Medium Priority", desc: "Moderate issue", color: "text-warning" },
    { value: "high", label: "High Priority", desc: "Safety concern", color: "text-error" },
    { value: "urgent", label: "Urgent", desc: "Immediate attention needed", color: "text-error" },
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: file, photoUrl });
      toast({
        title: "Photo Added",
        description: "Your photo has been attached to the report",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with realistic loading
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Report Submitted Successfully! 🎉",
        description: "Your report has been assigned ID #CIV-2024-001234 and forwarded to the relevant department.",
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-floating border-success/20 border-2 slide-in-up">
          <CardContent className="pt-8 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 pulse-primary">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Report Submitted Successfully!</h3>
            <div className="glass p-6 rounded-lg mb-6">
              <p className="text-muted-foreground mb-4">
                Your issue has been reported and assigned tracking ID:
              </p>
              <div className="text-2xl font-mono font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                #CIV-2024-001234
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-left group hover-lift p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Assigned to relevant department</span>
                  <p className="text-xs text-muted-foreground">Automatic routing system in action</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left group hover-lift p-3 rounded-lg hover:bg-warning/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-warning to-warning/80 rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Expected response within 24-48 hours</span>
                  <p className="text-xs text-muted-foreground">Based on issue priority and department workload</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left group hover-lift p-3 rounded-lg hover:bg-success/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">You'll receive updates via email</span>
                  <p className="text-xs text-muted-foreground">Real-time notifications at every stage</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                    setFormData({
                      title: "",
                      category: "",
                      description: "",
                      location: "",
                      priority: "medium",
                      photo: null,
                      photoUrl: "",
                    });
                }} 
                className="w-full hover-lift group"
              >
                <Camera className="w-4 h-4 mr-2 group-hover:rotate-12 transition-smooth" />
                Report Another Issue
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full hover-scale">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Enhanced Header */}
      <div className="glass border-b border-border sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="hover-lift group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-smooth" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Report an Issue</h1>
              <p className="text-sm text-muted-foreground">Help improve your community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8 slide-in-up">
            <div className="flex items-center gap-4 glass p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Step 1: Report Details</span>
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary w-1/3 rounded-full"></div>
              </div>
            </div>
          </div>

          <Card className="shadow-floating border-2 border-primary/10 hover:border-primary/20 transition-civic slide-in-up">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Tell Us About the Issue</CardTitle>
              <CardDescription className="text-base">
                Provide detailed information to help us understand and address the problem quickly
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title Field */}
                <div className="space-y-3 slide-in-left">
                  <Label htmlFor="title" className="text-base font-semibold">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Large pothole causing vehicle damage on Main Street"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-12 text-base hover:border-primary/50 focus:border-primary transition-civic"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Be specific and descriptive</p>
                </div>

                {/* Category Selection */}
                <div className="space-y-3 slide-in-right">
                  <Label htmlFor="category" className="text-base font-semibold">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="h-12 text-base hover:border-primary/50 transition-civic">
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value} className="hover:bg-primary/10 transition-civic">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Field */}
                <div className="space-y-3 slide-in-left">
                  <Label htmlFor="location" className="text-base font-semibold">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Street address, intersection, or landmark"
                      className="h-12 pl-12 text-base hover:border-primary/50 focus:border-primary transition-civic"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Location will be automatically detected when using mobile device
                    </p>
                  </div>
                </div>

                {/* Priority Selection */}
                <div className="space-y-3 slide-in-right">
                  <Label htmlFor="priority" className="text-base font-semibold">Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger className="h-12 text-base hover:border-primary/50 transition-civic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value} className="hover:bg-primary/10 transition-civic">
                          <div className="space-y-1">
                            <div className={`font-medium ${priority.color}`}>{priority.label}</div>
                            <div className="text-xs text-muted-foreground">{priority.desc}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description Field */}
                <div className="space-y-3 slide-in-left">
                  <Label htmlFor="description" className="text-base font-semibold">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details: What exactly is the problem? When did you notice it? How is it affecting the community?"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="text-base hover:border-primary/50 focus:border-primary transition-civic resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground">The more details you provide, the faster we can resolve the issue</p>
                </div>

                {/* Photo Upload */}
                <div className="space-y-3 slide-in-right">
                  <Label htmlFor="photo" className="text-base font-semibold flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Photo Evidence
                  </Label>
                  <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-300 hover-lift glass group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer relative z-10">
                      <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-floating group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                        <Upload className="w-10 h-10 text-white group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">
                          {formData.photo ? (
                            <span className="flex items-center justify-center gap-2 text-success">
                              <CheckCircle className="w-5 h-5" />
                              {formData.photo.name}
                            </span>
                          ) : (
                            "Click to upload a photo"
                          )}
                        </p>
                        {formData.photoUrl && (
                          <div className="mt-4">
                            <img 
                              src={formData.photoUrl} 
                              alt="Preview" 
                              className="max-w-full h-32 object-cover rounded-lg border border-border shadow-sm"
                            />
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Photos help us understand and resolve issues faster
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-success rounded-full"></span>
                            JPG, PNG supported
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            Max 10MB
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-8 slide-in-up">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onBack} 
                    className="flex-1 h-12 hover-scale group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-smooth" />
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.title || !formData.category || !formData.location || !formData.description}
                    className="flex-1 h-12 hover-lift group shadow-floating disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2 group-hover:rotate-12 transition-smooth" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportIssueForm;