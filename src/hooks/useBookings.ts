
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Booking } from "@/types/database.types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useBookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createBooking = async (
    serviceId: string,
    serviceOptionId: string,
    bookingDate: string,
    bookingTime: string,
    address: string,
    price: number
  ): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to create a booking");
      return false;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        service_id: serviceId,
        service_option_id: serviceOptionId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        status: "pending",
        address,
        price,
        created_at: new Date().toISOString(),
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      toast.success("Booking created successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserBookings = async (): Promise<Booking[]> => {
    if (!user) {
      toast.error("You must be logged in to fetch bookings");
      return [];
    }

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("booking_date", { ascending: false });

      if (error) {
        toast.error(error.message);
        return [];
      }

      return data as Booking[];
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings");
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    if (!user) {
      toast.error("You must be logged in to cancel a booking");
      return false;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled", updated_at: new Date().toISOString() })
        .eq("id", bookingId)
        .eq("user_id", user.id);

      if (error) {
        toast.error(error.message);
        return false;
      }

      toast.success("Booking cancelled successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createBooking,
    getUserBookings,
    cancelBooking,
  };
};
