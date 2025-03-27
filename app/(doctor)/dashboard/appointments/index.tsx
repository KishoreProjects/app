import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { useAppointments } from '../../../../context/AppointmentContext';

export default function AppointmentsScreen() {
  const { appointments, updateAppointmentStatus } = useAppointments();

  const handleAppointment = (id: number, status: 'approved' | 'rejected') => {
    updateAppointmentStatus(id, status);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
      </View>

      <ScrollView style={styles.content}>
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.patientId}>ID: {appointment.patientId}</Text>
              <Text style={[
                styles.status,
                appointment.status === 'approved' && styles.statusApproved,
                appointment.status === 'rejected' && styles.statusRejected,
              ]}>
                {appointment.status.toUpperCase()}
              </Text>
            </View>
            
            <Text style={styles.patientName}>{appointment.name}</Text>
            <Text style={styles.appointmentDetails}>{appointment.phone}</Text>
            <Text style={styles.appointmentDetails}>
              {appointment.date} at {appointment.time}
            </Text>
            <Text style={styles.appointmentDetails}>{appointment.address}</Text>

            {appointment.status === 'pending' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => handleAppointment(appointment.id, 'approved')}
                >
                  <Check size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Approve</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => handleAppointment(appointment.id, 'rejected')}
                >
                  <X size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
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
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientId: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#4299e1',
  },
  status: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusApproved: {
    color: '#48bb78',
    backgroundColor: '#f0fff4',
  },
  statusRejected: {
    color: '#e53e3e',
    backgroundColor: '#fff5f5',
  },
  patientName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 8,
  },
  appointmentDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#48bb78',
  },
  rejectButton: {
    backgroundColor: '#e53e3e',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});