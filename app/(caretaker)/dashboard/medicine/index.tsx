import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Clock, Check, X } from 'lucide-react-native';
import { useMedicines } from '../../../../context/MedicineContext';

export default function MedicineMonitoring() {
  const { medicines, updateMedicineStatus } = useMedicines();

  const handleMedicineTaken = (id: number, taken: boolean) => {
    updateMedicineStatus(id, taken);
  };

  const getTimeStatus = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const medicineTime = new Date();
    medicineTime.setHours(hours, minutes);
    const now = new Date();
    
    if (now > medicineTime) {
      return 'overdue';
    }
    return 'upcoming';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medicine Monitoring</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {medicines.filter((m) => m.taken).length}
            </Text>
            <Text style={styles.statLabel}>Taken Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {medicines.filter((m) => !m.taken).length}
            </Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        <View style={styles.medicineList}>
          {medicines.map((medicine) => (
            <View key={medicine.id} style={styles.medicineCard}>
              <View style={styles.medicineInfo}>
                <View style={styles.timeContainer}>
                  <Clock size={20} color="#4299e1" />
                  <Text style={styles.timeText}>{medicine.time}</Text>
                  <View style={[
                    styles.statusBadge,
                    getTimeStatus(medicine.time) === 'overdue' && styles.statusOverdue
                  ]}>
                    <Text style={[
                      styles.statusText,
                      getTimeStatus(medicine.time) === 'overdue' && styles.statusTextOverdue
                    ]}>
                      {getTimeStatus(medicine.time).toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.medicineName}>{medicine.name}</Text>
                <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    medicine.taken ? styles.actionButtonActive : styles.actionButtonInactive,
                  ]}
                  onPress={() => handleMedicineTaken(medicine.id, true)}
                >
                  <Check
                    size={20}
                    color={medicine.taken ? '#fff' : '#48bb78'}
                  />
                  <Text style={[
                    styles.actionButtonText,
                    medicine.taken ? styles.actionButtonTextActive : styles.actionButtonTextInactive,
                  ]}>
                    Taken
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    !medicine.taken ? styles.actionButtonActive : styles.actionButtonInactive,
                  ]}
                  onPress={() => handleMedicineTaken(medicine.id, false)}
                >
                  <X
                    size={20}
                    color={!medicine.taken ? '#fff' : '#e53e3e'}
                  />
                  <Text style={[
                    styles.actionButtonText,
                    !medicine.taken ? styles.actionButtonTextActive : styles.actionButtonTextInactive,
                  ]}>
                    Not Taken
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

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
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#2d3748',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#4299e1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
  medicineList: {
    gap: 16,
  },
  medicineCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  medicineInfo: {
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#4299e1',
  },
  statusBadge: {
    backgroundColor: '#ebf8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOverdue: {
    backgroundColor: '#fff5f5',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#4299e1',
  },
  statusTextOverdue: {
    color: '#e53e3e',
  },
  medicineName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 4,
  },
  medicineDosage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonActive: {
    backgroundColor: '#48bb78',
  },
  actionButtonInactive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  actionButtonTextActive: {
    color: '#fff',
  },
  actionButtonTextInactive: {
    color: '#718096',
  },
});