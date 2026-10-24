import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class DictionaryApi {
  private readonly http = inject(HttpClient);
  private readonly base: string = 'http://localhost:8080/v1/api';
}
