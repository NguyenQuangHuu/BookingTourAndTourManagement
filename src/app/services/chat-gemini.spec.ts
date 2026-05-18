import { TestBed } from '@angular/core/testing';

import { ChatGemini } from './chat-gemini';

describe('ChatGemini', () => {
  let service: ChatGemini;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGemini);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
