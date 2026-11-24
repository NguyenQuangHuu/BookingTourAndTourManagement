import { Component, inject, output, signal } from '@angular/core';
import { form, FormField, FormRoot, minLength, required, submit } from '@angular/forms/signals';
import { VocabState, WordType } from '../../../core/dictionary.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-create-vocab',
  styleUrl: './create-vocab.css',
  templateUrl: './create-vocab.html',
  standalone: true
})
export class CreateVocab {
  readonly closed = output<void>();
  submitted = output<CreateVocabPayload>();
  private readonly dialogRef = inject<DialogRef<CreateVocabPayload>>(DialogRef<CreateVocabPayload>);
  private data = inject<CreateVocabPayload | null>(DIALOG_DATA, { optional: true });
  private readonly createVocabModel = signal<CreateVocabPayload>({
    german_word: '',
    word_type: '',
    state: 'DRAFT'
  });
  createForm = form(this.createVocabModel, schemaPath => {
    required(schemaPath.german_word, { message: 'không được để trống' });
    minLength(schemaPath.german_word, 2, { message: 'độ dài tối thiểu là 2' });
    required(schemaPath.word_type, { message: 'chưa chọn loại từ' });
    // applyWhen(schemaPath, (({ valueOf }) => valueOf(schemaPath.word_type), (p) => required(p.valueOf()));
  });

  close() {
    this.dialogRef.close();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // submit() tự động bật touched() cho mọi field và chỉ chạy callback khi form valid()
    submit(this.createForm, async () => {
      const raw = this.createForm().value();
      if (this.createForm().invalid()) {
        console.log(raw);
        return;
      }
      this.dialogRef.close(raw);
    });
  }
}

export interface CreateVocabPayload {
  german_word: string;
  word_type: WordType | '';
  state: VocabState;
}
