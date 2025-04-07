
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  
  // Open auth dialog with sign up tab
  const handleSignUpClick = () => {
    // Find the sign up button in the NavBar and click it
    const signUpButton = document.querySelector('[data-sign-up-button]') as HTMLButtonElement;
    if (signUpButton) {
      signUpButton.click();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <HeroSection onSignUpClick={handleSignUpClick} />
      
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Join HomeEZ Today</h2>
            <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
              Create an account to get started with HomeEZ services. Enjoy convenient booking, 
              service history tracking, and exclusive deals.
            </p>
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
            onClick={handleSignUpClick}
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
