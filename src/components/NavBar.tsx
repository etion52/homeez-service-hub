
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, User, LogOut, Settings, Heart, Clock, HelpCircle, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
  };

  const getUserInitials = () => {
    if (!user) return "U";
    
    const name = user.user_metadata?.full_name || "";
    if (!name) return "U";
    
    const parts = name.split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0]?.toUpperCase() || "U";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-homeez-600">
                Home<span className="text-homeez-800">EZ</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === "/" ? "text-homeez-600" : "text-gray-700 hover:text-homeez-600"}`}>Home</Link>
            <Link to="/services" className={`text-sm font-medium transition-colors ${location.pathname.includes("/services") ? "text-homeez-600" : "text-gray-700 hover:text-homeez-600"}`}>Services</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${location.pathname === "/about" ? "text-homeez-600" : "text-gray-700 hover:text-homeez-600"}`}>About</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${location.pathname === "/contact" ? "text-homeez-600" : "text-gray-700 hover:text-homeez-600"}`}>Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || "User"} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/profile?tab=wishlist">
                      <DropdownMenuItem className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/profile?tab=bookings">
                      <DropdownMenuItem className="cursor-pointer">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Service History</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/profile?tab=settings">
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Star className="mr-2 h-4 w-4" />
                      <span>Rate Us</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="outline" className="h-9" onClick={() => navigate("/")}>
                  Sign in
                </Button>
                <Button className="h-9 bg-homeez-600 hover:bg-homeez-700" onClick={() => navigate("/")}>
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Home</Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Services</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Contact</Link>
            
            {!user && (
              <div className="flex flex-col space-y-2 mt-4 px-3">
                <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                  Sign in
                </Button>
                <Button className="w-full bg-homeez-600 hover:bg-homeez-700" onClick={() => navigate("/")}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
