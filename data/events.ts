import { Event } from '../types/Events';

// Import all images statically
const summerImage = require('../assets/images/summer.jpg');
const basketballImage = require('../assets/images/basketball.jpg');
const teachImage = require('../assets/images/teach.jpg');
const foodImage = require('../assets/images/food.jpg');
const artImage = require('../assets/images/exhibiting-large-scale.jpg');
const businessImage = require('../assets/images/business.jpg');

export const events: Event[] = [
  {
    id: 1,
    title: 'Summer Music Festival 2025',
    description: 'Join us for the biggest music festival of the year featuring top artists from around the world.',
    date: 'August 15, 2025 at 6:00 PM',
    location: 'Central Park, New York',
    ticketsAvailable: 245,
    totalTickets: 500,
    price: 85,
    category: 'Music',
    image: summerImage
  },
  {
    id: 2,
    title: 'Basketball Championship Finals',
    description: 'Watch the top teams compete for the championship title in an exciting match.',
    date: 'September 5, 2025 at 7:30 PM',
    location: 'Madison Square Garden, New York',
    ticketsAvailable: 78,
    totalTickets: 200,
    price: 120,
    category: 'Sports',
    image: basketballImage
  },
  {
    id: 3,
    title: 'Tech Conference 2025',
    description: 'Learn about the latest innovations in technology from industry leaders.',
    date: 'October 12, 2025 at 9:00 AM',
    location: 'Convention Center, San Francisco',
    ticketsAvailable: 150,
    totalTickets: 300,
    price: 199,
    category: 'Technology',
    image: teachImage
  },
  {
    id: 4,
    title: 'Food & Wine Festival',
    description: 'Taste delicious food and wine from around the world at this annual festival.',
    date: 'July 20, 2025 at 5:00 PM',
    location: 'Grant Park, Chicago',
    ticketsAvailable: 320,
    totalTickets: 500,
    price: 65,
    category: 'Food',
    image: foodImage
  },
  {
    id: 5,
    title: 'Art Exhibition: Modern Masters',
    description: 'Explore works from contemporary artists pushing the boundaries of modern art.',
    date: 'November 8, 2025 at 10:00 AM',
    location: 'Metropolitan Museum of Art, New York',
    ticketsAvailable: 89,
    totalTickets: 150,
    price: 45,
    category: 'Art',
    image: artImage
  },
  {
    id: 6,
    title: 'Business Leadership Summit',
    description: 'Connect with industry leaders and learn strategies for business growth and innovation.',
    date: 'December 3, 2025 at 8:30 AM',
    location: 'Convention Center, Las Vegas',
    ticketsAvailable: 195,
    totalTickets: 300,
    price: 299,
    category: 'Business',
    image: businessImage
  }
];