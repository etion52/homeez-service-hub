
import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Users, Award, ClipboardCheck, ThumbsUp, Clock, MapPin, Phone, Mail } from "lucide-react";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const teamMembers = [
    {
      name: "Rahul Sharma",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Rahul has over 15 years of experience in the home services industry."
    },
    {
      name: "Priya Patel",
      position: "Operations Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Priya ensures all our operations run smoothly and efficiently."
    },
    {
      name: "Vikram Singh",
      position: "Head of Service Quality",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Vikram trains and monitors our service providers to maintain quality."
    },
    {
      name: "Ananya Desai",
      position: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Ananya is dedicated to ensuring our customers have the best experience."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="relative bg-homeez-600 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-homeez-700 to-homeez-500 opacity-80" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About HomeEZ</h1>
              <p className="max-w-2xl mx-auto text-homeez-50">
                We're on a mission to make home services easy, reliable, and affordable for everyone.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our story */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600">
                HomeEZ began in 2018 with a simple idea: home services should be easy to book, reliable to use, and fairly priced. Our founder, Rahul Sharma, experienced firsthand the frustration of trying to find trustworthy service providers for his home. This led to the creation of HomeEZ - a platform that connects homeowners with verified, skilled professionals.
              </p>
            </div>
            
            <div className="md:flex md:items-center md:justify-between md:space-x-10">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.img 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                  alt="HomeEZ office" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 mb-6">
                    We envision a world where managing home services is effortless, where quality is consistent, and where both service providers and customers benefit from a transparent, efficient platform.
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 p-1 bg-homeez-100 rounded-full mr-3">
                        <ThumbsUp className="h-5 w-5 text-homeez-600" />
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">Quality First</h4>
                        <p className="text-gray-600">We never compromise on the quality of our services.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 p-1 bg-homeez-100 rounded-full mr-3">
                        <ClipboardCheck className="h-5 w-5 text-homeez-600" />
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">Reliability</h4>
                        <p className="text-gray-600">We are committed to being dependable and consistent.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 p-1 bg-homeez-100 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-homeez-600" />
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">Timeliness</h4>
                        <p className="text-gray-600">We respect your time and schedule with punctual service.</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Meet the passionate people behind HomeEZ who work tirelessly to make your home service experience exceptional.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-homeez-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-homeez-600 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-homeez-500">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="p-8 text-center"
                >
                  <Users className="h-10 w-10 text-white mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">20,000+</div>
                  <div className="text-homeez-200">Happy Customers</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 text-center"
                >
                  <Award className="h-10 w-10 text-white mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">5,000+</div>
                  <div className="text-homeez-200">Service Providers</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 text-center"
                >
                  <ClipboardCheck className="h-10 w-10 text-white mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">100,000+</div>
                  <div className="text-homeez-200">Services Completed</div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
