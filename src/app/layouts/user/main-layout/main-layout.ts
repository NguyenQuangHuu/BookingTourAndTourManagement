import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
