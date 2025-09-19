import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CreditCard, 
  Clock, 
  MapPin, 
  Headphones, 
  Star,
  Bus,
  Mountain
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bus,
      title: "Premium Bus Fleet",
      description: "Travel in comfort with our modern, well-maintained buses equipped with AC and entertainment",
      badge: "Safe & Comfortable"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Pay safely with eSewa, Khalti, or international cards with bank-level security",
      badge: "PCI Compliant"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your bus location and get live updates on departure and arrival times",
      badge: "Live Updates"
    },
    {
      icon: Mountain,
      title: "Expert Guides",
      description: "Professional tour guides with deep local knowledge for unforgettable experiences",
      badge: "Local Experts"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support in Nepali and English for peace of mind",
      badge: "Always Available"
    },
    {
      icon: Star,
      title: "Best Price Guarantee",
      description: "Get the best deals on bus tickets and tour packages with our price match promise",
      badge: "Value Guaranteed"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Nepal Voyager?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your journey through Nepal safe, comfortable, and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card-custom transition-all duration-300 border-0 bg-gradient-card">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <Badge variant="secondary" className="mb-2 text-xs">
                  {feature.badge}
                </Badge>
                <CardTitle className="text-xl text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;