import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions,
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CategoryFilter from '../components/CategoryFilter';
import EventCard from '../components/EventCard';
import { events } from '../data/events';

export default function BrowseEvents() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState('Grid');

  const filteredEvents = events.filter(event => 
    (selectedCategory === 'All Categories' || event.category === selectedCategory) &&
    (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EventBooker</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'Grid' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('Grid')}
        >
          <Ionicons name="grid" size={20} color={viewMode === 'Grid' ? '#fff' : '#666'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'Calendar' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('Calendar')}
        >
          <Ionicons name="calendar" size={20} color={viewMode === 'Calendar' ? '#fff' : '#666'} />
        </TouchableOpacity>
      </View>

      {/* Events Grid */}
      <ScrollView 
        style={styles.eventsContainer}
        contentContainerStyle={[
          styles.eventsContent,
          width > 768 && { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }
        ]}
      >
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            style={width > 768 ? { width: '48%' } : { width: '100%' }}
            onPress={() => router.push(`/BookEvent?id=${event.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  viewModeButtonActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 60, // Add margin to avoid overlap with tab bar
  },
  eventsContent: {
    paddingBottom: 16,
  },
});