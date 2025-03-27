
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, serviceProviders, ServiceOption } from "@/utils/data";
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState(services.find(s => s.id === serviceId));
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null);
  const [relatedServices, setRelatedServices] = useState<typeof services>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!service) {
      navigate("/services");
      return;
    }
    
    // Get related services (different from current service)
    const related = services
      .filter(s => s.id !== serviceId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setRelatedServices(related);
  }, [serviceId, service, navigate]);
  
  const providers = serviceProviders.filter(provider => 
    provider.serviceIds.includes(serviceId || "")
  );
  
  const handleProceedToBooking = () => {
    if (!selectedOption) {
      toast.error("Please select a service option to continue");
      return;
    }
    
    // In a real app, we would store the selection in state/context
    // and redirect to the booking page
    navigate(`/booking/${serviceId}?option=${selectedOption.id}`);
  };
  
  if (!service) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar isLoggedIn={true} />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section 
          className="relative h-[40vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
            <div className="relative text-white pb-10">
              <button 
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center text-sm hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{service.name}</h1>
              <p className="text-white/80 max-w-xl">{service.description}</p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Why Choose Our {service.name} Service</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex space-x-4">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600 h-min">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Trained Professionals</h3>
                      <p className="text-gray-600">Our professionals undergo rigorous training and verification</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="p-3 rounded-full bg-green-50 text-green-600 h-min">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">100% Quality Assured</h3>
                      <p className="text-gray-600">Guaranteed satisfaction with our service quality</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="p-3 rounded-full bg-purple-50 text-purple-600 h-min">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Transparent Pricing</h3>
                      <p className="text-gray-600">No hidden charges. Pay only for what you book</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="p-3 rounded-full bg-amber-50 text-amber-600 h-min">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Timely Service</h3>
                      <p className="text-gray-600">Our professionals arrive on time, every time</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Service options */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Choose a Service Option</h2>
                
                <div className="space-y-4">
                  {service.options.map((option) => (
                    <div 
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedOption?.id === option.id 
                          ? "border-homeez-600 bg-homeez-50" 
                          : "border-gray-200 hover:border-homeez-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedOption(option)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg">{option.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                          
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {option.duration}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold">₹{option.price}</div>
                          
                          {selectedOption?.id === option.id ? (
                            <div className="mt-2 text-homeez-600">
                              <Check className="h-5 w-5 inline-block" /> Selected
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Service providers */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Available Service Providers</h2>
                
                <div className="space-y-4">
                  {providers.map((provider) => (
                    <div 
                      key={provider.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                          <img 
                            src={provider.image} 
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{provider.name}</h3>
                            <div className={`${provider.busy ? 'text-amber-600' : 'text-green-600'} text-sm font-medium`}>
                              {provider.busy ? 'Currently Busy' : 'Available'}
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-1">
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
                          
                          <div className="text-sm text-gray-600 mt-1">
                            {provider.experience} experience
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">
                            Trust Score: <span className="font-medium text-green-600">{provider.trustScore}%</span>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={provider.busy}
                        >
                          {provider.busy ? "Unavailable" : "Select Provider"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* FAQ */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is included in the service?</AccordionTrigger>
                    <AccordionContent>
                      Our {service.name} service includes all the essentials mentioned in the service description. Each service option has specific inclusions detailed above. Our professionals come equipped with all necessary tools and supplies to complete the job.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How long will the service take?</AccordionTrigger>
                    <AccordionContent>
                      Service duration varies based on the option you select and the specific requirements of your home. You can see the estimated duration for each service option above. Our professionals work efficiently while ensuring quality.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What if I'm not satisfied with the service?</AccordionTrigger>
                    <AccordionContent>
                      Your satisfaction is our priority. If you're not completely satisfied with the service, please let us know within 24 hours and we'll arrange for a free rework. You can raise concerns through the app or by contacting our customer support.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I reschedule or cancel my booking?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can reschedule or cancel your booking through the app. For cancellations, please do so at least 2 hours before the scheduled time to avoid cancellation charges. Rescheduling can be done based on provider availability.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How are your service providers verified?</AccordionTrigger>
                    <AccordionContent>
                      All our service providers undergo a rigorous verification process including background checks, skill assessment, and training. We verify their identity, address, and professional experience before they join our platform. They maintain a high trust score through consistent good service.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-soft p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-4">Book Your Service</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Service</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Option</span>
                    <span className="font-medium">
                      {selectedOption ? selectedOption.name : "Not selected"}
                    </span>
                  </div>
                  
                  {selectedOption && (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{selectedOption.duration}</span>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Price</span>
                        <span className="font-medium">₹{selectedOption.price}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <Button 
                  onClick={handleProceedToBooking}
                  className="w-full bg-homeez-600 hover:bg-homeez-700"
                  disabled={!selectedOption}
                >
                  Proceed to Booking
                </Button>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  By proceeding, you agree to our <a href="#" className="text-homeez-600 hover:underline">Terms of Service</a>
                </div>
              </motion.div>
              
              {/* Related services */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <h3 className="text-xl font-bold mb-4">Related Services</h3>
                
                <div className="space-y-4">
                  {relatedServices.map((relatedService) => (
                    <div
                      key={relatedService.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                      onClick={() => navigate(`/services/${relatedService.id}`)}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={relatedService.image}
                          alt={relatedService.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{relatedService.name}</h4>
                        <p className="text-sm text-gray-500">{relatedService.options.length} options</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Contact support */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our customer support team is available to assist you with any questions or concerns.
                </p>
                <div className="flex flex-col space-y-2">
                  <a 
                    href="tel:+918308370972" 
                    className="flex items-center text-homeez-600 hover:underline"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    +91 8308370972
                  </a>
                  <a 
                    href="mailto:gauranggosavi6@gmail.com" 
                    className="flex items-center text-homeez-600 hover:underline"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    gauranggosavi6@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetails;
