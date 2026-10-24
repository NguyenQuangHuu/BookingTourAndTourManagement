import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, Subject, switchMap } from 'rxjs';
import VocabularyStore from '../../../core/dictionary-store';

@Component({
  imports: [],
  selector: 'app-list-page',
  styleUrl: './list-page.css',
  templateUrl: './list-page.html',
  standalone: true,
})
export class ListPage {
  vocab_store = inject(VocabularyStore);
}
