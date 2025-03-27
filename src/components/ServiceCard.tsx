
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/utils/data";
import { Home, Zap, Wrench, Bug, Hammer, Scissors, Utensils, Pill, Paintbrush } from "lucide-react";

const getIconForService = (iconName: string) => {
  switch (iconName) {
    case "home":
      return <Home className="h-6 w-6" />;
    case "zap":
      return <Zap className="h-6 w-6" />;
    case "wrench":
      return <Wrench className="h-6 w-6" />;
    case "bug":
      return <Bug className="h-6 w-6" />;
    case "hammer":
      return <Hammer className="h-6 w-6" />;
    case "scissors":
      return <Scissors className="h-6 w-6" />;
    case "utensils":
      return <Utensils className="h-6 w-6" />;
    case "pill":
      return <Pill className="h-6 w-6" />;
    case "paintbrush":
      return <Paintbrush className="h-6 w-6" />;
    default:
      return <Home className="h-6 w-6" />;
  }
};

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

const ServiceCard = ({ service, featured = false }: ServiceCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/services/${service.id}`);
  };

  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all duration-300 hover-lift ${featured ? 'h-full' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={service.image} 
          alt={service.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
        
        {service.popular && (
          <div className="absolute top-2 right-2 bg-homeez-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            Popular
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
          {featured && (
            <p className="text-sm opacity-90 line-clamp-2">{service.description}</p>
          )}
        </div>
      </div>
      
      {!featured && (
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-homeez-50 text-homeez-600">
                {getIconForService(service.icon)}
              </div>
              <p className="text-sm text-gray-500">{service.options.length} services</p>
            </div>
            <div className="text-homeez-600 font-medium text-sm">View Details →</div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ServiceCard;
