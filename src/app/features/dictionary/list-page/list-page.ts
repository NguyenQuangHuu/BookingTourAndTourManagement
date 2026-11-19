import { Component, computed, inject } from '@angular/core';
import VocabularyStore, { PublishState } from '../../../core/dictionary-store';
import { WordType } from '../../../core/dictionary.model';
import { EmptyState } from '../../../components/empty-state/empty-state';

@Component({
  imports: [EmptyState],
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
      this.vocab_store.searchQuery().trim() !== '' ||
      this.vocab_store.selectedWordType() !== null ||
      this.vocab_store.selectedState() !== null
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
    const btn = (event.currentTarget as HTMLButtonElement);
    const selectedValue = btn.value === null ? null : btn.value as PublishState;
    this.vocab_store.setStateFilter(selectedValue);
  }

  openCreateModal() {
    console.log('click');
  }

  resetFilter() {
    this.vocab_store.setResetFilter();
  }
}
