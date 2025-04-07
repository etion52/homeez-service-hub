export type Service = {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  popular: boolean;
  options: ServiceOption[];
};

export type ServiceOption = {
  id: number;
  name: string;
  price: number;
  duration: string;
  description: string;
};

export type ServiceProvider = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  experience: number;
  serviceIds: number[];
  isFeatured: boolean;
  trustScore: number;
  busy: boolean;
  address?: string;
  phone?: string;
};

export const services: Service[] = [
  {
    id: 1,
    name: "Home Cleaning",
    description: "Professional cleaning services for your home",
    icon: "home",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: true,
    options: [
      {
        id: 1,
        name: "Cleaning for Furnished 1BHK",
        price: 1299,
        duration: "3 hours",
        description: "Complete cleaning for a furnished 1BHK apartment"
      },
      {
        id: 2,
        name: "Cleaning for Furnished 2BHK",
        price: 1699,
        duration: "4 hours",
        description: "Complete cleaning for a furnished 2BHK apartment"
      },
      {
        id: 3,
        name: "Cleaning for Furnished 3BHK",
        price: 2099,
        duration: "5 hours",
        description: "Complete cleaning for a furnished 3BHK apartment"
      },
      {
        id: 4,
        name: "Kitchen Cleaning",
        price: 699,
        duration: "1.5 hours",
        description: "Deep cleaning for your kitchen including cabinets and appliances"
      },
      {
        id: 5,
        name: "Bathroom Cleaning",
        price: 599,
        duration: "1 hour",
        description: "Thorough cleaning and sanitizing of bathroom and toilet"
      },
    ]
  },
  {
    id: 2,
    name: "Plumbing",
    description: "Expert plumbers for all your plumbing needs",
    icon: "wrench",
    image: "https://images.unsplash.com/photo-1606093306062-d9c6539b947f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: true,
    options: [
      {
        id: 6,
        name: "Tap Repair/Replacement",
        price: 299,
        duration: "30 minutes",
        description: "Fixing leaky taps or complete replacement"
      },
      {
        id: 7,
        name: "Toilet Repair",
        price: 599,
        duration: "1 hour",
        description: "Fixing toilet issues including flush and leaks"
      },
      {
        id: 8,
        name: "Pipe Leak Repair",
        price: 799,
        duration: "1.5 hours",
        description: "Fixing leaking or burst pipes"
      },
    ]
  },
  {
    id: 3,
    name: "Electrician",
    description: "Certified electricians for all electrical work",
    icon: "zap",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: false,
    options: [
      {
        id: 9,
        name: "Fan Installation/Repair",
        price: 349,
        duration: "45 minutes",
        description: "Fan installation, repair or replacement services"
      },
      {
        id: 10,
        name: "Switch/Socket Repair",
        price: 199,
        duration: "30 minutes",
        description: "Fixing or replacing faulty switches and sockets"
      },
      {
        id: 11,
        name: "Light Installation",
        price: 399,
        duration: "1 hour",
        description: "Installation of new light fixtures"
      },
    ]
  },
  {
    id: 4,
    name: "Carpenter",
    description: "Skilled carpenters for furniture and woodwork",
    icon: "hammer",
    image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: false,
    options: [
      {
        id: 12,
        name: "Furniture Repair",
        price: 599,
        duration: "1.5 hours",
        description: "Repair of chairs, tables and other wooden furniture"
      },
      {
        id: 13,
        name: "Door Repair",
        price: 699,
        duration: "2 hours",
        description: "Fixing door alignment, hinges or locks"
      },
      {
        id: 14,
        name: "Furniture Assembly",
        price: 999,
        duration: "3 hours",
        description: "Assembly of flat-pack furniture"
      },
    ]
  },
  {
    id: 5,
    name: "Pest Control",
    description: "Professional pest control services",
    icon: "bug",
    image: "https://images.unsplash.com/photo-1632935190508-c3626af7c45b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: true,
    options: [
      {
        id: 15,
        name: "General Pest Control",
        price: 1499,
        duration: "2 hours",
        description: "Treatment for cockroaches, ants and silverfish"
      },
      {
        id: 16,
        name: "Bed Bug Treatment",
        price: 2999,
        duration: "3 hours",
        description: "Specialized treatment for bed bugs"
      },
      {
        id: 17,
        name: "Termite Control",
        price: 4999,
        duration: "4 hours",
        description: "Comprehensive termite treatment for your home"
      },
    ]
  },
  {
    id: 6,
    name: "Home Decoration",
    description: "Interior decorators for your dream home",
    icon: "paintbrush",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: false,
    options: [
      {
        id: 18,
        name: "Decoration Consultation",
        price: 999,
        duration: "2 hours",
        description: "Professional advice on interior decoration"
      },
      {
        id: 19,
        name: "Wall Painting Design",
        price: 7999,
        duration: "3 days",
        description: "Custom wall painting with design elements"
      },
      {
        id: 20,
        name: "Full Home Makeover",
        price: 49999,
        duration: "10 days",
        description: "Complete home decoration services"
      },
    ]
  },
  {
    id: 7,
    name: "Hire Cook",
    description: "Professional cooks for your daily or special needs",
    icon: "utensils",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: false,
    options: [
      {
        id: 21,
        name: "Lunch Preparation",
        price: 899,
        duration: "2 hours",
        description: "Preparation of lunch for family"
      },
      {
        id: 22,
        name: "Dinner Preparation",
        price: 899,
        duration: "2 hours",
        description: "Preparation of dinner for family"
      },
      {
        id: 23,
        name: "Party Food Preparation",
        price: 3999,
        duration: "6 hours",
        description: "Food preparation for parties and events"
      },
    ]
  },
  {
    id: 8,
    name: "Women's Salon & Spa",
    description: "Beauty treatments and spa services for women",
    icon: "scissors",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: true,
    options: [
      {
        id: 24,
        name: "Haircut & Styling",
        price: 999,
        duration: "1 hour",
        description: "Professional haircut and styling"
      },
      {
        id: 25,
        name: "Facial",
        price: 1499,
        duration: "1.5 hours",
        description: "Rejuvenating facial treatments"
      },
      {
        id: 26,
        name: "Full Body Waxing",
        price: 1999,
        duration: "2 hours",
        description: "Complete body waxing services"
      },
      {
        id: 27,
        name: "Massage Therapy",
        price: 1799,
        duration: "1 hour",
        description: "Relaxing massage therapy"
      },
    ]
  },
  {
    id: 9,
    name: "Men's Salon & Massage",
    description: "Grooming and massage services for men",
    icon: "scissors",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: false,
    options: [
      {
        id: 28,
        name: "Haircut & Styling",
        price: 499,
        duration: "30 minutes",
        description: "Professional haircut and styling for men"
      },
      {
        id: 29,
        name: "Shaving & Beard Trim",
        price: 399,
        duration: "30 minutes",
        description: "Professional shaving and beard grooming"
      },
      {
        id: 30,
        name: "Facial",
        price: 1299,
        duration: "1 hour",
        description: "Facial treatments for men"
      },
      {
        id: 31,
        name: "Massage Therapy",
        price: 1599,
        duration: "1 hour",
        description: "Relaxing massage therapy"
      },
    ]
  },
  {
    id: 10,
    name: "Medicine Supply",
    description: "Quick medicine delivery to your doorstep",
    icon: "pill",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    popular: true,
    options: [
      {
        id: 32,
        name: "Prescription Delivery",
        price: 99,
        duration: "2 hours",
        description: "Delivery of medicines as per prescription"
      },
      {
        id: 33,
        name: "OTC Medicine Delivery",
        price: 49,
        duration: "2 hours",
        description: "Delivery of over-the-counter medicines"
      },
      {
        id: 34,
        name: "Monthly Medicine Subscription",
        price: 199,
        duration: "Monthly",
        description: "Regular delivery of your prescription medicines"
      },
    ]
  },
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4.8,
    reviews: 245,
    experience: 8,
    serviceIds: [1, 2],
    isFeatured: true,
    trustScore: 98,
    busy: false,
    address: "123 Main St, Anytown, USA",
    phone: "555-1234"
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.9,
    reviews: 189,
    experience: 6,
    serviceIds: [3],
    isFeatured: true,
    trustScore: 99,
    busy: false,
    address: "456 Elm St, Anytown, USA",
    phone: "555-5678"
  },
  {
    id: 3,
    name: "Mohammed Ali",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4.7,
    reviews: 178,
    experience: 5,
    serviceIds: [4, 5],
    isFeatured: true,
    trustScore: 97,
    busy: true,
    address: "789 Oak St, Anytown, USA",
    phone: "555-9012"
  },
  {
    id: 4,
    name: "Anita Desai",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4.9,
    reviews: 290,
    experience: 9,
    serviceIds: [6],
    isFeatured: true,
    trustScore: 99,
    busy: false,
    address: "101 Pine St, Anytown, USA",
    phone: "555-3456"
  },
  {
    id: 5,
    name: "Rahul Patel",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 4.6,
    reviews: 156,
    experience: 4,
    serviceIds: [7],
    isFeatured: false,
    trustScore: 96,
    busy: false,
    address: "202 Maple St, Anytown, USA",
    phone: "555-7890"
  },
  {
    id: 6,
    name: "Neha Gupta",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 4.8,
    reviews: 207,
    experience: 7,
    serviceIds: [8],
    isFeatured: true,
    trustScore: 98,
    busy: false,
    address: "303 Cedar St, Anytown, USA",
    phone: "555-1357"
  },
  {
    id: 7,
    name: "Vikram Singh",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    rating: 4.7,
    reviews: 163,
    experience: 6,
    serviceIds: [9],
    isFeatured: false,
    trustScore: 97,
    busy: true,
    address: "404 Birch St, Anytown, USA",
    phone: "555-2468"
  },
  {
    id: 8,
    name: "Sunita Rao",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 4.8,
    reviews: 174,
    experience: 5,
    serviceIds: [10],
    isFeatured: false,
    trustScore: 98,
    busy: false,
    address: "505 Willow St, Anytown, USA",
    phone: "555-5555"
  }
];

