import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types/Events';

interface Booking {
  id: string;
  event: Event;
  ticketCount: number;
  totalPrice: number;
  bookingDate: string;
}

interface BookingContextType {
  bookings: Booking[];
  favorites: Event[];
  bookEvent: (event: Event, ticketCount: number) => void;
  cancelBooking: (bookingId: string) => void;
  toggleFavorite: (event: Event) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Event[]>([]);

  const bookEvent = (event: Event, ticketCount: number) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      event: event,
      ticketCount: ticketCount,
      totalPrice: event.price * ticketCount,
      bookingDate: new Date().toISOString()
    };

    setBookings(prev => [...prev, newBooking]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
  };

  const toggleFavorite = (event: Event) => {
    setFavorites(prev => {
      const isFavorite = prev.find(e => e.id === event.id);
      if (isFavorite) {
        return prev.filter(e => e.id !== event.id);
      } else {
        return [...prev, event];
      }
    });
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      favorites, 
      bookEvent, 
      cancelBooking, 
      toggleFavorite 
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}