import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, Clock, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { useAppointments } from '../../../../context/AppointmentContext';

export default function AppointmentsScreen() {
  const { appointments, addAppointment } = useAppointments();
  const myAppointments = appointments;

  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    address: '',
  });

  const handleBookAppointment = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.name) {
      addAppointment({
        id: Date.now(),
        patientId: `P${Math.floor(Math.random() * 1000)}`,
        status: 'pending',
        ...newAppointment,
      });
      setNewAppointment({
        date: '',
        time: '',
        name: '',
        phone: '',
        address: '',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Appointment</Text>
      </View>

      <View style={styles.bookingSection}>
        <Text style={styles.sectionTitle}>New Appointment</Text>
        <View style={styles.form}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateInput}>
              <Calendar size={20} color="#4299e1" />
              <TextInput
                style={styles.input}
                placeholder="Date (YYYY-MM-DD)"
                value={newAppointment.date}
                onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
              />
            </View>
            <View style={styles.timeInput}>
              <Clock size={20} color="#4299e1" />
              <TextInput
                style={styles.input}
                placeholder="Time"
                value={newAppointment.time}
                onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
              />
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={newAppointment.name}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={newAppointment.phone}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Address"
            value={newAppointment.address}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, address: text })}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
            <Plus size={24} color="#fff" />
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.appointmentsSection}>
        <Text style={styles.sectionTitle}>Your Appointments</Text>
        {myAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.dateTimeBox}>
                <Calendar size={20} color="#4299e1" />
                <Text style={styles.dateTimeText}>{appointment.date}</Text>
              </View>
              <View style={styles.dateTimeBox}>
                <Clock size={20} color="#4299e1" />
                <Text style={styles.dateTimeText}>{appointment.time}</Text>
              </View>
            </View>
            <Text style={styles.appointmentName}>{appointment.name}</Text>
            <Text style={styles.appointmentDetails}>{appointment.phone}</Text>
            <Text style={styles.appointmentDetails}>{appointment.address}</Text>
            <View style={[
              styles.statusBadge,
              appointment.status === 'approved' && styles.statusApproved,
              appointment.status === 'rejected' && styles.statusRejected,
            ]}>
              <Text style={[
                styles.statusText,
                appointment.status === 'approved' && styles.statusTextApproved,
                appointment.status === 'rejected' && styles.statusTextRejected,
              ]}>
                {appointment.status.toUpperCase()}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
  bookingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 16,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeInput: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#4299e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  appointmentsSection: {
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
    gap: 12,
    marginBottom: 16,
  },
  dateTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf8ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  dateTimeText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#4299e1',
  },
  appointmentName: {
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
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusApproved: {
    backgroundColor: '#f0fff4',
  },
  statusRejected: {
    backgroundColor: '#fff5f5',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
  },
  statusTextApproved: {
    color: '#48bb78',
  },
  statusTextRejected: {
    color: '#e53e3e',
  },
});