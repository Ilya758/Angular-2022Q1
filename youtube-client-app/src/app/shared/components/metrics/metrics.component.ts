import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { TStatistics } from '../../models/statistics.model';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  @Input() item!: TStatistics;

  constructor() {}

  ngOnInit(): void {}
}
