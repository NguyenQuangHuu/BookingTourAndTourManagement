import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

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
    '[class]': 'computedClass()',
    '[attr.disabled]': 'disabled() ? true : null',
    '[class.is-disabled]': 'disabled()',
    '(click)': 'handleClick()',
    '[class.icon-only]': 'iconOnly()'
  }
})
export class AppButton {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false, { transform: booleanAttribute });
  iconOnly = input(false, { transform: booleanAttribute });
  clickEmit = output<void>();
  computedClass = computed(() => {
    const classes: string[] = [VARIANT_CLASSES[this.variant()], SIZE_CLASSES[this.size()]];
    return classes.join(' ');
  });

  handleClick() {
    if (this.disabled()) {
      return;
    }
    this.clickEmit.emit();
  }
}
