import React, { useCallback } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList 
} from 'react-native';
import { 
  UserPlus, Video, Calendar, MessageSquare, Users, Pill, CircleUser as UserCircle, ClipboardList 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

/** Define allowed navigation routes */
type DoctorRoutes =
  | "/(doctor)/dashboard/patients/add"
  | "/(doctor)/dashboard/patients"
  | "/(doctor)/dashboard/appointments"
  | "/(doctor)/dashboard/videos"
  | "/dashboard/medicine-timings"
  | "/(doctor)/dashboard/answers"
  | "/(doctor)/dashboard/profile/profile"
  | "/(doctor)/dashboard/reports";

/** Dashboard Options */
const dashboardItems = [
  { icon: UserPlus, title: "Add Patient", route: "/(doctor)/dashboard/patients/add" },
  { icon: Users, title: "Patient List", route: "/(doctor)/dashboard/patients" },
  { icon: Calendar, title: "Appointments", route: "/(doctor)/dashboard/appointments" },
  { icon: Video, title: "Upload Videos", route: "/(doctor)/dashboard/videos" },
  { icon: Pill, title: "Medicine Schedule", route: "/dashboard/medicine-timings" },
  { icon: MessageSquare, title: "Patient Responses", route: "/(doctor)/dashboard/answers" },
  { icon: UserCircle, title: "My Profile", route: "/(doctor)/dashboard/profile/profile" },
  { icon: ClipboardList, title: "Reports", route: "/(doctor)/dashboard/reports" }
];

/** Dummy Recent Patients Data */
const recentPatients = [
  { id: "7", name: "Sam", gender: "Male", phone: "9640303662", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "8", name: "Jimmy", gender: "Male", phone: "9876543210", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "9", name: "Hunner", gender: "Male", phone: "9234567890", image: "https://randomuser.me/api/portraits/men/3.jpg" }
];

/** Dashboard Card Component */
const DashboardCard = ({ icon: Icon, title, onPress }: {
  icon: React.ElementType,
  title: string,
  onPress: () => void
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <Icon size={32} color="#4299e1" />
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

/** Stats Card Component */
const StatsCard = ({ value, title }: {
  value: string,
  title: string
}) => (
  <View style={styles.statsCard}>
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsTitle}>{title}</Text>
  </View>
);

/** Recent Patient Card */
const PatientCard = ({ id, name, gender, phone, image }: { id: string, name: string, gender: string, phone: string, image: string }) => (
  <View style={styles.patientCard}>
    <Image source={{ uri: image }} style={styles.patientImage} />
    <View style={styles.patientInfo}>
      <Text style={styles.patientText}><Text style={styles.bold}>ID:</Text> {id}</Text>
      <Text style={styles.patientText}><Text style={styles.bold}>Name:</Text> {name}</Text>
      <Text style={styles.patientText}><Text style={styles.bold}>Gender:</Text> {gender}</Text>
      <Text style={styles.patientText}><Text style={styles.bold}>Phone:</Text> {phone}</Text>
    </View>
  </View>
);

/** Main Dashboard Component */
export default function DoctorDashboard() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  /** Navigation function */
  const navigateTo = useCallback((path: DoctorRoutes) => () => router.push(path), [router]);

  /** Handle loading state */
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#4299e1" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, Dr.Kishore</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatsCard title="Total Patients" value="248" />
        <StatsCard title="Appointments" value="28" />
        <StatsCard title="Pending Reports" value="15" />
      </View>

      {/* Dashboard Cards */}
      <FlatList
        data={dashboardItems}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <DashboardCard 
            icon={item.icon} 
            title={item.title} 
            onPress={navigateTo(item.route as DoctorRoutes)} 
          />
        )}
        contentContainerStyle={styles.content}
      />

      {/* Recent Patients Section */}
      <View style={styles.recentPatientsContainer}>
        <Text style={styles.recentPatientsTitle}>Recent Patients</Text>
        <FlatList
          data={recentPatients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PatientCard {...item} />}
        />
      </View>
    </ScrollView>
  );
}

/** Styles */
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
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7fafc",
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
    margin: 4,
  },
  statsValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
  },
  statsTitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginTop: 8,
    textAlign: 'center',
  },
  recentPatientsContainer: {
    padding: 16,
  },
  recentPatientsTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  patientCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  patientInfo: {
    marginLeft: 10,
  },
  patientText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#2d3748',
  },
  bold: {
    fontFamily: 'Inter_600SemiBold',
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
