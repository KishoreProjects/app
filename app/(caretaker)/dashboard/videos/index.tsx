import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Play } from 'lucide-react-native';

export default function VideosScreen() {
  const videos = [
    {
      id: 1,
      title: 'Exercise Routine for Back Pain',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      duration: '10:30',
      author: 'Dr. Smith',
    },
    {
      id: 2,
      title: 'Proper Medication Usage Guide',
      thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
      duration: '15:45',
      author: 'Dr. Johnson',
    },
    {
      id: 3,
      title: 'Daily Stretching Exercises',
      thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
      duration: '08:20',
      author: 'Dr. Williams',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suggested Videos</Text>
      </View>

      <ScrollView style={styles.videoList}>
        {videos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard}>
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.playButton}>
                <Play size={24} color="#fff" fill="#fff" />
              </View>
              <View style={styles.duration}>
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoAuthor}>By {video.author}</Text>
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
  videoList: {
    padding: 20,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    backgroundColor: 'rgba(66, 153, 225, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2d3748',
    marginBottom: 4,
  },
  videoAuthor: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
});