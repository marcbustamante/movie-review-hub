
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Search } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  searchAction?: () => void;
  primaryButtonText?: string;
  primaryButtonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  searchAction,
  primaryButtonText = "Browse Movies",
  primaryButtonLink = "/movies",
}) => {
  return (
    <div className="relative w-full h-[60vh] max-h-[600px] min-h-[400px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
            <p className="text-lg md:text-xl text-gray-200">{subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to={primaryButtonLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  {primaryButtonText}
                </Button>
              </Link>
              
              {searchAction && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={searchAction}
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Movies
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
