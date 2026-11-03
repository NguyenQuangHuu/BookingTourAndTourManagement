import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import VocabularyStore from '../../../core/dictionary-store';
import { WordTypePie } from '../../../components/widget/word-type-pie/word-type-pie';

@Component({
  imports: [WordTypePie],
  selector: 'app-list-page',
  styleUrl: './list-page.css',
  templateUrl: './list-page.html',
  standalone: true,
})
export class ListPage {
  vocab_store = inject(VocabularyStore);
}
