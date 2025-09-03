import { Stack, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

function TabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const tabs = [
    { name: 'Browse', icon: 'search', route: '/' },
    { name: 'Favorites', icon: 'heart', route: '/favorites' },
    { name: 'Bookings', icon: 'calendar', route: '/bookings' },
    { name: 'Profile', icon: 'person', route: '/profile' },
  ];

  if (!isAuthenticated && pathname !== '/signin' && pathname !== '/signup') {
    return <Redirect href="/signin" />;
  }

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => router.push(tab.route as any)}
          >
            <Ionicons
              name={isActive ? (tab.icon as any) : (`${tab.icon}-outline` as any)}
              size={24}
              color={isActive ? '#0066CC' : '#666'}
            />
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <BookingProvider>
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="BookEvent" />
            <Stack.Screen name="bookings" />
            <Stack.Screen name="favorites" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
          </Stack>
          <TabBar />
        </View>
      </BookingProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  tabTextActive: {
    color: '#0066CC',
    fontWeight: '600',
  },
});