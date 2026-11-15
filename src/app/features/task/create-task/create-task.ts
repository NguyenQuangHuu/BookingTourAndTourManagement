import { Component,signal } from '@angular/core';
import {form, FormField, FormRoot, minLength, required} from '@angular/forms/signals';
import {PriorityTask} from '../../../core/task.model';
export interface TaskFormModel{
  taskName: string;
  taskDescription: string;
  taskDueDate: string;
  taskAssignment: string;
  taskPriority: PriorityTask;
}
@Component({
  imports: [
    FormRoot,
    FormField
  ],
  selector: 'app-create-task',
  styleUrl: './create-task.css',
  templateUrl: './create-task.html'
})
export class CreateTask {
  readonly taskFormModel = signal<TaskFormModel>({
    taskName:'',taskDescription:'',taskDueDate:'',taskAssignment:'',taskPriority:'MEDIUM'
  })
  readonly taskForm = form<TaskFormModel>(this.taskFormModel,
  (path)=>{
    required(path.taskName,{message:'123'});
    minLength(path.taskName,3,{message:'123'});
    required(path.taskDescription);
    required(path.taskAssignment);
    required(path.taskPriority);
    required(path.taskDueDate);
  },{
    submission:{
      action: async (field) => {
        const data = field().value();
        console.log(data);
        await new Promise((resolve)=> setTimeout(resolve,1000))
      }
    }
    });
  createTaskForm(e: Event) {
    e.preventDefault();

  }
}
