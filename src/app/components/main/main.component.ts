import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WeatherService } from 'src/app/services/weather.service';
import { CurrentConditionsInterface } from 'src/app/types/currentConditions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  currentCityConditions$?: Observable<CurrentConditionsInterface[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getSelectedSuggestion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cityKey: string) => {
        if (cityKey) {
          this.currentCityConditions$ =
            this.weatherService.getCurrentCityConditions(cityKey);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
