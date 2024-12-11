import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sentence, SentenceState } from '../types/Sentence';

const sentenceSlice = createSlice({
  name: 'sentences',
  initialState: {
    sentences: [] as Sentence[],
    editIndex: null,
    deleteIndex: null
  } as SentenceState,
  reducers: {
    addSentence: (state: SentenceState, action: PayloadAction<Sentence>) => {
      if (state.editIndex !== null) {
        state.sentences[state.editIndex] = action.payload;
        state.editIndex = null;
      } else {
        state.sentences.push(action.payload);
      }
    },
    setFormData: (state: SentenceState, action: PayloadAction<{ sentence: Sentence, index: number }>) => {
      state.sentences[action.payload.index] = action.payload.sentence;
      state.editIndex = action.payload.index;
    },
    startEditing: (state: SentenceState, action: PayloadAction<number>) => {
      state.editIndex = action.payload;
    },
    stopEditing: (state: SentenceState) => {
      state.editIndex = null;
    },
    deleteSentence: (state: SentenceState, action: PayloadAction<number>) => {
      state.sentences = state.sentences.filter((_, index) => index !== action.payload);
      state.deleteIndex = null;
    }
  }
});

export const { addSentence, setFormData, startEditing, stopEditing, deleteSentence } = sentenceSlice.actions;
export default sentenceSlice.reducer;
