import { Component, signal, viewChildren, ElementRef, effect, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { first } from 'rxjs';
@Component({
  selector: 'app-visitors-chart',
  imports: [],
  templateUrl: './visitors-chart.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './visitors-chart.css',
})
export class VisitorsChart {

}
