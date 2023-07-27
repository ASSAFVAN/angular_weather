import { Component, Input } from '@angular/core';
import { ForecastDetails } from 'src/app/types/fiveDaysForecastInterface';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.scss'],
})
export class FiveDaysForecastComponent {
  @Input() forecastData: ForecastDetails[];
}
