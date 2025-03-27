import { createContext, useContext, useState, ReactNode } from 'react';

export type Appointment = {
  id: number;
  patientId: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
};

type AppointmentContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: number, status: 'approved' | 'rejected') => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientId: 'P001',
      name: 'John Doe',
      phone: '+1 234-567-8900',
      date: '2025-02-15',
      time: '10:00 AM',
      address: '123 Main St',
      status: 'pending',
    },
    {
      id: 2,
      patientId: 'P002',
      name: 'Jane Smith',
      phone: '+1 234-567-8901',
      date: '2025-02-15',
      time: '11:30 AM',
      address: '456 Oak Ave',
      status: 'pending',
    },
  ]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((current) => [...current, appointment]);
  };

  const updateAppointmentStatus = (id: number, status: 'approved' | 'rejected') => {
    setAppointments((current) =>
      current.map((apt) =>
        apt.id === id ? { ...apt, status } : apt
      )
    );
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointmentStatus }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
}