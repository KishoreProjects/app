import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Define the Patient type (added address)
interface Patient {
  patient_id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;  // ✅ Added address field
  disease: string;
}

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://192.168.29.221/Mitra/app/viewpatient.php');
      const data = await response.json();

      console.log("Fetched Data:", data);

      if (data.status === 'success') {
        setPatients(data.patients);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Could not fetch patients');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Added Patients</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.patient_id.toString()}
        renderItem={({ item }: { item: Patient }) => (
          <View style={styles.patientCard}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Address: {item.address}</Text>  {/* ✅ Display Address */}
            <Text>Condition: {item.disease}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.refreshButton} onPress={fetchPatients}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7fafc' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  patientCard: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, elevation: 3 },
  patientName: { fontSize: 18, fontWeight: 'bold' },
  refreshButton: { backgroundColor: '#4299e1', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  refreshText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
