
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

type AuthFormProps = {
  onSuccess: () => void;
};

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Register form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoginLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoginLoading(false);
      toast.success("Login successful");
      onSuccess();
      navigate("/dashboard");
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!fullName || !email || !phone || !dob || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    
    setIsRegisterLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegisterLoading(false);
      toast.success("Registration successful");
      setActiveTab("login");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto">
      <Card className="w-full shadow-medium">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to HomeEZ
          </CardTitle>
          <CardDescription className="text-center">
            Your one-stop solution for home services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-fade-in">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-homeez-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="login-password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-homeez-600 hover:bg-homeez-700 transition-colors"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="animate-fade-in">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 9876543210" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-homeez-600 hover:underline">
                      terms and conditions
                    </a>
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-homeez-600 hover:bg-homeez-700 transition-colors"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-center text-gray-500 mt-4">
            By continuing, you agree to HomeEZ's{" "}
            <a href="#" className="text-homeez-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-homeez-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
