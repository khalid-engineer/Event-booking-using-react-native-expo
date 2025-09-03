import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useBooking } from '../context/BookingContext';
import { events } from '../data/events';

export default function BookEvent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { bookEvent } = useBooking();
  const [ticketCount, setTicketCount] = useState(1);

  const event = events.find(e => e.id === parseInt(id as string));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const handleBook = () => {
    bookEvent(event, ticketCount);
    Alert.alert('Success', 'Event booked successfully!');
    router.back();
  };

  const totalPrice = event.price * ticketCount;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.content}>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="ticket-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{event.ticketsAvailable} tickets available</Text>
          </View>
        </View>

        <View style={styles.ticketSection}>
          <Text style={styles.sectionTitle}>Select Tickets</Text>
          <View style={styles.ticketCounter}>
            <TouchableOpacity 
              style={styles.counterButton}
              onPress={() => setTicketCount(Math.max(1, ticketCount - 1))}
              disabled={ticketCount <= 1}
            >
              <Ionicons name="remove" size={20} color="#0066CC" />
            </TouchableOpacity>
            <Text style={styles.ticketCount}>{ticketCount}</Text>
            <TouchableOpacity 
              style={styles.counterButton}
              onPress={() => setTicketCount(Math.min(event.ticketsAvailable, ticketCount + 1))}
              disabled={ticketCount >= event.ticketsAvailable}
            >
              <Ionicons name="add" size={20} color="#0066CC" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total Price:</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  category: {
    color: '#0066CC',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  details: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  ticketSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  ticketCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  counterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e6f2ff',
  },
  ticketCount: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    color: '#333',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  priceLabel: {
    fontSize: 18,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  bookButton: {
    backgroundColor: '#0066CC',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});