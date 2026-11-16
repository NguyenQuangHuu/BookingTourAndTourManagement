import { Component, signal } from '@angular/core';
import { applyWhen, disabled, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { PriorityTask } from '../../../core/task.model';

export interface TaskFormModel {
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
    taskName: '', taskDescription: '', taskDueDate: '', taskAssignment: '', taskPriority: 'MEDIUM'
  });
  readonly taskForm = form<TaskFormModel>(this.taskFormModel,
    (path) => {
      required(path.taskName, { message: 'không được bỏ trống' });
      minLength(path.taskName, 3, { message: 'tên công việc quá ngắn' });
      required(path.taskDescription, { message: 'cần mô tả chi tiết công việc' });
      required(path.taskAssignment, { message: 'cần xác định người nhận việc' });
      required(path.taskPriority, { message: 'mức độ ưu tiên bị bỏ trống' });
      disabled(path.taskDueDate, { when: ({ valueOf }) => !valueOf(path.taskName) });
      applyWhen(path, ({ value }) => !!value().taskName, (p) => required(p.taskDueDate));
    }, {
      submission: {
        // action: async (field) => {
        //   const data = field().value();
        //   console.log(data);
        //   await new Promise((resolve) => setTimeout(resolve, 1000));
        // }
        action: async () => this.createTaskForm()
      }
    });

  createTaskForm() {
    this.taskForm().markAsTouched();
    const data = this.taskForm().value();
    console.log(data);
  }
}
