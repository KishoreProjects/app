import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Phone, MapPin, ArrowLeft } from 'lucide-react-native';
import { usePatients } from '../../../../context/PatientContext';

export default function PatientDetails() {
  const { id } = useLocalSearchParams();  // Get patient ID from params
  const { patients } = usePatients();     // Get patients from context
  const router = useRouter();

  // Convert id to a string and find the patient
  const patient = patients.find((p) => p.id === String(id));

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Patient not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2d3748" />
        </TouchableOpacity>
        <Text style={styles.title}>Patient Details</Text>
      </View>

      {/* Patient Details */}
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text style={styles.patientId}>ID: {patient.id}</Text>

          {/* Phone Number */}
          <View style={styles.infoRow}>
            <Phone size={16} color="#718096" />
            <Text style={styles.detailText}>{patient.phone}</Text>
          </View>

          {/* Address */}
          <View style={styles.infoRow}>
            <MapPin size={16} color="#718096" />
            <Text style={styles.detailText}>{patient.address}</Text>
          </View>

          {/* Age */}
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Age:</Text>
            <Text style={styles.detailValue}>{patient.age} yrs</Text>
          </View>

          {/* Disease */}
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Disease:</Text>
            <Text style={styles.detailValue}>{patient.disease}</Text>
          </View>

          {/* Last Visit */}
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Last Visit:</Text>
            <Text style={styles.detailValue}>{patient.lastVisit}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ✅ Styles are properly defined below
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  patientName: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  patientId: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#4a5568',
  },
  detailSection: {
    marginTop: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#2d3748',
  },
  notFound: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#e53e3e',
    textAlign: 'center',
    marginTop: 50,
  },
});

