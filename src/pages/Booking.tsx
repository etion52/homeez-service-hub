
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBarWrapper from "@/components/NavBarWrapper";
import Footer from "@/components/Footer";
import { services } from "@/utils/data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [service, setService] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Convert serviceId to number before comparing
    const numericServiceId = parseInt(serviceId);
    const foundService = services.find(s => s.id === numericServiceId);
    
    if (foundService) {
      setService(foundService);
      // Set default selections if available
      if (foundService.options && foundService.options.length > 0) {
        setSelectedOption(foundService.options[0].name);
        setSelectedPrice(foundService.options[0].price);
      }
    } else {
      // Handle service not found
      toast({
        title: "Service not found",
        description: "The requested service could not be found.",
        variant: "destructive",
      });
      navigate("/services");
    }
  }, [serviceId, navigate, toast]);
  
  // Available time slots
  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM", "06:00 PM"
  ];
  
  // Handle option selection
  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    const option = service.options.find(opt => opt.name === value);
    if (option) {
      setSelectedPrice(option.price);
    }
  };
  
  // Handle booking submission
  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book a service.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedOption || !timeSlot) {
      toast({
        title: "Incomplete booking",
        description: "Please select a service option and time slot.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Booking successful!",
        description: `Your ${service.name} service has been booked for ${format(date, "PPP")} at ${timeSlot}.`,
      });
      
      navigate("/dashboard");
    }, 1500);
  };
  
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBarWrapper />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="text-gray-500">Loading service information...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBarWrapper />
      
      <main className="flex-grow pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Book {service.name}</h1>
            
            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <div className="flex items-start mb-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden mr-4">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Service Option Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Service Option</label>
                  
                  <Select value={selectedOption} onValueChange={handleOptionSelect}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Options</SelectLabel>
                        {service.options.map((option) => (
                          <SelectItem key={option.name} value={option.name}>
                            {option.name} - ${option.price}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <div className="border border-gray-200 rounded-md p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                      className="rounded-md"
                    />
                  </div>
                </div>
                
                {/* Time Slot Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        className={`py-2 px-3 rounded-md text-sm transition-colors ${
                          timeSlot === slot 
                            ? "bg-homeez-600 text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setTimeSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Summary */}
            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Option:</span>
                  <span className="font-medium">{selectedOption || "Not selected"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{format(date, "PPP")}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{timeSlot || "Not selected"}</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-3 font-semibold">
                  <span>Total:</span>
                  <span className="text-homeez-600">${selectedPrice}</span>
                </div>
              </div>
            </div>
            
            {/* Booking Button */}
            <div className="flex justify-end">
              <Button 
                className="bg-homeez-600 hover:bg-homeez-700 text-white font-medium py-3 px-6 rounded-lg"
                disabled={loading || !selectedOption || !timeSlot}
                onClick={handleBooking}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
