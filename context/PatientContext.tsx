import { createContext, useContext, useState, ReactNode } from 'react';

export type Patient = {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  address: string;
  disease: string;
  lastVisit: string;
};

type PatientContextType = {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'P001',
      name: 'John Doe',
      age: '45',
      gender: 'Male',
      phone: '+1 234-567-8900',
      address: '123 Main St, City',
      disease: 'Hypertension',
      lastVisit: '2025-02-15',
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: '32',
      gender: 'Female',
      phone: '+1 234-567-8901',
      address: '456 Oak Ave, Town',
      disease: 'Diabetes',
      lastVisit: '2025-02-14',
    },
  ]);

  const addPatient = (patient: Patient) => {
    setPatients((currentPatients) => [...currentPatients, patient]);
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
}