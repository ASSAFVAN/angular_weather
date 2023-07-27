import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isCelsius = true;
  isCelsiusSubscription: Subscription;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.isCelsiusSubscription = this.weatherService.isCelsius$.subscribe(
      (isCelsius) => {
        this.isCelsius = isCelsius;
      }
    );
  }
  toggleTemperature(): void {
    this.weatherService.toggleTemperature();
  }

  ngOnDestroy(): void {
    this.isCelsiusSubscription.unsubscribe();
  }
}
