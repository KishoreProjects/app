import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Video, Upload } from 'lucide-react-native';

export default function VideosScreen() {
  const videos = [
    { id: 1, title: 'Exercise Routine for Back Pain', duration: '10:30' },
    { id: 2, title: 'Proper Medication Usage Guide', duration: '15:45' },
    { id: 3, title: 'Daily Stretching Exercises', duration: '08:20' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suggested Videos</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Upload size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Upload Video</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Video size={24} color="#fff" />
          
          <Text style={styles.actionButtonText}>Select Video</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.videoList}>
        {videos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard}>
            <View style={styles.videoThumbnail}>
              <Video size={32} color="#4299e1" />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoDuration}>{video.duration}</Text>
            </View>
          </TouchableOpacity>
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
  actions: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#4299e1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    width: '45%',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  videoList: {
    padding: 20,
  },
  videoCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  videoThumbnail: {
    width: 64,
    height: 64,
    backgroundColor: '#ebf8ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 4,
  },
  videoDuration: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
});