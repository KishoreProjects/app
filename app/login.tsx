import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Stethoscope, Heart, LogIn } from 'lucide-react-native';

export default function Login() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'caretaker' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form fields when switching roles
  useEffect(() => {
    setUsername('');
    setPassword('');
    setError('');
  }, [selectedRole]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);

    let loginURL = '';

    if (selectedRole === 'doctor') {
      loginURL = "http://192.168.29.221/Mitra/app/doc_login.php"; // Doctor login API
    } else if (selectedRole === 'caretaker') {
      loginURL = "http://192.168.29.221/Mitra/app/ct_login.php"; // Caretaker login API
    } else {
      setError("Please select a role");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (selectedRole === 'doctor') {
          router.push('/(doctor)'); // Navigate to doctor dashboard
        } else {
          router.push('/(caretaker)'); // Navigate to caretaker dashboard
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please select your role and login</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, selectedRole === 'doctor' && styles.roleButtonSelected]}
            onPress={() => setSelectedRole('doctor')}
          >
            <Stethoscope size={32} color={selectedRole === 'doctor' ? '#fff' : '#2b6cb0'} />
            <Text style={[styles.roleText, selectedRole === 'doctor' && styles.roleTextSelected]}>Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleButton, selectedRole === 'caretaker' && styles.roleButtonSelected]}
            onPress={() => setSelectedRole('caretaker')}
          >
            <Heart size={32} color={selectedRole === 'caretaker' ? '#fff' : '#2b6cb0'} />
            <Text style={[styles.roleText, selectedRole === 'caretaker' && styles.roleTextSelected]}>Caretaker</Text>
          </TouchableOpacity>
        </View>

        {selectedRole && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <LogIn size={24} color="#fff" />
              <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#4a5568',
    marginBottom: 32,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  roleButton: {
    backgroundColor: '#ebf8ff',
    padding: 20,
    borderRadius: 16,
    width: 150,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  roleButtonSelected: {
    backgroundColor: '#4299e1',
  },
  roleText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#2b6cb0',
    marginTop: 12,
  },
  roleTextSelected: {
    color: '#fff',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  input: {
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4299e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
});
