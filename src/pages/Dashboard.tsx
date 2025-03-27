
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services, testimonials } from "@/utils/data";
import { 
  Calendar, 
  Clock, 
  Bell,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
      
      const hours = now.getHours();
      if (hours < 12) {
        setGreeting("Good Morning");
      } else if (hours < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar isLoggedIn={true} />
      
      <main className="flex-grow pt-16">
        {/* Welcome section */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {greeting}, User
                  </h1>
                  <span className="ml-2 px-3 py-1 bg-homeez-50 text-homeez-600 rounded-full text-xs font-medium">
                    {currentTime}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  Welcome to your HomeEZ dashboard
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Button variant="outline" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </Button>
                <Button className="bg-homeez-600 hover:bg-homeez-700">
                  Book a Service
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Dashboard content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Quick stats */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Upcoming Service</h3>
                  <p className="text-gray-500 text-sm">Home Cleaning</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Tomorrow, 10:00 AM</p>
                  <Button variant="link" className="p-0 h-auto text-homeez-600">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-soft p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Service History</h3>
                  <p className="text-gray-500 text-sm">Last 30 days</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">3 services completed</p>
                  <Button variant="link" className="p-0 h-auto text-homeez-600">
                    View All
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-soft p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Special Offers</h3>
                  <p className="text-gray-500 text-sm">Just for you</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">2 offers available</p>
                  <Button variant="link" className="p-0 h-auto text-homeez-600">
                    View Offers
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Services section */}
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
              <TabsList>
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recently Used</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {services.map((service) => (
                  <motion.div key={service.id} variants={staggerItem}>
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="popular">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {services
                  .filter(service => service.popular)
                  .map((service) => (
                    <motion.div key={service.id} variants={staggerItem}>
                      <ServiceCard service={service} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="recent">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {services
                  .slice(0, 4)
                  .map((service) => (
                    <motion.div key={service.id} variants={staggerItem}>
                      <ServiceCard service={service} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {/* Customer testimonials */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-soft p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.service}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`inline-block ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{testimonial.comment}</p>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Promotional banner */}
          <div className="bg-gradient-to-r from-homeez-700 to-homeez-900 rounded-xl overflow-hidden shadow-medium">
            <div className="p-8 text-white flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Invite Friends & Earn Rewards</h2>
                <p className="text-homeez-100 mb-4">
                  Get ₹200 in your HomeEZ wallet for every friend who signs up and completes their first service.
                </p>
                <Button className="bg-white text-homeez-700 hover:bg-gray-100">
                  Share Invite Code
                </Button>
              </div>
              <div className="md:w-1/3 md:text-right">
                <span className="inline-block px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm font-mono tracking-wider">
                  Your Code: HOME200
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
