import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useBooking } from '../context/BookingContext';

export default function Favorites() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useBooking();

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Events you favorite will appear here</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} event(s) saved</Text>
      </View>

      {favorites.map((event) => (
        <TouchableOpacity 
          key={event.id} 
          style={styles.favoriteCard}
          onPress={() => router.push(`/BookEvent?id=${event.id}`)}
        >
          <Image source={{ uri: event.image }} style={styles.favoriteImage} />
          <View style={styles.favoriteContent}>
            <Text style={styles.favoriteCategory}>{event.category}</Text>
            <Text style={styles.favoriteTitle}>{event.title}</Text>
            
            <View style={styles.favoriteDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.detailText}>{event.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.detailText}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.favoriteFooter}>
              <Text style={styles.favoritePrice}>${event.price} per ticket</Text>
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(event)}
              >
                <Ionicons name="heart" size={20} color="#d32f2f" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  favoriteCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteImage: {
    width: '100%',
    height: 180,
  },
  favoriteContent: {
    padding: 16,
  },
  favoriteCategory: {
    color: '#0066CC',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  favoriteDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  favoriteButton: {
    padding: 8,
  },
});