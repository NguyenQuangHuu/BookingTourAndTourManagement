import { ChangeDetectionStrategy, Component, input,computed } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-gender-badge',
  styleUrl: './gender-badge.css',
  templateUrl: './gender-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderBadge {
  article = input.required<'der' | 'die' | 'das'>();
  badgeClass = computed(() => {
    const art = this.article();
    if (art === 'der')
      return 'px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200';
    if (art === 'die')
      return 'px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200';
    return 'px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200';
  });
}
