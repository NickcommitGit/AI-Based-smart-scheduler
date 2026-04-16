
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-theme-darkgray/90 backdrop-blur-md py-2 shadow-lg" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-theme-orange h-8 w-8 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <Link to="/" className="text-xl font-bold text-white">Smart Scheduler</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/roadmap">Roadmap</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/discussion">Discussion</NavLink>
        </div>
        
        <div>
          <Link to="/auth">
            <Button variant="outline" className="hover:bg-theme-orange hover:text-white border-theme-orange text-theme-orange">
              Login / Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-200 hover:text-theme-orange transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-theme-orange after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {children}
    </Link>
  );
};

export default Navbar;
