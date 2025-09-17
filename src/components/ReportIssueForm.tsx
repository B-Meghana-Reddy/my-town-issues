import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, MapPin, Upload, CheckCircle } from "lucide-react";
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Pothole",
    "Streetlight",
    "Traffic Signal",
    "Graffiti",
    "Trash/Litter",
    "Water Issue",
    "Sidewalk Damage",
    "Tree/Vegetation",
    "Noise Complaint",
    "Other"
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Issue Reported Successfully",
        description: "Your report has been submitted and assigned ID #CIV-2024-001234",
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-floating">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Report Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Your issue has been reported and assigned ID <strong>#CIV-2024-001234</strong>. 
              You'll receive updates on the progress.
            </p>
            <div className="space-y-3">
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                Report Another Issue
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full">
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Report an Issue</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-floating">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Issue Details
              </CardTitle>
              <CardDescription>
                Provide details about the civic issue you'd like to report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Large pothole on Main Street"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Street address or nearest intersection"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Location will be automatically detected when using mobile device
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                      <SelectItem value="medium">Medium - Moderate issue</SelectItem>
                      <SelectItem value="high">High - Safety concern</SelectItem>
                      <SelectItem value="urgent">Urgent - Immediate attention needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about the issue..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-civic">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {formData.photo ? formData.photo.name : "Click to upload a photo"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended for faster resolution
                      </p>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.title || !formData.category || !formData.location || !formData.description}
                    className="flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
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