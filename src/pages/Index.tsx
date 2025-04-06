
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturedServices from "@/components/FeaturedServices";
import ServiceProviders from "@/components/ServiceProviders";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const handleAuthSuccess = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <HeroSection />
      
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-homeez-50 p-10 rounded-2xl relative overflow-hidden mb-8 md:mb-0"
              >
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-homeez-100 rounded-full opacity-70" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-homeez-200 rounded-full opacity-70" />
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Join HomeEZ Today</h2>
                <p className="text-gray-700 mb-6 relative z-10">
                  Create an account to get started with HomeEZ services. Enjoy convenient booking, service history tracking, and exclusive deals.
                </p>
                
                <ul className="space-y-3 text-gray-700 mb-8 relative z-10">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-homeez-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Book services with verified professionals
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-homeez-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Track your service history and bookings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-homeez-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Get exclusive deals and promotions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-homeez-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Choose your preferred service providers
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <AuthForm onSuccess={handleAuthSuccess} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedServices />
      
      <ServiceProviders />
      
      <section className="py-16 bg-homeez-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-homeez-100">
            Join thousands of satisfied customers who trust HomeEZ for their home service needs.
          </p>
          <button 
            className="bg-white text-homeez-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            onClick={() => {
              const authFormElement = document.getElementById('auth-form');
              if (authFormElement) {
                authFormElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Sign Up Now
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
