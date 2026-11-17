import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEnvelope, Page, VocabularyReadModel } from './dictionary.model';

@Injectable({ providedIn: 'root' })
export class DictionaryApi {
  private readonly http = inject(HttpClient);
  private readonly base: string = 'http://localhost:8080';

  loadData(): Observable<ApiEnvelope<Page<VocabularyReadModel>>> {
    return this.http.get<ApiEnvelope<Page<VocabularyReadModel>>>(`${this.base}/v1/api/dictionary`);
  }
}
