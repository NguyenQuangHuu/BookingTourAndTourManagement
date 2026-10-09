import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VisitorsChart } from "../../components/widget/visitors-chart/visitors-chart";
import { WordTypePie } from '../../components/widget/word-type-pie/word-type-pie';

@Component({
  selector: 'app-dashboard',
  imports: [VisitorsChart,WordTypePie],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
