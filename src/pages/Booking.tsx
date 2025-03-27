import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services, serviceProviders, availableTimeSlots, ServiceOption } from "@/utils/data";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, CreditCard, CheckCircle, AlertCircle, Star } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type BookingStep = "details" | "datetime" | "address" | "payment" | "confirmation";

const Booking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [searchParams] = useSearchParams();
  const optionId = searchParams.get("option");
  const navigate = useNavigate();
  
  const [service, setService] = useState(services.find(s => s.id === serviceId));
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(
    service?.options.find(o => o.id === optionId) || null
  );
  const [currentStep, setCurrentStep] = useState<BookingStep>("details");
  const [selectedProvider, setSelectedProvider] = useState(serviceProviders[0]);
  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(availableTimeSlots[0]);
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("online");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!service || !selectedOption) {
      navigate(`/services/${serviceId}`);
      return;
    }
    
    setBookingId(`BK${Math.floor(100000 + Math.random() * 900000)}`);
  }, [serviceId, optionId, service, selectedOption, navigate]);
  
  const providers = serviceProviders.filter(provider => 
    provider.serviceIds.includes(serviceId || "") && !provider.busy
  );
  
  const handleNext = () => {
    if (currentStep === "details") {
      if (!selectedProvider) {
        toast.error("Please select a service provider");
        return;
      }
      setCurrentStep("datetime");
    } 
    else if (currentStep === "datetime") {
      if (!selectedTimeSlot) {
        toast.error("Please select a time slot");
        return;
      }
      setCurrentStep("address");
    } 
    else if (currentStep === "address") {
      if (!validateAddress()) {
        toast.error("Please fill in all required address fields");
        return;
      }
      setCurrentStep("payment");
    } 
    else if (currentStep === "payment") {
      toast.success("Payment successful!");
      setCurrentStep("confirmation");
      setBookingComplete(true);
    }
  };
  
  const handleBack = () => {
    if (currentStep === "datetime") setCurrentStep("details");
    else if (currentStep === "address") setCurrentStep("datetime");
    else if (currentStep === "payment") setCurrentStep("address");
  };
  
  const validateAddress = () => {
    return (
      address.name !== "" &&
      address.line1 !== "" &&
      address.city !== "" &&
      address.state !== "" &&
      address.pincode !== "" &&
      address.phone !== ""
    );
  };
  
  const formattedDate = bookingDate ? format(bookingDate, "EEEE, MMMM d, yyyy") : "";
  
  if (!service || !selectedOption) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar isLoggedIn={true} />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button 
              onClick={() => 
                currentStep === "details" 
                  ? navigate(`/services/${serviceId}`)
                  : handleBack()
              }
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
              disabled={currentStep === "confirmation"}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {currentStep === "details" ? "Back to service details" : "Previous step"}
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book {service.name}</h1>
            <p className="text-gray-600">{selectedOption.name} - ₹{selectedOption.price}</p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between max-w-3xl mx-auto">
              {(["details", "datetime", "address", "payment", "confirmation"] as BookingStep[]).map((step, index) => (
                <div 
                  key={step} 
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === step
                        ? "bg-homeez-600 text-white"
                        : currentStep === "confirmation" || (
                            ["details", "datetime", "address", "payment"].indexOf(currentStep) >
                            ["details", "datetime", "address", "payment"].indexOf(step)
                          )
                          ? "bg-green-100 text-green-600 border border-green-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentStep === "confirmation" || (
                      ["details", "datetime", "address", "payment"].indexOf(currentStep) >
                      ["details", "datetime", "address", "payment"].indexOf(step)
                    ) ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-2 capitalize">{step}</span>
                </div>
              ))}
            </div>
            
            <div className="relative max-w-3xl mx-auto mt-2">
              <div className="absolute top-0 left-10 right-10 h-1 bg-gray-200 -translate-y-6 z-0" />
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {currentStep === "details" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Select Service Provider</CardTitle>
                    <CardDescription>
                      Choose your preferred service provider for {service.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {providers.length > 0 ? (
                        providers.map((provider) => (
                          <div 
                            key={provider.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              selectedProvider?.id === provider.id 
                                ? "border-homeez-600 bg-homeez-50" 
                                : "border-gray-200 hover:border-homeez-300"
                            }`}
                            onClick={() => setSelectedProvider(provider)}
                          >
                            <div className="flex items-center">
                              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                <img 
                                  src={provider.image} 
                                  alt={provider.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div>
                                <h3 className="font-semibold text-lg">{provider.name}</h3>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
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
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <span>Experience: {provider.experience}</span>
                                  <span className="mx-2">•</span>
                                  <span>Trust Score: {provider.trustScore}%</span>
                                </div>
                              </div>
                              
                              {selectedProvider?.id === provider.id && (
                                <div className="ml-auto text-homeez-600">
                                  <CheckCircle className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                          <h3 className="text-lg font-semibold">No providers available</h3>
                          <p className="text-gray-600">There are no service providers available for this service at the moment.</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => navigate(`/services/${serviceId}`)}
                          >
                            Go Back
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button 
                      onClick={handleNext}
                      className="bg-homeez-600 hover:bg-homeez-700"
                      disabled={!selectedProvider}
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
            
            {currentStep === "datetime" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date & Time</CardTitle>
                    <CardDescription>
                      Choose your preferred date and time for the service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium mb-2 block">Select Date</Label>
                        <div className="grid grid-cols-4 gap-3 mt-2">
                          {[0, 1, 2, 3].map((dayOffset) => {
                            const date = new Date();
                            date.setDate(date.getDate() + dayOffset);
                            const isToday = dayOffset === 0;
                            const isTomorrow = dayOffset === 1;
                            
                            return (
                              <div
                                key={dayOffset}
                                className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                                  bookingDate && date.toDateString() === bookingDate.toDateString()
                                    ? "border-homeez-600 bg-homeez-50"
                                    : "border-gray-200 hover:border-homeez-300"
                                }`}
                                onClick={() => setBookingDate(date)}
                              >
                                <p className="text-sm text-gray-500">
                                  {isToday ? "Today" : isTomorrow ? "Tomorrow" : format(date, "EEE")}
                                </p>
                                <p className="font-semibold">{format(date, "MMM d")}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-base font-medium mb-2 block">Select Time Slot</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {availableTimeSlots.map((slot) => (
                            <div
                              key={slot.id}
                              className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                                !slot.available 
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : selectedTimeSlot?.id === slot.id
                                    ? "border-homeez-600 bg-homeez-50"
                                    : "border-gray-200 hover:border-homeez-300"
                              }`}
                              onClick={() => {
                                if (slot.available) {
                                  setSelectedTimeSlot(slot);
                                } else {
                                  toast.error("This time slot is not available");
                                }
                              }}
                            >
                              <div className="flex items-center justify-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{slot.time}</span>
                              </div>
                              {!slot.available && (
                                <p className="text-xs text-gray-500 mt-1">Not Available</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes" className="text-base font-medium mb-2 block">
                          Additional Notes (Optional)
                        </Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Any specific instructions for the service provider..."
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext}
                      className="bg-homeez-600 hover:bg-homeez-700"
                      disabled={!selectedTimeSlot}
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
            
            {currentStep === "address" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Service Address</CardTitle>
                    <CardDescription>
                      Provide the address where you would like to receive the service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe"
                          value={address.name}
                          onChange={(e) => setAddress({...address, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="line1">Address Line 1</Label>
                        <Input 
                          id="line1" 
                          placeholder="House/Flat No., Building Name"
                          value={address.line1}
                          onChange={(e) => setAddress({...address, line1: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                        <Input 
                          id="line2" 
                          placeholder="Street, Locality"
                          value={address.line2}
                          onChange={(e) => setAddress({...address, line2: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            placeholder="Mumbai"
                            value={address.city}
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            placeholder="Maharashtra"
                            value={address.state}
                            onChange={(e) => setAddress({...address, state: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input 
                            id="pincode" 
                            placeholder="400001"
                            value={address.pincode}
                            onChange={(e) => setAddress({...address, pincode: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="+91 9876543210"
                            value={address.phone}
                            onChange={(e) => setAddress({...address, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext}
                      className="bg-homeez-600 hover:bg-homeez-700"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
            
            {currentStep === "payment" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>
                      Complete your booking by making a payment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Booking Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service</span>
                            <span>{service.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Option</span>
                            <span>{selectedOption.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Provider</span>
                            <span>{selectedProvider.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time</span>
                            <span>{selectedTimeSlot.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration</span>
                            <span>{selectedOption.duration}</span>
                          </div>
                          <div className="border-t my-2"></div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service Charge</span>
                            <span>₹{selectedOption.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Convenience Fee</span>
                            <span>₹49</span>
                          </div>
                          <div className="border-t my-2"></div>
                          <div className="flex justify-between font-semibold">
                            <span>Total Amount</span>
                            <span>₹{selectedOption.price + 49}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Select Payment Method
                        </Label>
                        
                        <RadioGroup 
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex-grow cursor-pointer">
                              <div className="flex items-center">
                                <CreditCard className="h-5 w-5 text-homeez-600 mr-2" />
                                <span>Online Payment (Card/UPI/Netbanking)</span>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex-grow cursor-pointer">
                              <div className="flex items-center">
                                <svg className="h-5 w-5 text-homeez-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
                                <span>Cash on Delivery</span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext}
                      className="bg-homeez-600 hover:bg-homeez-700"
                    >
                      {paymentMethod === "online" ? "Pay Now" : "Confirm Booking"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
            
            {currentStep === "confirmation" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Your {service.name} service has been booked successfully.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Booking ID</span>
                        <span className="font-medium">{bookingId}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Service</span>
                        <span>{service.name} - {selectedOption.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Provider</span>
                        <span>{selectedProvider.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Date & Time</span>
                        <span>{formattedDate}, {selectedTimeSlot.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address</span>
                        <span className="text-right max-w-[60%]">
                          {address.line1}, {address.line2 && `${address.line2}, `}
                          {address.city}, {address.state} - {address.pincode}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-homeez-600 mt-0.5" />
                        <div className="text-left">
                          <h3 className="font-medium">Booking Details Sent</h3>
                          <p className="text-sm text-gray-600">
                            We've sent the booking details to your email and phone number.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-homeez-600 mt-0.5" />
                        <div className="text-left">
                          <h3 className="font-medium">Service Location</h3>
                          <p className="text-sm text-gray-600">
                            Your service will be provided at the address you specified.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-homeez-600 mt-0.5" />
                        <div className="text-left">
                          <h3 className="font-medium">Service Time</h3>
                          <p className="text-sm text-gray-600">
                            Your service provider will arrive at {selectedTimeSlot.time} on {formattedDate}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button 
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go to Dashboard
                    </Button>
                    <Button 
                      className="bg-homeez-600 hover:bg-homeez-700"
                      onClick={() => navigate("/services")}
                    >
                      Book Another Service
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
