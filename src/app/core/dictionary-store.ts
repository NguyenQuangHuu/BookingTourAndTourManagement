import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { VocabState, VocabularyReadModel, WordType } from './dictionary.model';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { DictionaryApi } from './dictionary-api.service.';


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
  selectedState: 'ALL' | VocabState;
  selectedWordType: WordType | 'ALL';
  isLoading: boolean;
  error: string | null;
};
const initVocabState: vocabularyState = {
  vocabs: [] as VocabularyReadModel[],
  searchQuery: '',
  sortBy: 'asc',
  selectedState: 'ALL',
  selectedWordType: 'ALL',
  isLoading: false,
  error: null
};

const VocabularyStore = signalStore(
  withState(initVocabState),
  withComputed(({ vocabs, searchQuery, selectedState }) => ({
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
      return vocabs().filter((v) => {
        const choiceState = selectedState() === 'ALL' || v.state === selectedState();
        const q = searchQuery().trim();
        return choiceState && (v.german_word.includes(q) || v.state.includes(q) || v.word_type?.toString().includes(q));
      });
    })
  })),
  withMethods((store, service = inject(DictionaryApi)) => ({
    setSearchQuery(query: string) {
      patchState(store, { searchQuery: query });
    },
    setStateFilter(state: VocabState | 'ALL') {
      patchState(store, { selectedState: state });
    },
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
