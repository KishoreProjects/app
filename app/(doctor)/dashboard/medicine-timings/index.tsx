import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

// Define TypeScript type for form data
type MedicineTiming = {
  medicine_name: string;
  dosage: string;
  timing: string;
  instructions: string;
};

export default function AddMedicineTiming() {
  const router = useRouter();

  // State for form data
  const [formData, setFormData] = useState<MedicineTiming>({
    medicine_name: '',
    dosage: '',
    timing: '',
    instructions: '',
  });

  // Function to handle input change
  const handleChange = (key: keyof MedicineTiming, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Function to submit form data
  const handleSubmit = async () => {
    // Validate inputs before sending
    if (!formData.medicine_name || !formData.dosage || !formData.timing || !formData.instructions) {
      Alert.alert('❌ Error', 'All fields are required.');
      return;
    }

    try {
      const payload = {
        medicine_name: formData.medicine_name.trim(),
        dosage: formData.dosage.trim(),
        timing: formData.timing.trim(),
        instructions: formData.instructions.trim(),
      };

      console.log("📤 Sending Data:", JSON.stringify(payload)); // Debugging log

      const response = await fetch('http://192.168.29.221/Mitra/app/medmon.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if response is JSON before parsing
      const text = await response.text();
      console.log("📥 Raw Response:", text); // Debugging log

      let result;
      try {
        result = JSON.parse(text); // Attempt to parse JSON
      } catch {
        throw new Error("Invalid JSON response received from server.");
      }

      console.log("📥 Parsed Response:", result); // Debugging log

      if (response.ok && result.status === "success") {
        Alert.alert('✅ Success', result.message);
        router.back(); // Navigate back after successful submission
      } else {
        Alert.alert('❌ Error', result.message || 'Failed to add medicine timing.');
      }
    } catch (error) {
      console.error('⚠️ Error:', error);
      Alert.alert('❌ Error', 'Failed to add medicine timing. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🩺 Add Medicine Timing</Text>
      </View>

      <View style={styles.form}>
        {[
          { label: "Medicine Name", key: "medicine_name", placeholder: "Enter medicine name" },
          { label: "Dosage", key: "dosage", placeholder: "Enter dosage (e.g., 500mg)" },
          { label: "Timing", key: "timing", placeholder: "Enter timing (e.g., Morning, Night)" },
          { label: "Instructions", key: "instructions", placeholder: "Enter special instructions", multiline: true }
        ].map(({ label, key, placeholder, multiline }) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={[styles.input, multiline && styles.textArea]}
              value={formData[key as keyof MedicineTiming]} // ✅ Using correct key names
              onChangeText={(text) => handleChange(key as keyof MedicineTiming, text)}
              placeholder={placeholder}
              multiline={multiline}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>➕ Add Medicine Timing</Text>
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
    backgroundColor: '#4a90e2',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#4a90e2',
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
