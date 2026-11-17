import { Component, signal } from '@angular/core';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { VocabState, WordType } from '../../../core/dictionary.model';

@Component({
  imports: [FormField],
  selector: 'app-create-vocab',
  styleUrl: './create-vocab.css',
  templateUrl: './create-vocab.html',
  standalone: true
})
export class CreateVocab {
  private readonly createVocabModel = signal<CreateVocabFormData>({
    german_word: '',
    word_type: null,
    state: 'DRAFT',
    tags: [] as string[]
  });
  createForm = form(this.createVocabModel, path => {
    required(path.german_word, { message: 'không được để trống' });
    minLength(path.german_word, 2, { message: 'độ dài tối thiểu là 2' });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    submit(this.createForm, {
      action: async () => {
        const values = this.createVocabModel();
        console.log(values);
      }
    });
  }
}

interface CreateVocabFormData {
  german_word: string;
  word_type: WordType | null;
  state: VocabState;
  tags: string[];
}
