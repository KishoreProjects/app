import { createContext, useContext, useState, ReactNode } from 'react';

export type QuestionResponse = {
  id: number;
  patientId: string;
  patientName: string;
  type: 'daily' | 'weekly';
  date: string;
  score: number;
  totalQuestions: number;
  answers: { question: string; answer: string }[];
};

type QuestionContextType = {
  responses: QuestionResponse[];
  addResponse: (response: QuestionResponse) => void;
};

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [responses, setResponses] = useState<QuestionResponse[]>([
    {
      id: 1,
      patientId: 'P001',
      patientName: 'John Doe',
      type: 'daily',
      date: '2025-02-15',
      score: 8,
      totalQuestions: 10,
      answers: [
        { question: 'How would you rate your pain level today?', answer: '1-3 (Mild)' },
        { question: 'Did you take all prescribed medications today?', answer: 'Yes, all' },
      ],
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Jane Smith',
      type: 'weekly',
      date: '2025-02-15',
      score: 9,
      totalQuestions: 10,
      answers: [
        { question: 'Have you experienced any significant changes?', answer: 'No changes' },
        { question: 'How would you rate your overall mobility?', answer: '8-10 (Excellent)' },
      ],
    },
  ]);

  const addResponse = (response: QuestionResponse) => {
    setResponses((current) => [...current, response]);
  };

  return (
    <QuestionContext.Provider value={{ responses, addResponse }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionProvider');
  }
  return context;
}