export const testimonials = [
  {
    id: "t1",
    name: "Rohit Mehta",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    comment: "The home cleaning service was excellent! The team was professional, thorough, and left my home spotless. Highly recommended!",
    rating: 5,
    service: "Home Cleaning"
  },
  {
    id: "t2",
    name: "Sneha Joshi",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    comment: "I booked a plumber for a leaking pipe, and he arrived on time and fixed the issue quickly. Great service and fair pricing.",
    rating: 4,
    service: "Plumbing"
  },
  {
    id: "t3",
    name: "Arjun Kapoor",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    comment: "The electrician was knowledgeable and solved my complex wiring issue efficiently. Will definitely use HomeEZ again!",
    rating: 5,
    service: "Electrician"
  }
];

export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

export const availableTimeSlots: TimeSlot[] = [
  { id: "ts1", time: "08:00 - 09:00", available: true },
  { id: "ts2", time: "09:00 - 10:00", available: true },
  { id: "ts3", time: "10:00 - 11:00", available: false },
  { id: "ts4", time: "11:00 - 12:00", available: true },
  { id: "ts5", time: "12:00 - 13:00", available: true },
  { id: "ts6", time: "13:00 - 14:00", available: false },
  { id: "ts7", time: "14:00 - 15:00", available: true },
  { id: "ts8", time: "15:00 - 16:00", available: true },
  { id: "ts9", time: "16:00 - 17:00", available: true },
  { id: "ts10", time: "17:00 - 18:00", available: false },
  { id: "ts11", time: "18:00 - 19:00", available: true },
  { id: "ts12", time: "19:00 - 20:00", available: true },
];
