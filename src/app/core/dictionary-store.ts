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

type vocabularyState = {
  vocabs: VocabularyReadModel[];
  searchQuery: string;
  sortBy: 'asc' | 'desc';
  selectedState: PublishState | null;
  selectedWordType: WordType | null;
  isLoading: boolean;
  error: string | null;
};
const initVocabState: vocabularyState = {
  vocabs: [] as VocabularyReadModel[],
  searchQuery: '',
  sortBy: 'asc',
  selectedState: null,
  selectedWordType: null,
  isLoading: false,
  error: null
};

const VocabularyStore = signalStore(
  withState(initVocabState),
  withComputed(({ vocabs, searchQuery, selectedState, selectedWordType }) => ({
    vocabCount: computed(() => vocabs().length),
    draftCount: computed(() => vocabs().filter((x) => x.state === 'DRAFT').length),
    reviewsCount: computed(() => vocabs().filter((x) => x.state === 'PENDING_FOR_REVIEW').length)
    ,
    publishCount: computed(() => vocabs().filter((x) => x.state === 'PUBLISHED').length),
    genderStats: computed(() => {
      const nouns = vocabs().filter((x) => x.word_type === 'Noun' && !!x.detail);
      return {
        der: nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'masculine').length,
        die: nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'masculine').length,
        das: nouns.filter(v => 'gender' in v.detail! && v.detail.gender === 'neutral').length
      };
    }),
    filterVocabs: computed(() => {
      const state = selectedState();
      const wordType = selectedWordType();
      const query = searchQuery().trim();
      return vocabs().filter((v) => {
        const matchState = v.state === null ? true : selectedState() === 'PUBLISHED' ? v.state === 'PUBLISHED' : v.state !== 'PUBLISHED';
        const matchWordType = !wordType || wordType === v.word_type;
        const matchQuery = !query || v.german_word.toLowerCase().includes(query);
        return matchState && matchWordType && matchQuery;
      });
    })
  })),
  withMethods((store, service = inject(DictionaryApi)) => ({
    setSearchQuery(query: string) {
      patchState(store, { searchQuery: query });
    },
    setStateFilter(state: PublishState | null) {
      patchState(store, { selectedState: state });
    },
    setWordTypeFilter(wordType: WordType | null) {
      patchState(store, { selectedWordType: wordType });
    },
    setResetFilter() {
      patchState(store, { selectedState: null, selectedWordType: null, searchQuery: '' });
    }
    ,
    loadVocabs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => service.loadData().pipe(
          tap({
            next: (res) => {
              const items = res.data?.items;
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
