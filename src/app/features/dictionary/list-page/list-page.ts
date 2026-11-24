import { Component, computed, inject } from '@angular/core';
import VocabularyStore from '../../../core/dictionary-store';
import { WordType } from '../../../core/dictionary.model';
import { CreateVocab } from '../create-vocab/create-vocab';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AppIcon } from '../../../components/icon/icon';
import { AppEmptyState } from '../../../components/empty-state/empty-state';

@Component({
  imports: [
    AppIcon,
    DialogModule,
    AppEmptyState
  ],
  providers: [VocabularyStore],
  selector: 'app-list-page',
  styleUrl: './list-page.css',
  templateUrl: './list-page.html'
})
export class ListPage {
  vocab_store = inject(VocabularyStore);
  readonly items = this.vocab_store.vocabs();
  readonly hasActiveFilters = computed(() => {
    return (
      this.vocab_store.vocabFilter().searchQuery.trim() !== '' ||
      this.vocab_store.vocabFilter().wordType !== null ||
      this.vocab_store.vocabFilter().publishState !== null
    );
  });
  readonly dialogRef = inject(Dialog);

  constructor() {
  }

  openCreateModal() {
    const dialogRef = this.dialogRef.open(CreateVocab, {
      width: '496px',
      disableClose: true
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        console.log('Dữ liệu form:', result);
        // Gọi API tại đây để lưu vào database
        // this.userService.create(result).subscribe(...)
      }
    });
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

  resetFilter() {
    this.vocab_store.setResetFilter();
  }
}
