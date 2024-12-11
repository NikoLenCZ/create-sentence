import { configureStore } from '@reduxjs/toolkit';
import sentenceReducer from './sentenceService';

export const store = configureStore({
  reducer: {
    sentences: sentenceReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
