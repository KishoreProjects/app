import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

export default function WeeklyQuestions() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));

  const questions = [
    'Have you experienced any significant changes in your condition this week?',
    'How would you rate your overall mobility this week? (1-10)',
    'Have you been following the prescribed exercise routine?',
    'Have you noticed any new symptoms or side effects?',
    'How would you rate your sleep quality this week? (1-10)',
    'Have you maintained a balanced diet according to recommendations?',
    'Rate your emotional well-being this week (1-10)',
    'Have you missed any medication doses this week?',
    'Have you been able to perform daily activities independently?',
    'Would you like to discuss any specific concerns with your doctor?'
  ];

  const options = [
    ['No changes', 'Minor changes', 'Significant changes'],
    ['1-3 (Poor)', '4-7 (Moderate)', '8-10 (Excellent)'],
    ['Yes, completely', 'Partially', 'No'],
    ['None', 'Minor symptoms', 'Severe symptoms'],
    ['1-3 (Poor)', '4-7 (Moderate)', '8-10 (Excellent)'],
    ['Yes, strictly', 'Moderately', 'Not at all'],
    ['1-3 (Low)', '4-7 (Moderate)', '8-10 (High)'],
    ['No missed doses', '1-2 missed doses', '3+ missed doses'],
    ['Fully independent', 'Need some help', 'Need significant help'],
    ['No concerns', 'Minor concerns', 'Urgent concerns']
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score based on positive answers
      const score = answers.filter(a => 
        a.includes('No changes') || 
        a.includes('8-10') || 
        a.includes('Yes, completely') || 
        a.includes('None') ||
        a.includes('No missed doses') ||
        a.includes('Fully independent')
      ).length;
      
      router.push({
        pathname: '/(caretaker)/dashboard/questions/weekly-score',
        params: { score: score.toString(), total: questions.length.toString() }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Health Assessment</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.questionCount}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>

        <View style={styles.questionCard}>
          <Text style={styles.question}>{questions[currentQuestion]}</Text>

          <View style={styles.options}>
            {options[currentQuestion].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answers[currentQuestion] === option && styles.optionButtonSelected,
                ]}
                onPress={() => handleAnswer(option)}
              >
                <Text style={[
                  styles.optionText,
                  answers[currentQuestion] === option && styles.optionTextSelected,
                ]}>
                  {option}
                </Text>
                <ChevronRight
                  size={20}
                  color={answers[currentQuestion] === option ? '#fff' : '#4299e1'}
                />
              </TouchableOpacity>
            ))}
          </View>
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
  progressBar: {
    height: 8,
    backgroundColor: '#edf2f7',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299e1',
    borderRadius: 4,
  },
  questionCount: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
    marginBottom: 24,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  question: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
  },
  optionButtonSelected: {
    backgroundColor: '#4299e1',
    borderColor: '#4299e1',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#2d3748',
  },
  optionTextSelected: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
});