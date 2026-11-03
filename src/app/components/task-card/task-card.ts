import { Component, input, output } from '@angular/core';
import { AppButton } from '../button/button';

@Component({
  imports: [AppButton],
  selector: 'app-task-card',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
  standalone: true
})
export class TaskCard {
  title = input.required<string>();
  description = input.required<string>();
  state = input.required<string>();
  id = input.required<string>();
  markDone = output<string>();
  markCancel = output<string>();
  restore = output<string>();

  markedDone(id: string) {
    this.markDone.emit(id);
  }

  markedCancel(id: string) {
    this.markCancel.emit(id);
  }

  restoreTask(id: string) {
    this.restore.emit(id);
  }
}
