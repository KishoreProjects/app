import { Tabs } from 'expo-router';
import { Chrome as Home, Users, Video, Clock, Calendar, MessageSquare } from 'lucide-react-native';
import { PatientProvider } from '../../context/PatientContext';

export default function DoctorLayout() {
  return (
    <PatientProvider>
      <Tabs screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: '#4299e1',
        tabBarInactiveTintColor: '#a0aec0',
        headerShown: false,
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="patients"
          options={{
            title: 'Patients',
            tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
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
          name="appointments"
          options={{
            title: 'Appointments',
            tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="answers"
          options={{
            title: 'Answers',
            tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
          }}
        />
      </Tabs>
    </PatientProvider>
  );
}