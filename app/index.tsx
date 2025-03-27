import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const LOGO1 = require('../assets/images/LOGO1.png'); // ✅ Use require()

export default function GetStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={LOGO1} style={styles.image} />
      <Text style={styles.title}>Welcome to MindEase</Text>
      <Text style={styles.subtitle}>Your Complete Healthcare Solution</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#4a5568',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4299e1',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
});
