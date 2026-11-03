export interface ApiEnvelope<T> {
  data: T | null;
  message: string;
  error: unknown;
  meta: unknown;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}
export type Article = 'der' | 'die' | 'das';
export type Gender = 'masculine' | 'feminine' | 'neutral';
export type WordType = 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Unknown';
export type VocabState = 'DRAFT' | 'PENDING_FOR_REVIEW' | 'PUBLISHED' | 'DELETED';
export type AuxiliaryVerb = 'haben' | 'sein';
export interface VocabularyReadModel {
  id: string;
  german_word: string;
  word_type: WordType;
  state: VocabState;
  detail: Noun | Verb | null;
  tags: string[];
  created_at: string;
  updated_at?: string;
}

export interface Noun {
  plural: string;
  article: Article;
  gender: Gender;
  genitive_ending: string;
  is_n_declension: boolean;
  is_plural_only: boolean;
  is_singular_only: boolean;
}

export interface Verb {
  present_third_person: string;
  past_simple: string;
  past_participle: string;
  auxiliary_verb: AuxiliaryVerb;
  is_separable: boolean;
}

export interface ToDoItem{
  id: string;
  title: string;
  description: string;
  state: 'done' | 'pending' | 'cancel' | string;
}
