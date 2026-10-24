import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

  isExpanded = signal<boolean>(true);

  setDarkMode = signal<boolean>(false);
}
