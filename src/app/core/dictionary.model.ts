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
export type WordType = 'Noun' | 'Verb' | 'Adjective' | 'Adverb';
export type VocabState = 'DRAFT' | 'PENDING_FOR_REVIEW' | 'PUBLISHED' | 'DELETED';
export type AuxiliaryVerb = 'haben' | 'sein';

export interface VocabularyReadModel {
  id: string;
  german_word: string;
  meanings: VocabularyMeaning[];
  word_type: WordType | null;
  state: VocabState;
  detail: NounData | VerbData | AdjectiveData | AdverbData | null;
  tags: string[];
  created_at: string;
  updated_at?: string;
}

export interface VocabularyMeaning {
  meaning_vie: string;
  following_context: string;
  examples: VocabularyExample[];
}

export interface VocabularyExample {
  content: string;
  translate: string;
}

export interface NounData {
  plural: string;
  article: Article;
  gender: Gender;
  genitive_ending: string;
  is_n_declension: boolean;
  is_plural_only: boolean;
  is_singular_only: boolean;
}

export interface VerbData {
  present_third_person: string;
  past_simple: string;
  past_participle: string;
  auxiliary_verb: AuxiliaryVerb;
  is_separable: boolean;
}

export interface AdjectiveData {

}

export interface AdverbData {

}

