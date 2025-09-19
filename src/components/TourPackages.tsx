import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Users } from "lucide-react";

const TourPackages = () => {
  const packages = [
    {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "14-day adventure to the base of the world's highest mountain",
      price: "NPR 45,000",
      duration: "14 Days",
      groupSize: "2-12 People",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop&crop=center",
      highlights: ["Helicopter Return", "Professional Guide", "All Meals"]
    },
    {
      id: 2,
      title: "Annapurna Circuit",
      description: "Classic trek through diverse landscapes and cultures",
      price: "NPR 32,000",
      duration: "12 Days", 
      groupSize: "2-15 People",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center",
      highlights: ["Cultural Experience", "Tea House Trek", "Mountain Views"]
    },
    {
      id: 3,
      title: "Chitwan Safari Package",
      description: "Wildlife experience in Nepal's premier national park",
      price: "NPR 8,500",
      duration: "3 Days",
      groupSize: "2-20 People", 
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=250&fit=crop&crop=center",
      highlights: ["Jungle Safari", "Elephant Ride", "Cultural Show"]
    }
  ];

  return (
    <section className="py-16 bg-gradient-mountain">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Tour Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover Nepal's breathtaking landscapes and rich culture with our carefully curated tour packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="group hover:shadow-mountain transition-all duration-300 bg-gradient-card border-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-success text-white">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {pkg.rating}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {pkg.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pkg.groupSize}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {pkg.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">{pkg.price}</p>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                  <Button className="bg-gradient-hero hover:opacity-90">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
            <MapPin className="h-5 w-5 mr-2" />
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;