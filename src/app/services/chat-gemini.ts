import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {firstValueFrom} from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class ChatGemini {
  private apiUrl = 'http://localhost:8080/api/chat';
  private http = inject(HttpClient);
  constructor() {}

  async generateText(prompt: string): Promise<string> {
    try {
      // Gửi POST request tới Golang
      const body = { prompt: prompt };
      
      // Dùng firstValueFrom để chuyển Observable thành Promise (dễ dùng async/await)
      const result: any = await firstValueFrom(this.http.post(this.apiUrl, body));
      
      return result.response;
    } catch (error) {
      console.error('Lỗi server:', error);
      return 'Không thể kết nối tới server.';
    }
  }
}
