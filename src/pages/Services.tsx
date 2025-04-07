
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavBarWrapper from "@/components/NavBarWrapper";
import Footer from "@/components/Footer";
import { services } from "@/utils/data";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBarWrapper />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="relative bg-homeez-600 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-homeez-700 to-homeez-500 opacity-80" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
              <p className="max-w-2xl mx-auto text-homeez-50">
                Browse our wide range of home services tailored to meet your needs. 
                All our services are performed by trained and verified professionals.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ServiceCard 
                    service={service} 
                    featured={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
