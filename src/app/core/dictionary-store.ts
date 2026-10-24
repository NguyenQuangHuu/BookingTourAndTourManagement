import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { VocabState, VocabularyReadModel, WordType, Noun } from './models';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type vocabularyState = {
  vocabs: VocabularyReadModel[];
  searchQuery: string;
  filterVocab: 'asc' | 'desc';
  selectedState: 'ALL' | VocabState;
  selectedWordType: WordType | 'ALL';
  isLoading: boolean;
  error : string | null;
};
const initVocabState: vocabularyState = {
  vocabs: [] as VocabularyReadModel[],
  searchQuery: '',
  filterVocab: 'asc',
  selectedState: 'ALL',
  selectedWordType:'ALL',
  isLoading: false,
  error: null,
};

const VocabularyStore = signalStore(
  withState(initVocabState),
  withComputed(({ vocabs, filterVocab, searchQuery, selectedState }) => ({
    vocabCount: computed(() => vocabs().length),
    draftCount: computed(() => vocabs().filter((x) => x.state === 'DRAFT').length),
    reviewsCount: computed(() => vocabs().filter((x) => x.state === 'PENDING_FOR_REVIEW').length)
      ,
    publishCount: computed(() => vocabs().filter((x) => x.state === 'PUBLISHED').length),
    genderStats: computed(() => {
      const nouns = vocabs().filter((x) => x.word_type === 'Noun' && x.detail);
      return {
        der : nouns.filter(v => 'gender' in  v.detail! && v.detail.gender === 'masculine').length,
        die : nouns.filter(v => 'gender' in  v.detail! && v.detail.gender === 'masculine').length,
        das : nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'neutral').length
      };
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    setSearchQuery(query: string) {
      patchState(store, { searchQuery: query });
    },
    setStateFilter(state: VocabState | 'ALL') {
      patchState(store, { selectedState: state });
    },
    loadVocabs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => http.get<{ data: VocabularyReadModel[] }>('/v1/api/dictionary')),
        tap({
          next: (res) => patchState(store, { vocabs: res.data, isLoading: false }),
          error: (err) => patchState(store, { error: err.message, isLoading: false }),
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadVocabs();
    },
  }),
);
export default VocabularyStore;
