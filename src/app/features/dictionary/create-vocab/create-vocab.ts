import { Component, inject, input, output, signal } from '@angular/core';
import { form, FormField, FormRoot, minLength, required, submit } from '@angular/forms/signals';
import { VocabState, WordType } from '../../../core/dictionary.model';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-create-vocab',
  styleUrl: './create-vocab.css',
  templateUrl: './create-vocab.html',
  standalone: true
})
export class CreateVocab {
  isOpen = input.required<boolean>();
  readonly closed = output<void>();
  submitted = output<Event>();
  private readonly dialogRef = inject(DialogRef<CreateVocabPayload>);
  private readonly createVocabModel = signal<CreateVocabPayload>({
    german_word: '',
    word_type: '',
    state: 'DRAFT'
  });
  createForm = form(this.createVocabModel, schemaPath => {
    required(schemaPath.german_word, { message: 'không được để trống' });
    minLength(schemaPath.german_word, 1, { message: 'độ dài tối thiểu là 2' });
    // applyWhen(schemaPath, (({ valueOf }) => valueOf(schemaPath.german_word.length>0).length > 0), () => disabled(schemaPath.word_type));
  });

  close() {
    this.dialogRef.close();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // submit() tự động bật touched() cho mọi field và chỉ chạy callback khi form valid()
    submit(this.createForm, async () => {
      const raw = this.createVocabModel();
      this.dialogRef.close({
        ...raw,
        german_word: raw.german_word.trim()
      });
    });
  }
}

export interface CreateVocabPayload {
  german_word: string;
  word_type: WordType | '';
  state: VocabState;
}
