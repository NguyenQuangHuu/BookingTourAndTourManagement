import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import{LucideAngularModule, User, Album, ChartLine, LogOut, House, Sun, Moon} from 'lucide-angular';
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,LucideAngularModule],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  readonly userIcon = User;
  readonly albumIcon = Album;
  readonly chartLineIcon = ChartLine;
  readonly logOutIcon = LogOut;
  readonly houseIcon = House;
  readonly sunIcon = Sun;
  readonly moonIcon = Moon;

  isExpanded = signal<boolean>(true);

  setDarkMode = signal<boolean>(false);
}
