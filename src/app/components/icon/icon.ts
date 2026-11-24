import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Bộ icon dạng nét (stroke), lưới 24x24, độ dày nét 2 — cùng phong cách với Lucide/Feather.
 * Mỗi icon là một mảng các chuỗi `d` của <path>. Hình tròn được viết bằng cung (arc)
 * để không cần thêm thẻ <circle>.
 */
const ICONS = {
  // ── Hành động chính ────────────────────────────────
  plus: ['M12 5v14', 'M5 12h14'],
  search: ['M4 11a7 7 0 1 0 14 0a7 7 0 1 0-14 0', 'm21 21-4.3-4.3'],
  edit: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
  trash: [
    'M3 6h18',
    'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
    'M10 11v6',
    'M14 11v6',
    'M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'
  ],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z', 'M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'],

  // ── Điều hướng & bố cục ────────────────────────────
  home: ['m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'chevron-left': ['m15 6-6 6 6 6'],
  'chevron-right': ['m9 6 6 6-6 6'],
  'more-horizontal': ['M12 12h.01', 'M19 12h.01', 'M5 12h.01'],

  // ── Lọc & sắp xếp ──────────────────────────────────
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54Z'],
  sort: ['m21 16-4 4-4-4', 'M17 20V4', 'm3 8 4-4 4 4', 'M7 4v16'],

  // ── Trạng thái & phản hồi ──────────────────────────
  check: ['M20 6 9 17l-5-5'],
  'check-circle': ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'],
  info: ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M12 16v-4', 'M12 8h.01'],
  'alert-triangle': [
    'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
    'M12 9v4',
    'M12 17h.01'
  ],
  loader: ['M21 12a9 9 0 1 1-6.219-8.56'], // quay bằng CSS, xem class .icon-spin

  // ── Nội dung ───────────────────────────────────────
  folder: [
    'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'
  ],
  book: [
    'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z',
    'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'
  ],
  star: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  volume: [
    'M11 5 6 9H2v6h4l5 4z',
    'M15.54 8.46a5 5 0 0 1 0 7.07',
    'M19.07 4.93a10 10 0 0 1 0 14.14'
  ], // phát âm từ tiếng Đức
  user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0']
} satisfies Record<string, string[]>;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
      width: var(--icon-md, 1.25em);
      height: var(--icon-md, 1.25em);
    }

    svg {
      width: 100%;
      height: 100%;
    }

    :host(.icon-spin) svg {
      animation: icon-spin 0.8s linear infinite;
    }

    @keyframes icon-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host(.icon-spin) svg {
        animation-duration: 2.4s;
      }
    }
  `
})
export class AppIcon {
  readonly name = input.required<IconName>();
  protected readonly paths = computed(() => ICONS[this.name()]);
}
