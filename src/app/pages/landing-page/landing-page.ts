import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskStore } from '../../core/tasks.store';
import { AppButton } from '../../components/button/button';

@Component({
  selector: 'app-landing-page',
  imports: [
    TaskCard,
    AppButton
  ],
  providers: [TaskStore],
  templateUrl: './landing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './landing-page.css'
})
export class LandingPage {
  tasks = inject(TaskStore);

  queryTask(e: Event) {
    const inputValue = e.target as HTMLInputElement;
    console.log(inputValue.value);
    this.tasks.setQuerySearch(inputValue.value);
  }
}
