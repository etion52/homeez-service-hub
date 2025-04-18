
import { useState } from "react";
import { motion } from "framer-motion";
import { serviceProviders, services } from "@/utils/data";
import { Star, Phone, MapPin, Badge, Award, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceProviders = () => {
  const [activeTab, setActiveTab] = useState("featured");
  
  // Filter providers based on active tab
  const filteredProviders = activeTab === "featured" 
    ? serviceProviders.filter(provider => provider.isFeatured)
    : activeTab === "top-rated"
    ? serviceProviders.sort((a, b) => b.rating - a.rating).slice(0, 4)
    : serviceProviders.sort((a, b) => b.trustScore - a.trustScore).slice(0, 4);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-homeez-50 rounded-l-3xl z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h4 className="text-homeez-600 font-medium text-sm mb-2">OUR PROFESSIONALS</h4>
          <h2 className="text-3xl font-bold text-gray-900">Top Service Providers</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Meet our trusted experts who are ready to help you with your home service needs. 
            All our professionals are verified and trained.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "featured"
                  ? "bg-homeez-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-200 rounded-l-lg`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("top-rated")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "top-rated"
                  ? "bg-homeez-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-200`}
            >
              Top Rated
            </button>
            <button
              onClick={() => setActiveTab("most-trusted")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "most-trusted"
                  ? "bg-homeez-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-200 rounded-r-lg`}
            >
              Most Trusted
            </button>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProviders.map((provider) => (
            <motion.div 
              key={provider.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl overflow-hidden shadow-medium hover:shadow-hard transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{provider.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(provider.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">
                      ({provider.reviews})
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3">{provider.experience} experience</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {provider.serviceIds.map((serviceId, idx) => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-homeez-50 text-homeez-700 rounded-full"
                        >
                          {service.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                  
                  <div className="w-full border-t border-gray-100 pt-3 mt-2">
                    <div className="flex items-start mb-2">
                      <MapPin size={14} className="text-gray-500 mr-2 mt-1 shrink-0" />
                      <p className="text-sm text-gray-600">{provider.address || "Mumbai, Maharashtra"}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Phone size={14} className="text-gray-500 mr-2 shrink-0" />
                      <p className="text-sm text-gray-600">{provider.phone || "+91 9876543210"}</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1 mt-3">
                    <div 
                      className="h-2 rounded-full bg-green-500" 
                      style={{ width: `${provider.trustScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-xs text-gray-600">Trust Score: {provider.trustScore}%</p>
                    <div className="flex items-center">
                      <Badge size={12} className="text-green-500 mr-1" />
                      <p className="text-xs text-green-600">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-3 flex justify-between items-center">
                <div className={`text-center font-medium text-sm ${provider.busy ? 'text-amber-700' : 'text-green-700'}`}>
                  {provider.busy ? "Currently Busy" : "Available Now"}
                </div>
                
                <Button variant="outline" size="sm" className="text-xs">
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-10">
          <Button className="bg-homeez-600 hover:bg-homeez-700">
            View All Providers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviders;
