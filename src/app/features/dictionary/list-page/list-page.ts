import { Component, inject, signal } from '@angular/core';
import VocabularyStore from '../../../core/dictionary-store';

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

  constructor() {
  }

  searchInput(event: Event) {
    const inp = (event.target as HTMLInputElement);
    this.search.update(() => inp.value);
    this.vocab_store.setSearchQuery(this.search());
  }
}
