
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { services } from "@/utils/data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = services
        .filter(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(service => service.name);
      
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  }, [searchQuery]);

  const handleSearch = (service?: string) => {
    const searchTerm = service || searchQuery;
    
    if (!searchTerm) return;
    
    const foundService = services.find(
      s => s.name.toLowerCase() === searchTerm.toLowerCase()
    );
    
    if (foundService) {
      navigate(`/services/${foundService.id}`);
    } else {
      navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
    }
    
    setSearchQuery("");
    setFilteredServices([]);
  };

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-homeez-50 via-white to-homeez-100 z-0" />
      
      {/* Animated circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-homeez-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-homeez-100 rounded-full opacity-30 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-20">
          {/* Text content */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div>
              <h5 className="inline-block px-3 py-1 text-xs font-medium text-homeez-700 bg-homeez-100 rounded-full mb-3">
                Over 600+ Expert Service Providers
              </h5>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Quality Home Services, 
              <span className="text-homeez-600"> On Demand</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0"
            >
              From cleaning and repairs to beauty services and more, HomeEZ connects you with skilled professionals to take care of your home needs.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md mx-auto lg:mx-0 w-full relative"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for a service..."
                  className="pl-10 pr-24 py-6 rounded-full border-gray-200 focus:border-homeez-500 focus:ring-homeez-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-homeez-600 hover:bg-homeez-700"
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </div>
              
              {/* Search suggestions */}
              {filteredServices.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredServices.map((service, index) => (
                    <li
                      key={index}
                      className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-homeez-50 text-gray-900"
                      onClick={() => handleSearch(service)}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 text-sm text-gray-500"
            >
              Popular: 
              <button onClick={() => handleSearch("Home Cleaning")} className="ml-2 text-homeez-600 hover:underline">Home Cleaning</button>, 
              <button onClick={() => handleSearch("Plumbing")} className="ml-2 text-homeez-600 hover:underline">Plumbing</button>, 
              <button onClick={() => handleSearch("Electrician")} className="ml-2 text-homeez-600 hover:underline">Electrician</button>
            </motion.div>
          </div>
          
          {/* Hero image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                alt="Home services" 
                className="rounded-2xl shadow-2xl object-cover w-full max-w-md mx-auto"
              />
              
              {/* Stats card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-10 -right-10 glass-card p-4 rounded-xl shadow-lg max-w-[200px] hidden md:block"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-homeez-700">Trusted Service</h3>
                </div>
                <p className="text-sm text-gray-600">Over 95% customer satisfaction rate</p>
              </motion.div>
              
              {/* Service provider card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-10 -left-10 glass-card p-4 rounded-xl shadow-lg max-w-[200px] hidden md:block"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/men/1.jpg" 
                      alt="Service provider" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Rajesh K.</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Available for Home Cleaning services</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
