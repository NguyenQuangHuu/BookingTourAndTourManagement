import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { VocabState, VocabularyReadModel } from './models';
import { computed } from '@angular/core';

type vocabularyState = {
  vocabs: VocabularyReadModel[];
  searchQuery: string;
  filterVocab: 'asc' | 'desc';
  selectedState: 'ALL' | VocabState;
  isLoading: boolean;
};
const initVocabState: vocabularyState = {
  vocabs: [] as VocabularyReadModel[],
  searchQuery: '',
  filterVocab: 'asc',
  selectedState: 'ALL',
  isLoading: false,
};

export const VocabularyStore = signalStore(
  withState(initVocabState),
  withComputed(({ vocabs, filterVocab, searchQuery, selectedState }) => ({
    vocabCount: computed(() => vocabs().length),
  })),
  withMethods((store) => ({})),
);
