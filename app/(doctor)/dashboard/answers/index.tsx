import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Award } from 'lucide-react-native';
import { useState } from 'react';
import { useQuestions } from '../../../../context/QuestionContext';

export default function AnswersScreen() {
  const [selectedType, setSelectedType] = useState<'daily' | 'weekly'>('daily');
  const { responses } = useQuestions();

  const filteredResponses = responses.filter((response) => response.type === selectedType);

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return '#48bb78';
    if (percentage >= 60) return '#ecc94b';
    return '#e53e3e';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patient Responses</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedType === 'daily' && styles.tabActive]}
          onPress={() => setSelectedType('daily')}
        >
          <Clock size={20} color={selectedType === 'daily' ? '#4299e1' : '#718096'} />
          <Text style={[styles.tabText, selectedType === 'daily' && styles.tabTextActive]}>
            Daily Responses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedType === 'weekly' && styles.tabActive]}
          onPress={() => setSelectedType('weekly')}
        >
          <Calendar size={20} color={selectedType === 'weekly' ? '#4299e1' : '#718096'} />
          <Text style={[styles.tabText, selectedType === 'weekly' && styles.tabTextActive]}>
            Weekly Responses
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {filteredResponses.map((response) => (
          <View key={response.id} style={styles.answerCard}>
            <View style={styles.answerHeader}>
              <View style={styles.patientInfo}>
                <Text style={styles.patientId}>ID: {response.patientId}</Text>
                <Text style={styles.patientName}>{response.patientName}</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Award size={20} color={getScoreColor(response.score, response.totalQuestions)} />
                <Text style={[
                  styles.score,
                  { color: getScoreColor(response.score, response.totalQuestions) }
                ]}>
                  {response.score}/{response.totalQuestions}
                </Text>
              </View>
            </View>
            
            <Text style={styles.answerDate}>{response.date}</Text>
            
            <View style={styles.answersContainer}>
              {response.answers.map((item, index) => (
                <View key={index} style={styles.answerItem}>
                  <Text style={styles.question}>{item.question}</Text>
                  <Text style={styles.answer}>{item.answer}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${(response.score / response.totalQuestions) * 100}%`,
                    backgroundColor: getScoreColor(response.score, response.totalQuestions)
                  }
                ]} 
              />
            </View>
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
  tabs: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#4299e1',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
  },
  tabTextActive: {
    color: '#4299e1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  answerCard: {
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
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientId: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#4299e1',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf8ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  score: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  answerDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
    marginBottom: 16,
  },
  answersContainer: {
    gap: 12,
    marginBottom: 16,
  },
  answerItem: {
    backgroundColor: '#f7fafc',
    padding: 12,
    borderRadius: 8,
  },
  question: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#4a5568',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#edf2f7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});