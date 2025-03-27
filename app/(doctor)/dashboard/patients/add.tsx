import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function AddPatient() {
  const router = useRouter();

  // Define state with TypeScript type annotation
  const [formData, setFormData] = useState<{ 
    patient_id: string; 
    name: string; 
    age: string; 
    gender: string; 
    phone: string; 
    address: string; 
    disease: string; 
  }>({
    patient_id: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    disease: '',
  });

  // Function to handle input change
  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Function to submit form data
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.29.221/Mitra/app/patients_recently_added.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', result.message);
        router.back(); // Navigate back after successful submission
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to add patient. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Patient</Text>
      </View>

      <View style={styles.form}>
        {[
          { label: "Patient ID", key: "patient_id", placeholder: "Enter patient ID" },
          { label: "Patient Name", key: "name", placeholder: "Enter patient name" },
          { label: "Age", key: "age", placeholder: "Enter age", keyboardType: "numeric" },
          { label: "Gender", key: "gender", placeholder: "Enter gender" },
          { label: "Phone Number", key: "phone", placeholder: "Enter phone number", keyboardType: "phone-pad" },
          { label: "Address", key: "address", placeholder: "Enter address", multiline: true },
          { label: "Disease/Condition", key: "disease", placeholder: "Enter disease or condition", multiline: true },
        ].map(({ label, key, placeholder, keyboardType, multiline }) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={[styles.input, multiline && styles.textArea]}
              value={formData[key as keyof typeof formData]}
              onChangeText={(text) => handleChange(key as keyof typeof formData, text)}
              placeholder={placeholder}
              keyboardType={keyboardType as any} // Fix TypeScript error
              multiline={multiline}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Patient</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4299e1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

