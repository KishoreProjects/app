import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Pill, Video, Calendar, CircleUser as UserCircle, MessageSquare, Clock, LucideIcon } from 'lucide-react-native';

// Define valid routes for TypeScript
type CaretakerRoutes =
  | "/(caretaker)/dashboard/medicine"
  | "/(caretaker)/dashboard/videos"
  | "/(caretaker)/dashboard/appointments"
  | "/(caretaker)/dashboard/profile/profile"
  | "/(caretaker)/dashboard/questions/daily"
  | "/(caretaker)/dashboard/questions/weekly";

// Define props for DashboardCard
interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  onPress: () => void;
}

// DashboardCard Component
const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, description, image, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <Icon size={32} color="#4299e1" />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
    {image && <Image source={{ uri: image }} style={styles.cardImage} />}
  </TouchableOpacity>
);

export default function CaretakerDashboard() {
  const router = useRouter();

  // Dashboard Items Array (Predefined Routes)
  const dashboardItems: { icon: LucideIcon; title: string; description: string; route: CaretakerRoutes }[] = [
    { icon: Pill, title: "Medicine Monitoring", description: "Track your daily medication schedule", route: "/(caretaker)/dashboard/medicine" },
    { icon: Video, title: "Suggested Videos", description: "Watch recommended health videos", route: "/(caretaker)/dashboard/videos" },
    { icon: Calendar, title: "Book Appointment", description: "Schedule a consultation with your doctor", route: "/(caretaker)/dashboard/appointments" },
    { icon: UserCircle, title: "My Profile", description: "View and update your profile", route: "/(caretaker)/dashboard/profile/profile" },
    { icon: MessageSquare, title: "Daily Questions", description: "Complete your daily health check", route: "/(caretaker)/dashboard/questions/daily" },
    { icon: Clock, title: "Weekly Assessment", description: "Take your weekly health assessment", route: "/(caretaker)/dashboard/questions/weekly" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.name}>John Smith</Text>
      </View>

      {/* Grid Layout for Dashboard Cards */}
      <View style={styles.gridContainer}>
        {dashboardItems.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <DashboardCard 
              icon={item.icon} 
              title={item.title} 
              description={item.description} 
              onPress={() => router.push(item.route as CaretakerRoutes)} 
            />
          </View>
        ))}
      </View>

      {/* Health Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Health Tips</Text>
        <Text style={styles.tip}>✔️ Stay hydrated – drink at least 8 glasses of water daily.</Text>
        <Text style={styles.tip}>✔️ Ensure proper sleep – aim for 7-8 hours of rest each night.</Text>
        <Text style={styles.tip}>✔️ Maintain a balanced diet – eat fruits, vegetables, and whole grains.</Text>
        <Text style={styles.tip}>✔️ Encourage physical activity – daily exercise boosts mental and physical health.</Text>
        <Text style={styles.tip}>✔️ Keep up with medical check-ups – regular visits help detect issues early.</Text>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  tipsContainer: {
    backgroundColor: '#e6f7ff',
    padding: 36,
    borderRadius: 12,
    margin: 16,
  },
  tipsHeader: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  tip: {
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    color: '#2d3748',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginTop: 16,
  },
});
