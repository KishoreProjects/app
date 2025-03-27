import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Medicine = {
  id: number;
  name: string;
  time: string;
  dosage: string;
  taken: boolean;
};

type MedicineContextType = {
  medicines: Medicine[];
  addMedicine: (medicine: Medicine) => Promise<void>;
  updateMedicineStatus: (id: number, taken: boolean) => Promise<void>;
  loading: boolean;
};

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

const API_URL = "http://192.168.29.221/Mitra/app/medmon.php"; // Update with actual API endpoint

export function MedicineProvider({ children }: { children: ReactNode }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch medicines from API on mount
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error fetching medicines: ${response.status}`);
        
        const data = await response.json();

        if (Array.isArray(data)) {
          setMedicines(data);
        } else {
          console.error("API did not return an array:", data);
          setMedicines([]);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setMedicines([]); // Ensure state is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Add a new medicine to the API
  const addMedicine = async (medicine: Medicine) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine),
      });

      if (response.ok) {
        setMedicines((prev) => [...prev, medicine]);
      } else {
        console.error("Failed to add medicine");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  // Update medicine status in the API
  const updateMedicineStatus = async (id: number, taken: boolean) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taken }),
      });

      if (response.ok) {
        setMedicines((prev) =>
          prev.map((med) => (med.id === id ? { ...med, taken } : med))
        );
      } else {
        console.error("Failed to update medicine status");
      }
    } catch (error) {
      console.error("Error updating medicine status:", error);
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, updateMedicineStatus, loading }}>
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicines() {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error('useMedicines must be used within a MedicineProvider');
  }
  return context;
}
