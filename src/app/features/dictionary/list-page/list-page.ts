import { Component, computed, inject } from '@angular/core';
import VocabularyStore from '../../../core/dictionary-store';
import { WordType } from '../../../core/dictionary.model';
import { EmptyState } from '../../../components/empty-state/empty-state';
import { Icon } from '../../../components/icon/icon';
import { AppButton } from '../../../components/button/button';

@Component({
  imports: [
    EmptyState,
    Icon,
    AppButton
  ],
  providers: [VocabularyStore],
  selector: 'app-list-page',
  styleUrl: './list-page.css',
  templateUrl: './list-page.html',
  standalone: true
})
export class ListPage {
  vocab_store = inject(VocabularyStore);
  readonly hasActiveFilters = computed(() => {
    return (
      this.vocab_store.vocabFilter().searchQuery.trim() !== '' ||
      this.vocab_store.vocabFilter().wordType !== null ||
      this.vocab_store.vocabFilter().publishState !== null
    );
  });

  constructor() {
  }

  searchInput(event: Event) {
    const inp = (event.target as HTMLInputElement);
    this.vocab_store.setSearchQuery(inp.value);
  }

  selectedFilter(event: Event) {
    const selected = (event.target as HTMLSelectElement);
    const selectValue = selected.value === '' ? null : selected.value as WordType;
    this.vocab_store.setWordTypeFilter(selectValue);
  }

  stateFilter(event: Event) {
    const value = (event.currentTarget as HTMLButtonElement).value === 'true';
    const selectedValue = this.vocab_store.vocabFilter().publishState === value ? null : value;
    this.vocab_store.setStateFilter(selectedValue);
  }

  createDraftVocab() {
    console.log('Create Draft Vocab');
  }

  resetFilter() {
    this.vocab_store.setResetFilter();
  }
}
