export interface ApiEnvelope<T>{
  data: T | null;
  message: string;
  error : unknown;
  meta: unknown;
}

export interface Page<T>{
  items: T[];
  total: number;
  page:number;
  size:number;
}

export type WordType = 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Unknown';
export type VocabState = 'DRAFT' | 'PENDING_FOR_REVIEW' | 'PUBLISHED' | 'DELETED';

export interface VocabItem{
  id: string;
  german_word:string;
  word_type : WordType;
  state : VocabState;
  tags : string[];
  created_at: string;
  updated_at?: string;
}
