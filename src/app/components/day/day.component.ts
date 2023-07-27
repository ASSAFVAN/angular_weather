import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from 'src/app/services/weather.service';
import { ForecastDetails } from 'src/app/types/fiveDaysForecastInterface';
import { iconsMap } from 'src/app/utils/iconsMap';
import { convertTime, ToFahrenheit } from 'src/app/utils/utils';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  convertTime = convertTime;
  toFahrenheit = ToFahrenheit;
  isCelsius = false;
  subscription: Subscription;

  @Input() dailyData: ForecastDetails;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscription = this.weatherService.isCelsius$.subscribe(
      (isCelsius) => {
        this.isCelsius = isCelsius;
      }
    );
  }

  getIconUrl(icon: number): string {
    const key = String(icon) as unknown as keyof typeof iconsMap;
    if (key in iconsMap) {
      return iconsMap[key];
    } else {
      return '';
    }
  }

  getDayOfTheWeek(date: string): string {
    const daysOfWeekNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeek = new Date(date).getDay();
    return daysOfWeekNames[dayOfWeek].substring(0, 3);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
