import { Component, inject, signal } from '@angular/core';
import VocabularyStore, { PublishState } from '../../../core/dictionary-store';
import { WordType } from '../../../core/dictionary.model';


@Component({
  imports: [],
  providers: [VocabularyStore],
  selector: 'app-list-page',
  styleUrl: './list-page.css',
  templateUrl: './list-page.html',
  standalone: true
})
export class ListPage {
  vocab_store = inject(VocabularyStore);
  search = signal<string>('');
  selectPublishState = signal<PublishState | null>(null);

  constructor() {
  }

  searchInput(event: Event) {
    const inp = (event.target as HTMLInputElement);
    this.search.update(() => inp.value);
    this.vocab_store.setSearchQuery(this.search());
  }

  selectedFilter(event: Event) {
    const selected = (event.target as HTMLSelectElement);
    const value = selected.value as WordType;
    this.vocab_store.setWordTypeFilter(value);
  }

  stateFilter(event: Event) {
    const btn = (event.target as HTMLButtonElement);
    const selectedValue = btn.value as PublishState;
    this.selectPublishState.update((value) => value === selectedValue ? null : selectedValue);
    this.vocab_store.setStateFilter(this.selectPublishState());
  }
}
