
import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="relative bg-homeez-600 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-homeez-700 to-homeez-500 opacity-80" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
              <p className="max-w-2xl mx-auto text-homeez-50">
                Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact information and form */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have a question, feedback, or want to learn more about our services? Our team is ready to assist you. Reach out to us using any of the contact methods below.
                </p>
                
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-homeez-100 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-homeez-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        HomeEZ Headquarters, <br />
                        123 Service Road, <br />
                        Mumbai, India 400001
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-homeez-100 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-homeez-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+918308370972" className="hover:text-homeez-600 transition-colors">
                          +91 8308370972
                        </a>
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Monday-Friday: 9:00 AM - 8:00 PM <br />
                        Saturday: 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-homeez-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-homeez-600 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:gauranggosavi6@gmail.com" className="hover:text-homeez-600 transition-colors">
                          gauranggosavi6@gmail.com
                        </a>
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        We'll respond as soon as possible
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Map */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Our Location</h3>
                  <div className="rounded-lg overflow-hidden shadow-md h-64 bg-gray-200">
                    {/* Replace with an actual map component like Google Maps */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <p className="text-gray-600 text-center">
                        Interactive Map <br />
                        <span className="text-sm">(Google Maps integration)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-homeez-600 hover:bg-homeez-700" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
