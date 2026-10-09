import {Component, signal} from '@angular/core';
import {form, FormField, minLength, required, submit} from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-create-vocab',
  styleUrl: './create-vocab.css',
  templateUrl: './create-vocab.html',
  standalone: true,
})
export class CreateVocab {
  private readonly createVocabModel = signal<CreateVocabData>({
    german_word:''
  })
  createForm = form(this.createVocabModel, path =>{
    required(path.german_word,{message:'không được để trống'});
    minLength(path.german_word,2,{message:'độ dài tối thiểu là 2'})
  })

  onSubmit(e :Event){
    e.preventDefault();
    submit(this.createForm,{
      action: async ()=>{
        const values = this.createVocabModel();
        console.log(values)
      }
    })
  }
}

interface CreateVocabData {
  german_word:string
}
