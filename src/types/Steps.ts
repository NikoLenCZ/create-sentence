export const labels: Record<SentenceStep, string> = {
  'who': 'kdo',
  'what': 'co',
  'when': 'kdy',
  'where': 'kde'
};

export type SentenceStep = 'who' | 'what' | 'when' | 'where';

export const steps: SentenceStep[] = ['who', 'what', 'when', 'where'];

