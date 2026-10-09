import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {ApiEnvelope, Page, VocabItem} from './models';
import {map} from 'rxjs';
@Injectable({providedIn:'root'})
export class DictionaryApi{
  private readonly http = inject(HttpClient)
  private readonly base : string = 'http://localhost:8080/v1/api';

  list(page = 1, size = 10){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiEnvelope<Page<VocabItem>>>(`${this.base}/dictionary`, {params: params}).pipe(
      map(x => x.data!),
    )
  }
}
