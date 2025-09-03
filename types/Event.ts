export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  ticketsAvailable: number;
  totalTickets: number;
  price: number;
  category: string;
  image: any; // This will accept the require() result
}