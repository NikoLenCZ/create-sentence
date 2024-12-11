import { SentenceStep } from "./Steps";

export type Sentence = Record<SentenceStep, string>;


export interface SentenceState {
  sentences: Sentence[];
  editIndex: number | null;
  deleteIndex: number | null;
}