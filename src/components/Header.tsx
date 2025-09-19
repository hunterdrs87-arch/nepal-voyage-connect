import { Button } from "@/components/ui/button";
import { MapPin, Phone, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Nepal Voyager</h1>
              <p className="text-xs text-muted-foreground">Travel • Explore • Discover</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Bus Tickets</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Tour Packages</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Support</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-1" />
              +977-1-4567890
            </div>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;