
import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/utils/data";

const FeaturedServices = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const popularServices = services.filter(service => service.popular);
  
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h4 className="text-homeez-600 font-medium text-sm mb-2">OUR SERVICES</h4>
            <h2 className="text-3xl font-bold text-gray-900">Popular Services</h2>
            <p className="text-gray-600 mt-2 max-w-xl">
              Discover our most booked services that help keep your home running smoothly.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-6 scrollbar-hide snap-x scroll-pl-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.div 
            className="grid grid-flow-col auto-cols-max gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {popularServices.map((service) => (
              <motion.div 
                key={service.id} 
                className="w-[300px] snap-start flex-shrink-0"
                variants={itemVariants}
              >
                <ServiceCard service={service} featured={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate("/services")}
            className="bg-homeez-600 hover:bg-homeez-700"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
