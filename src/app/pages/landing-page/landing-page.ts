import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { TasksStore } from '../../core/tasks.store';

@Component({
  selector: 'app-landing-page',
  imports: [
    TaskCard
  ],
  providers: [TasksStore],
  templateUrl: './landing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './landing-page.css'
})
export class LandingPage {
  todos = inject(TasksStore);

  updateQuery(e: Event) {
    const inputValue = e.target as HTMLInputElement;
    console.log(inputValue.value);
    this.todos.setQuerySearch(inputValue.value);
  }
}
