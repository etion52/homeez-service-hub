
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { 
  User, 
  Clock, 
  Heart, 
  Star, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Mail, 
  Phone, 
  Calendar, 
  Home, 
  UploadCloud 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("profile");
  const { user, signOut, updateProfile, getUserProfile } = useAuth();
  
  // User profile data
  const [userProfile, setUserProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    avatar_url: "",
    created_at: ""
  });
  
  useEffect(() => {
    if (tabParam && ["profile", "bookings", "wishlist", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const profileData = await getUserProfile();
        if (profileData) {
          setUserProfile(profileData);
          // Also update the edit form data
          setEditedUserInfo({
            full_name: profileData.full_name || "",
            phone: profileData.phone || "",
            address: profileData.address || "",
            avatar_url: profileData.avatar_url || ""
          });
        }
      }
    };
    
    fetchUserProfile();
  }, [user, getUserProfile]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    full_name: "",
    phone: "",
    address: "",
    avatar_url: ""
  });
  
  const handleSaveProfile = async () => {
    await updateProfile(editedUserInfo);
    // Refresh the user profile data
    const updatedProfile = await getUserProfile();
    if (updatedProfile) {
      setUserProfile(updatedProfile);
    }
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUserInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUploadAvatar = () => {
    // In a real app, this would open a file picker and upload the image to storage
    toast.info("Avatar upload functionality will be implemented soon");
  };
  
  const bookings = [
    {
      id: "BK123456",
      service: "Home Cleaning",
      date: "12 May 2023",
      time: "10:00 - 11:00",
      amount: 1299,
      status: "Completed"
    },
    {
      id: "BK123457",
      service: "Plumbing",
      date: "5 May 2023",
      time: "14:00 - 15:00",
      amount: 799,
      status: "Completed"
    },
    {
      id: "BK123458",
      service: "Electrician",
      date: "28 Apr 2023",
      time: "09:00 - 10:00",
      amount: 599,
      status: "Cancelled"
    },
  ];
  
  const wishlist = [
    {
      id: "ws1",
      service: "Women's Salon & Spa",
      option: "Facial",
      price: 1499
    },
    {
      id: "ws2",
      service: "Home Decoration",
      option: "Wall Painting Design",
      price: 7999
    }
  ];
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Format date from ISO string
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userProfile.full_name) return "U";
    
    const parts = userProfile.full_name.split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return userProfile.full_name[0]?.toUpperCase() || "U";
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={userProfile.avatar_url} alt={userProfile.full_name} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{userProfile.full_name}</h2>
                    <p className="text-gray-500 text-sm">{userProfile.email}</p>
                  </div>
                  
                  <nav className="space-y-1">
                    <a
                      href="#profile"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("profile");
                      }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "profile" ? "bg-homeez-50 text-homeez-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </a>
                    <a
                      href="#bookings"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("bookings");
                      }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "bookings" ? "bg-homeez-50 text-homeez-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <Clock className="h-5 w-5" />
                      <span>Booking History</span>
                    </a>
                    <a
                      href="#wishlist"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("wishlist");
                      }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "wishlist" ? "bg-homeez-50 text-homeez-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </a>
                    <a
                      href="#ratings"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("ratings");
                      }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "ratings" ? "bg-homeez-50 text-homeez-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <Star className="h-5 w-5" />
                      <span>My Ratings</span>
                    </a>
                    <a
                      href="#settings"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("settings");
                      }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "settings" ? "bg-homeez-50 text-homeez-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </a>
                    <a
                      href="#help"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("help");
                      }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${activeTab === "help" ? "bg-homeez-50 text-homeez-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <HelpCircle className="h-5 w-5" />
                      <span>Help & Support</span>
                    </a>
                    <div className="pt-4 mt-4 border-t">
                      <button 
                        onClick={signOut}
                        className="flex items-center space-x-3 px-3 py-2 w-full text-left rounded-md text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Personal Information</CardTitle>
                          <CardDescription>Manage your personal details</CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button 
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit Profile
                          </Button>
                        ) : (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setIsEditing(false);
                                setEditedUserInfo({
                                  full_name: userProfile.full_name || "",
                                  phone: userProfile.phone || "",
                                  address: userProfile.address || "",
                                  avatar_url: userProfile.avatar_url || ""
                                });
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="bg-homeez-600 hover:bg-homeez-700"
                              onClick={handleSaveProfile}
                            >
                              Save Changes
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {!isEditing ? (
                        <div className="space-y-6">
                          <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex justify-center">
                              <div className="text-center">
                                <Avatar className="w-32 h-32 mx-auto mb-4">
                                  <AvatarImage src={userProfile.avatar_url} alt={userProfile.full_name} />
                                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-gray-500">Profile photo</p>
                              </div>
                            </div>
                            
                            <div className="md:w-2/3">
                              <div className="space-y-4">
                                <div className="flex items-center">
                                  <User className="w-5 h-5 text-homeez-600 mr-2" />
                                  <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium">{userProfile.full_name || "Not provided"}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center">
                                  <Mail className="w-5 h-5 text-homeez-600 mr-2" />
                                  <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{userProfile.email || "Not provided"}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center">
                                  <Phone className="w-5 h-5 text-homeez-600 mr-2" />
                                  <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="font-medium">{userProfile.phone || "Not provided"}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center">
                                  <Home className="w-5 h-5 text-homeez-600 mr-2" />
                                  <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium">{userProfile.address || "Not provided"}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center">
                                  <Calendar className="w-5 h-5 text-homeez-600 mr-2" />
                                  <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium">{formatDate(userProfile.created_at) || "Not available"}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-6">
                            <h3 className="font-medium mb-4">Account Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-homeez-600 mb-1">{bookings.length}</div>
                                <div className="text-sm text-gray-600">Services Booked</div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-homeez-600 mb-1">{wishlist.length}</div>
                                <div className="text-sm text-gray-600">Active Wishlist Items</div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-homeez-600 mb-1">4.8</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex justify-center">
                              <div className="text-center">
                                <Avatar className="w-32 h-32 mx-auto mb-4">
                                  <AvatarImage src={editedUserInfo.avatar_url} alt={editedUserInfo.full_name} />
                                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                </Avatar>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs flex items-center"
                                  onClick={handleUploadAvatar}
                                >
                                  <UploadCloud className="h-3 w-3 mr-1" />
                                  Change Photo
                                </Button>
                              </div>
                            </div>
                            
                            <div className="md:w-2/3">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="full_name">Full Name</Label>
                                  <Input 
                                    id="full_name"
                                    name="full_name"
                                    value={editedUserInfo.full_name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input 
                                    id="email"
                                    value={userProfile.email}
                                    disabled
                                    className="bg-gray-50"
                                  />
                                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input 
                                    id="phone"
                                    name="phone"
                                    value={editedUserInfo.phone}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="address">Address</Label>
                                  <Input 
                                    id="address"
                                    name="address"
                                    value={editedUserInfo.address}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking History</CardTitle>
                      <CardDescription>View your past service bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="space-y-4"
                      >
                        {bookings.map((booking) => (
                          <motion.div
                            key={booking.id}
                            variants={staggerItem}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{booking.service}</h3>
                                <div className="text-sm text-gray-600 mt-1">
                                  {booking.date} | {booking.time}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600 mb-1">
                                  Booking ID: {booking.id}
                                </div>
                                <div className={`text-sm font-medium ${
                                  booking.status === "Completed" 
                                    ? "text-green-600" 
                                    : booking.status === "Cancelled" 
                                    ? "text-red-600"
                                    : "text-amber-600"
                                }`}>
                                  {booking.status}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <div className="text-lg font-semibold">
                                ₹{booking.amount}
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                {booking.status === "Completed" && (
                                  <Button 
                                    size="sm"
                                    className="bg-homeez-600 hover:bg-homeez-700"
                                  >
                                    Book Again
                                  </Button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                      <CardDescription>Services you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {wishlist.map((item) => (
                          <motion.div
                            key={item.id}
                            variants={staggerItem}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{item.service}</h3>
                                <p className="text-sm text-gray-600 mt-1">{item.option}</p>
                              </div>
                              <div className="text-lg font-semibold">
                                ₹{item.price}
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline" size="sm">
                                Remove
                              </Button>
                              <Button 
                                size="sm"
                                className="bg-homeez-600 hover:bg-homeez-700"
                              >
                                Book Now
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="ratings">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Ratings & Reviews</CardTitle>
                      <CardDescription>See your ratings and reviews for previous services</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-10">
                      <div className="mb-4">
                        <Star className="h-12 w-12 mx-auto text-gray-300" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Ratings Yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        You haven't rated any services yet. After completing a service, you'll be able to leave ratings and reviews here.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="help">
                  <Card>
                    <CardHeader>
                      <CardTitle>Help & Support</CardTitle>
                      <CardDescription>Get assistance with your HomeEZ account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                          <div className="space-y-3">
                            <div className="bg-white p-3 rounded border">
                              <h4 className="font-medium">How do I cancel a booking?</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Go to your Booking History, find the booking you want to cancel, and click "Cancel Booking".
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <h4 className="font-medium">How do I reschedule a service?</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Contact our customer support team at least 4 hours before your scheduled appointment to reschedule.
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <h4 className="font-medium">How do payments work?</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                You can pay online through our secure payment gateway or in cash after the service is completed.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-homeez-50 p-6 rounded-lg text-center">
                          <h3 className="text-lg font-medium mb-3">Need more help?</h3>
                          <p className="mb-4 text-gray-700">
                            Our support team is here to help you with any questions or issues.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button className="bg-homeez-600 hover:bg-homeez-700">
                              Contact Support
                            </Button>
                            <Button variant="outline">
                              Live Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-gray-600">Receive booking updates and offers via email</p>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                className="toggle toggle-primary" 
                                defaultChecked 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">SMS Notifications</p>
                              <p className="text-sm text-gray-600">Receive booking updates and offers via SMS</p>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                className="toggle toggle-primary" 
                                defaultChecked 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Marketing Communications</p>
                              <p className="text-sm text-gray-600">Receive promotional offers and newsletters</p>
                            </div>
                            <div>
                              <input 
                                type="checkbox" 
                                className="toggle toggle-primary" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-3">Password</h3>
                        <Button variant="outline">
                          Change Password
                        </Button>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-3">Language</h3>
                        <select className="select select-bordered w-full max-w-xs">
                          <option>English</option>
                          <option>Hindi</option>
                          <option>Marathi</option>
                        </select>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
