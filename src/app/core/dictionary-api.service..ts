import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiEnvelope, Page, VocabularyReadModel } from './dictionary.model';

@Injectable({ providedIn: 'root' })
export class DictionaryApi {
  private readonly http = inject(HttpClient);
  private readonly base: string = 'http://localhost:8080';

  loadData(): Observable<VocabularyReadModel[]> {
    return this.http.get<ApiEnvelope<Page<VocabularyReadModel>>>(`${this.base}/v1/api/dictionary`).pipe(
      tap((value) => console.log(value)),
      map((res) => res.data!.items ?? [] as VocabularyReadModel[])
    );
  }
}
