
import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
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
        
        {/* Contact form and info */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="md:flex">
                {/* Contact info */}
                <div className="md:w-1/3 bg-homeez-600 text-white p-8 md:p-12">
                  <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                  <p className="mb-8 text-homeez-100">
                    Feel free to contact us through any of the channels below. We're always eager to hear from you!
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-homeez-300 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Our Address</h3>
                        <p className="text-homeez-200">
                          HomeEZ Headquarters,<br />
                          123 Service Road,<br />
                          Mumbai, India 400001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-homeez-300 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-homeez-200">+91 8308370972</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-homeez-300 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-homeez-200">gauranggosavi6@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-homeez-300 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <p className="text-homeez-200">
                          Monday - Saturday: 9AM - 8PM<br />
                          Sunday: 10AM - 5PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact form */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Please provide details about your query or feedback..."
                        required
                        className="resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-homeez-600 hover:bg-homeez-700 w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-md h-96"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.88118615!3d19.08179595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1626347173973!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="HomeEZ location map"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Find quick answers to common questions about our services.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How do I book a service?",
                  answer: "Booking a service is easy! Browse our available services, select the one you need, choose a date and time that works for you, and complete the checkout process. You'll receive a confirmation email with all the details."
                },
                {
                  question: "Are your service providers verified?",
                  answer: "Yes, all our service providers undergo a thorough verification process. We check their identity, expertise, and conduct background checks to ensure they meet our quality standards before they can offer services on our platform."
                },
                {
                  question: "What if I'm not satisfied with the service?",
                  answer: "Your satisfaction is our priority. If you're not completely satisfied with the service, please let us know within 24 hours of service completion. We'll work to address your concerns or provide a refund/rescheduling as appropriate."
                },
                {
                  question: "Can I reschedule or cancel my booking?",
                  answer: "Yes, you can reschedule or cancel your booking through your account dashboard. Please note that cancellations made less than 4 hours before the scheduled service may incur a cancellation fee."
                },
                {
                  question: "How do I provide feedback about a service?",
                  answer: "After each service is completed, you'll receive an email with a link to rate and review your experience. You can also provide feedback through your account dashboard under 'Service History'."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
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

export default Contact;
