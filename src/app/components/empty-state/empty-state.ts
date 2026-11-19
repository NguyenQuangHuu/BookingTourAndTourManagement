import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

type EmptyStateIcon = 'search' | 'folder';
type EmptyStateVariant = 'primary' | 'secondary';

@Component({
  imports: [],
  selector: 'app-empty-state',
  styleUrl: './empty-state.css',
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');
  readonly icon = input<EmptyStateIcon>('search');
  readonly variant = input<EmptyStateVariant>('secondary');
  readonly action = output<void>();
}
