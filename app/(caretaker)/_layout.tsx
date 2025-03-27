import { Tabs } from 'expo-router';
import { MessageSquare, Calendar, Video, Clock, CirclePlus as PlusCircle } from 'lucide-react-native';

export default function CaretakerLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: '#fff' },
      tabBarActiveTintColor: '#4299e1',
      tabBarInactiveTintColor: '#a0aec0',
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Questions',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: ({ color, size }) => <Video size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicine"
        options={{
          title: 'Medicine',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}