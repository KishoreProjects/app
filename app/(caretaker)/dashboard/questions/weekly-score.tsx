import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Chrome as Home, RotateCcw, Award } from 'lucide-react-native';

export default function WeeklyScoreScreen() {
  const router = useRouter();
  const { score, total } = useLocalSearchParams<{ score: string; total: string }>();
  
  const percentage = Math.round((Number(score) / Number(total)) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return '#48bb78';
    if (percentage >= 60) return '#ecc94b';
    return '#e53e3e';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) {
      return 'Excellent progress! Keep maintaining your health routine.';
    }
    if (percentage >= 60) {
      return 'Good progress, but there\'s room for improvement. Consider discussing areas of concern with your doctor.';
    }
    return 'Your health indicators suggest you should schedule a consultation with your doctor soon.';
  };

  const getScoreGrade = () => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreCard}>
        <View style={[styles.scoreCircle, { borderColor: getScoreColor() }]}>
          <Award size={40} color={getScoreColor()} style={styles.awardIcon} />
          <Text style={[styles.scoreGrade, { color: getScoreColor() }]}>
            {getScoreGrade()}
          </Text>
          <Text style={styles.scoreNumber}>
            {score}/{total}
          </Text>
          <Text style={styles.scorePercentage}>
            {percentage}%
          </Text>
        </View>

        <Text style={styles.scoreMessage}>
          {getScoreMessage()}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/')}
          >
            <Home size={24} color="#fff" />
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.back()}
          >
            <RotateCcw size={24} color="#4299e1" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Take Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    justifyContent: 'center',
    padding: 20,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  awardIcon: {
    position: 'absolute',
    top: 20,
  },
  scoreGrade: {
    fontSize: 48,
    fontFamily: 'Inter_700Bold',
    marginTop: 20,
  },
  scoreNumber: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
    marginTop: 4,
  },
  scorePercentage: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
  },
  scoreMessage: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#4299e1',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4299e1',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#4299e1',
  },
});