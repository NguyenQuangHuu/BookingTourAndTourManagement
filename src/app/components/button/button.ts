import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  tertiary: 'btn--tertiary',
  danger: 'btn--danger'
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg'
};

@Component({
  selector: 'button[appButton],a[appButton]',
  imports: [],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './button.css',
  host: {
    '[class]': 'computedClass()'
  }
})
export class AppButton {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');

  computedClass = computed(() => {
    const classes: string[] = [VARIANT_CLASSES[this.variant()], SIZE_CLASSES[this.size()]];
    return classes.join(' ');
  });
}
