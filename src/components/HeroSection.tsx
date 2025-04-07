
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onSignUpClick?: () => void;
};

const HeroSection = ({ onSignUpClick }: HeroSectionProps) => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-homeez-50 relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-homeez-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-homeez-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-10 right-1/3 w-48 h-48 bg-homeez-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Home Services, <span className="text-homeez-600">Made Easy</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
                One-stop solution for all your home service needs. Book trusted professionals for cleaning, repairs, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  className="bg-homeez-600 hover:bg-homeez-700 text-white px-6 py-6 h-auto text-lg shadow-lg"
                  onClick={onSignUpClick}
                >
                  Get Started Today
                </Button>
                <Button 
                  variant="outline" 
                  className="border-homeez-600 text-homeez-600 hover:bg-homeez-50 px-6 py-6 h-auto text-lg"
                  asChild
                >
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
              
              <div className="mt-10 flex items-center justify-center md:justify-start space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-homeez-100 flex items-center justify-center text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Trusted by</span>
                  <span className="font-semibold text-gray-900 ml-1">10,000+</span>
                  <span className="text-gray-600 ml-1">customers</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-homeez-600 rounded-xl -rotate-3 scale-95 opacity-20 blur-sm"></div>
              <img 
                src="/assets/hero-image.png" 
                alt="HomeEZ Services" 
                className="relative rounded-xl shadow-xl w-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/homeez-600/white?text=HomeEZ+Services';
                }}
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg max-w-[200px]">
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  "Amazing service! The plumber was professional and fixed our issue in no time."
                </p>
                <div className="mt-2 text-xs font-medium">- Sarah J.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
