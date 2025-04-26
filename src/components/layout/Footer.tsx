
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-movie-purple mb-4">MovieVerse</h3>
            <p className="text-muted-foreground">
              Your go-to platform for discovering, reviewing, and discussing the best movies around.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground hover:text-movie-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="text-foreground hover:text-movie-purple transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground hover:text-movie-purple transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <p className="text-muted-foreground">
              Have suggestions or feedback? Let us know!
            </p>
            <div className="mt-2">
              <Link 
                to="/contact" 
                className="inline-block text-movie-purple hover:text-movie-purple-dark transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} MovieVerse. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Created with <span className="text-red-500">♥</span> by Movie Enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
