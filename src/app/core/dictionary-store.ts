import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { VocabularyReadModel, WordType } from './dictionary.model';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { DictionaryApi } from './dictionary-api.service.';

export type PublishState = 'PUBLISHED' | 'UNPUBLISHED'


const KEY_VOCABS_LS = 'german-word.vocabs';

function loadData(): VocabularyReadModel[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_VOCABS_LS) ?? '[]') as VocabularyReadModel[];
  } catch {
    return [];
  }
}

type VocabularyFilter = {
  publishState: boolean | null;
  wordType: WordType | null;
  searchQuery: string;
  sortDirection: 'asc' | 'desc';
  sortBy: string;
}

type vocabularyState = {
  vocabs: VocabularyReadModel[];
  // searchQuery: string;
  // sortBy: 'asc' | 'desc';
  // selectedState: PublishState | null;
  // selectedWordType: WordType | null;
  vocabFilter: VocabularyFilter;
  isLoading: boolean;
  error: string | null;
};
const initVocabularyFilter: VocabularyFilter = {
  publishState: null, searchQuery: '', sortBy: 'german_word', sortDirection: 'asc', wordType: null

};
const initVocabState: vocabularyState = {
  vocabs: [] as VocabularyReadModel[],
  vocabFilter: initVocabularyFilter,
  // searchQuery: '',
  // sortBy: 'asc',
  // selectedState: null,
  // selectedWordType: null,
  isLoading: false,
  error: null
};

const VocabularyStore = signalStore(
  withState(initVocabState),
  withComputed(({ vocabs, vocabFilter }) => ({
    vocabCount: computed(() => vocabs().length),
    draftCount: computed(() => vocabs().filter((x) => x.state === 'DRAFT').length),
    reviewsCount: computed(() => vocabs().filter((x) => x.state === 'PENDING_FOR_REVIEW').length)
    ,
    publishCount: computed(() => vocabs().filter((x) => x.state === 'PUBLISHED').length),
    genderStats: computed(() => {
      const nouns = vocabs().filter((x) => x.word_type === 'Noun' && !!x.detail);
      return {
        der: nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'masculine').length,
        die: nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'feminine').length,
        das: nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'neutral').length
      };
    }),
    filterVocabs: computed(() => {
      const state = vocabFilter().publishState;
      const wordType = vocabFilter().wordType;
      const query = vocabFilter().searchQuery.toLowerCase().trim();
      return vocabs().filter((v) => {
        const matchState = state === null ? true : state ? v.state === 'PUBLISHED' : v.state !== 'PUBLISHED';
        const matchWordType = !wordType || wordType === v.word_type;
        const matchQuery = !query || v.german_word.toLowerCase().includes(query);
        return matchState && matchWordType && matchQuery;
      });
    })
  })),
  withMethods((store, service = inject(DictionaryApi)) => ({
    setSearchQuery(query: string) {
      patchState(store, (s) => ({ vocabFilter: { ...s.vocabFilter, searchQuery: query } }));
    },
    setStateFilter(state: boolean | null) {
      patchState(store, (s) => ({ vocabFilter: { ...s.vocabFilter, publishState: state } }));
    },
    setWordTypeFilter(wordType: WordType | null) {
      patchState(store, (s) => {
        return { ...s, vocabFilter: { ...s.vocabFilter, wordType } };
      });
    },
    setResetFilter() {
      patchState(store, { vocabFilter: initVocabularyFilter });
    }
    ,
    loadVocabs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => service.loadData().pipe(
          tap({
            next: (res) => {
              const items = res;
              localStorage.setItem(KEY_VOCABS_LS, JSON.stringify(items));
              patchState(store, { vocabs: items, isLoading: false });
            },
            error: (err) => patchState(store, { error: err.message, isLoading: false })
          })
        ))
      )
    )
  })),
  withHooks({
    onInit(store) {
      const cached = loadData();
      if (cached.length == 0) {
        store.loadVocabs();
      }
      patchState(store, { vocabs: cached });
    }
  })
);
export default VocabularyStore;
