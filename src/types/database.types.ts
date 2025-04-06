
export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
};

export type Booking = {
  id: string;
  user_id: string;
  service_id: string;
  service_option_id: string;
  service_provider_id?: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  address: string;
  price: number;
  created_at: string;
  updated_at?: string;
};

export type Review = {
  id: string;
  booking_id: string;
  user_id: string;
  service_provider_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at?: string;
};
